using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;

namespace Elemental.Code
{
    public static class ExpressionTools
    {
        public static Expression<Func<string>> GenerateValidatorFunction(this PropertyInfo prop, ConstantExpression instanceExpr)
        {
            var propExpr = Expression.Property(instanceExpr, prop);
            if (prop.PropertyType == typeof(string))
            {
                return Expression.Lambda<Func<string>>(propExpr);//.Compile();
            }
            else
            {
                var toString = typeof(Object).GetMethod("ToString");
                //MemberExpression m = Expression.MakeMemberAccess(e, prop);
                var toStringValue = Expression.Call(propExpr, toString);
                return Expression.Lambda<Func<string>>(toStringValue);//.Compile();
            }
        }

        public static Expression<Func<string>> GenerateValidatorFunction(this PropertyInfo prop, object instance)
        {
            return prop.GenerateValidatorFunction(Expression.Constant(instance));
        }
    }
}
