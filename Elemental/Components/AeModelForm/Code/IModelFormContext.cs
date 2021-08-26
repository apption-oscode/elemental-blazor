using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;

namespace Elemental.Components
{
    public interface IModelFormContext
    {
        void Clear();
        string GetDisplayValue(PropertyInfo propertyInfo, object item);
        (List<object> values, List<string> labels) GetOptionValuesForProperty(PropertyInfo propertyInfo);
        PropertyInfo GetProperty(string name);
        bool IsDropDown(PropertyInfo propertyInfo);
        void OnOptionPropertyChange(PropertyInfo property, object newValue);
        void RefreshOptions(PropertyInfo propertyInfo);

        void RefreshOptions<T>(Expression<Func<T, object>> propertyPath);

        void SetVisible<T>(Expression<Func<T,object>> propertyPath, bool isVisible);
        void SetVisible(PropertyInfo property, bool isVisible);

        void RegisterOptionValueProperty<T>(Expression<Func<T, string>> propertyPath, Func<IEnumerable<string>> choices, Action<string> onChange = null);
        void RegisterOptionValueProperty(PropertyInfo property, Func<IEnumerable<string>> choices, Action<string> onChange = null);

        void RegisterOptionValueProperty<P1, P2>(Expression<Func<P1, P2>> propertyPath, Func<P2, string> label, Func<IEnumerable<P2>> choices, Action<P2> onChange = null);
    }
}