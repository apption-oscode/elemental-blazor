using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;

namespace Elemental.Code
{
    public enum ModelFormStyle
    {
        Normal, Compact
    }
    public static class AeModalFormTools
    {
        public static System.Linq.Expressions.Expression<Func<S>> GetExpression<S>(object instance, PropertyInfo propertyInfo)
        {
            var constant = Expression.Constant(instance);
            var memberExpression = Expression.Property(constant, propertyInfo.GetGetMethod());
            return Expression.Lambda<Func<S>>(memberExpression);
        }
    }
}
