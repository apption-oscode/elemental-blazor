using Elemental.Code;
using Microsoft.AspNetCore.Components.Forms;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Elemental.Components
{

    public class ModelFormArgsInternal
    {
        public PropertyInfo PropertyInfo { get; set; }
        public EditContext EditContext { get; set; }

        public bool HasPropertyChanged<T>(Expression<Func<T, object>> expression)
        {
            return AeModelFormTools.WithPropertyExpression<T>(expression) == PropertyInfo.Name;
        }

    }

    public class ModelFormChangeArgs<T>
    {
        public PropertyInfo PropertyInfo { get; set; }
        public EditContext EditContext { get; set; }

        public ModelFormContext<T> Context { get; set; }

        public bool HasPropertyChanged(Expression<Func<T, object>> expression)
        {
            return AeModelFormTools.WithPropertyExpression<T>(expression) == PropertyInfo.Name;
        }

    }

    public class ModelFormContext<T>
    {
        private Dictionary<PropertyInfo, (Delegate Label, Delegate Choices, Delegate onChange)> optionProperties = new Dictionary<PropertyInfo, (Delegate, Delegate, Delegate)>();
        private Dictionary<PropertyInfo, (AeDropdownPropertyInput<T> component, Action updateOptions)> optionPropertyComponent = new Dictionary<PropertyInfo, (AeDropdownPropertyInput<T>, Action)>();
        public Func<Task> RefreshModel { get; set; }
        public List<PropertyInfo> Properties { get; private set; }

        public void RegisterOptionValueProperty<S>(Expression<Func<T, S>> propertyPath, Func<S, string> label, Func<IEnumerable<S>> choices, Action<S> onChange = null)
        {
            if (propertyPath is null)
            {
                throw new ArgumentNullException(nameof(propertyPath));
            }

            if (label is null)
            {
                throw new ArgumentNullException(nameof(label));
            }

            if (choices is null)
            {
                throw new ArgumentNullException(nameof(choices));
            }

            var property = ((MemberExpression)propertyPath.Body).Member;
            optionProperties.Add(property as PropertyInfo, (label, choices, onChange));
        }

        public void OnOptionPropertyChange(PropertyInfo property, object newValue)
        {
            if (optionProperties.TryGetValue(property, out var delegates))
            {
                delegates.onChange?.DynamicInvoke(newValue);
            }
        }



        public void RegisterOptionValueProperty(Expression<Func<T, string>> propertyPath, Func<IEnumerable<string>> choices, Action<string> onChange = null)
        {
            RegisterOptionValueProperty<string>(propertyPath, e => e, choices, onChange);
        }

        public bool IsDropDown(PropertyInfo propertyInfo)
        {
            var hasValidValues = AeLabelAttribute.IsDefined(propertyInfo, typeof(AeLabelAttribute))
                ? (AeLabelAttribute.GetCustomAttribute(propertyInfo, typeof(AeLabelAttribute)) as AeLabelAttribute).ValidValues?.Length > 0
                : optionProperties.ContainsKey(propertyInfo);
            var hasDropDown = AeLabelAttribute.IsDefined(propertyInfo, typeof(AeLabelAttribute))
                ? (AeLabelAttribute.GetCustomAttribute(propertyInfo, typeof(AeLabelAttribute)) as AeLabelAttribute).IsDropDown
                : false;
            return hasValidValues || hasDropDown;
        }

        public static Type[] GetDelegateParameterTypes(MethodInfo invoke)
        {
            ParameterInfo[] parameters = invoke.GetParameters();
            Type[] typeParameters = new Type[parameters.Length];
            for (int i = 0; i < parameters.Length; i++)
            {
                typeParameters[i] = parameters[i].ParameterType;
            }
            return typeParameters;
        }

        public static Type GetDelegateReturnType(MethodInfo invoke)
        {
            return invoke.ReturnType;
        }

        public string? GetDisplayValue(PropertyInfo propertyInfo, object item)
        {
            if (optionProperties.TryGetValue(propertyInfo, out var accessors))
            {
                return accessors.Label.DynamicInvoke(item) as string;
            }
            return propertyInfo.GetValue(item)?.ToString();

        }

        public void RegisterOptionComponent(PropertyInfo propertyInfo, AeDropdownPropertyInput<T> aeDropdown, Action updateOptions)
        {
            if (!optionPropertyComponent.TryAdd(propertyInfo, (aeDropdown, updateOptions)))
            {
                optionPropertyComponent[propertyInfo] = (aeDropdown, updateOptions);
            }
        }

        public void RefreshOptions(PropertyInfo propertyInfo)
        {
            if (optionPropertyComponent.TryGetValue(propertyInfo, out var component))
            {
                component.updateOptions?.Invoke();
            }
        }

        public void RefreshOptions<S>(Expression<Func<T, S>> propertyPath)
            => RefreshOptions(((MemberExpression)propertyPath.Body).Member as PropertyInfo);

        public (List<object> values, List<string> labels) GetOptionValuesForProperty(PropertyInfo propertyInfo)
        {
            if (optionProperties.TryGetValue(propertyInfo, out var accessors))
            {
                var validValues = accessors.Choices.DynamicInvoke() as IEnumerable;
                if (validValues == null) return (null, null);
                var displayValues = new List<string>();
                var values = new List<object>();
                foreach (var item in validValues)
                {
                    values.Add(item);
                    displayValues.Add(accessors.Label.DynamicInvoke(item) as string);
                }
                return (values, displayValues);
            }
            var dropdownValues = propertyInfo.DropdownValues().ToList();
            return (dropdownValues.Cast<object>().ToList(), dropdownValues);
        }

        public void Clear()
        {
            RefreshModel = null;
            Properties = null;
            optionProperties = null;
            optionPropertyComponent = null;
        }

        public PropertyInfo GetProperty(string name)
        {
            return Properties.Single(p => string.Equals(p.Name, name, StringComparison.InvariantCultureIgnoreCase));
        }

        public void SetProperties(List<PropertyInfo> properties)
        {
            this.Properties = properties;
        }

    }
}
