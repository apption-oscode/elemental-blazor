using Elemental.Components.Forms;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;

namespace Elemental.Code
{
    public enum ModelFormStyle
    {
        Normal, Compact
    }
    public static class AeModelFormTools
    {
        public static System.Linq.Expressions.Expression<Func<S>> GetExpression<S>(object instance, PropertyInfo propertyInfo)
        {
            var constant = Expression.Constant(instance);
            var memberExpression = Expression.Property(constant, propertyInfo.GetGetMethod());
            return Expression.Lambda<Func<S>>(memberExpression);
        }

        public static bool IsNullable(PropertyInfo propertyInfo)
        {
            return IsNullable(propertyInfo.PropertyType);
        }

        public static bool IsEditable(this PropertyInfo propertyInfo)
        {
            return EditableAttribute.IsDefined(propertyInfo, typeof(EditableAttribute))
                ? (EditableAttribute.GetCustomAttribute(propertyInfo, typeof(EditableAttribute)) as EditableAttribute).AllowEdit
                : true;

        }

        public static bool IsDropDown(this PropertyInfo propertyInfo)
        {
            var hasValidValues = AeLabelAttribute.IsDefined(propertyInfo, typeof(AeLabelAttribute))
                ? (AeLabelAttribute.GetCustomAttribute(propertyInfo, typeof(AeLabelAttribute)) as AeLabelAttribute).ValidValues?.Length > 0
                : false;
            var hasDropDown = AeLabelAttribute.IsDefined(propertyInfo, typeof(AeLabelAttribute))
                ? (AeLabelAttribute.GetCustomAttribute(propertyInfo, typeof(AeLabelAttribute)) as AeLabelAttribute).IsDropDown
                : false;
            return hasValidValues || hasDropDown;
        }

        public static string[] DropdownValues(this PropertyInfo propertyInfo)
        {
            return (AeLabelAttribute.GetCustomAttribute(propertyInfo, typeof(AeLabelAttribute)) as AeLabelAttribute).ValidValues;
        }

        public static bool IsNullable(Type type)
        {
            if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Nullable<>))
            {
                return true;
            }
            return false;
        }

        public static Type GetNonNullableType(PropertyInfo prop)
        {
            var type = prop.PropertyType;
            if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Nullable<>))
            {
                return Nullable.GetUnderlyingType(type);
            }
            return type;
        }

        public static Nullable<T> AsNullableValue<T>(PropertyInfo prop, object instance) where T : struct
        {
            if (IsNullable(prop))
            {
                return prop.GetValue(instance) as Nullable<T>;
            }
            else
            {
                return new Nullable<T>((T)prop.GetValue(instance));
            }
        }

        public static bool IsRequired(PropertyInfo propertyInfo)
        {            
            return RequiredAttribute.IsDefined(propertyInfo, typeof(RequiredAttribute));
        }

        public static int? GetSize(PropertyInfo propertyInfo)
        {
            return AeLabelAttribute.IsDefined(propertyInfo, typeof(AeLabelAttribute))
                ? (AeLabelAttribute.GetCustomAttribute(propertyInfo, typeof(AeLabelAttribute)) as AeLabelAttribute).InputLength
                : null;
        }

        public static string GetPlaceHolder(PropertyInfo propertyInfo)
        {
            return AeLabelAttribute.IsDefined(propertyInfo, typeof(AeLabelAttribute))
                ? (AeLabelAttribute.GetCustomAttribute(propertyInfo, typeof(AeLabelAttribute)) as AeLabelAttribute).PlaceHolder
                : null;
        }



        public static string GetLabel(PropertyInfo propertyInfo, Func<string, string> labelFunc, bool includeOptional = true)
        {

            var label = AeLabelAttribute.IsDefined(propertyInfo, typeof(AeLabelAttribute))
                ? (AeLabelAttribute.GetCustomAttribute(propertyInfo, typeof(AeLabelAttribute)) as AeLabelAttribute).Label
                : null;
            if (label is null)
            {
                if (!(labelFunc is null))
                {
                    label = labelFunc(propertyInfo.Name);
                }
                else
                {
                    label = Labelize(propertyInfo.Name);
                }
            }
            if (includeOptional && !IsRequired(propertyInfo))
                return label + " (Optional)";
            else
                return label;
        }

        public static List<PropertyInfo> GetAeModelProperties(this Type type)
        {
            return type.GetProperties().Where(p => !Attribute.IsDefined(p, typeof(AeFormIgnoreAttribute))).ToList();
        }

        public static List<(string category, List<PropertyInfo> properties)> GetAeModelFormCategories(this Type type)
        {
            var allProps = GetAeModelProperties(type);
            var propsNoCat = allProps.Where(p => !Attribute.IsDefined(p, typeof(AeFormCategoryAttribute))).ToList();

            var result = new List<(string category, List<PropertyInfo> properties)>() { (null, propsNoCat) };
            result.AddRange(allProps.Where(p => Attribute.IsDefined(p, typeof(AeFormCategoryAttribute)))
                .Select(property => (((Attribute.GetCustomAttribute(property, typeof(AeFormCategoryAttribute)) as AeFormCategoryAttribute).Category,
                (Attribute.GetCustomAttribute(property, typeof(AeFormCategoryAttribute)) as AeFormCategoryAttribute).CategoryOrder),
                property))
                .GroupBy(p => p.Item1)
                .OrderBy(gp => gp.Key.CategoryOrder)
                .Select(gp => (gp.Key.Category, gp.Select(tp => tp.property).ToList())));
            return result;

        }

        public static string Labelize(string propName)
        {
            var blocks = BreakUppercase(propName);
            blocks = blocks.SelectMany(s => BreakNumbers(s));
            if (isPascalCase(blocks))
            {
                return string.Join(" ", blocks);
            }
            if (isUnderscore(propName))
            {
                return propName.Replace('_', ' ');
            }
            return propName;
        }

        private static bool isPascalCase(IEnumerable<string> blocks)
        {
            return blocks.Any(s => s.Length > 1);
        }

        private static IEnumerable<string> BreakUppercase(string str)
        {
            return Regex.Split(str, @"(?<!^)(?=[A-Z])");
        }

        private static IEnumerable<string> BreakNumbers(string str)
        {
            return Regex.Split(str, @"(?<!^)(?=[0-9])");
        }

        private static bool isUnderscore(string name)
        {
            if (name.Contains("_"))
                return true;
            //might need more rules
            return false;
        }

        private static string GetMemberName(Expression expression)
        {
            switch (expression.NodeType)
            {
                case ExpressionType.MemberAccess:
                    return ((MemberExpression)expression).Member.Name;
                case ExpressionType.Convert:
                    return GetMemberName(((UnaryExpression)expression).Operand);
                default:
                    throw new NotSupportedException(expression.NodeType.ToString());
            }
        }

        public static string WithPropertyExpression<T>(Expression<Func<T, object>> expression)
        {
            return GetMemberName(expression.Body);
            
        }
    }
}
