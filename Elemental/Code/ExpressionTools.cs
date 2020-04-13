using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;

namespace Elemental.Code
{
    public static class ExpressionTools
    {
        public static Expression<Func<T>> GenerateValidatorFunction<T>(this PropertyInfo prop, ConstantExpression instanceExpr)
        {
            var propExpr = Expression.Property(instanceExpr, prop);
            if (prop.PropertyType == typeof(T))
            {
                return Expression.Lambda<Func<T>>(propExpr);//.Compile();
            }
            else
            {
                throw new InvalidOperationException($"Property Type is {prop.PropertyType} - expected type is {typeof(T)} ");
            }
        }

        public static Expression<Func<T>> GenerateValidatorFunction<T>(this PropertyInfo prop, object instance)
        {
            return prop.GenerateValidatorFunction<T>(Expression.Constant(instance));
        }
    }
}
