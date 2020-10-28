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

        private static bool IsRequired(PropertyInfo propertyInfo)
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



        public static string GetLabel(PropertyInfo propertyInfo)
        {

            var label = AeLabelAttribute.IsDefined(propertyInfo, typeof(AeLabelAttribute))
                ? (AeLabelAttribute.GetCustomAttribute(propertyInfo, typeof(AeLabelAttribute)) as AeLabelAttribute).Label
                : null;
            if (label is null)
            {
                label = Labelize(propertyInfo.Name);
            }
            return label + (IsRequired(propertyInfo) ? "" : " (Optional)");
        }

        public static string Labelize(string propName)
        {
            var blocks = BreakUppercase(propName);
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

        private static bool isUnderscore(string name)
        {
            if (name.Contains("_"))
                return true;
            //might need more rules
            return false;
        }
    }
}
