using Elemental.Code;
using Elemental.Documentation.Data;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using Xunit;

namespace Elemental.Tests
{
    public class ExpressionTests
    {

        [Fact]
        public void CanGenerateExpression1()
        {
            var starshipType = typeof(Starship);
            var starshipInstance = new Starship() { Identifier = "HAHA"};
            var idProp = starshipType.GetProperty("Identifier");
            Expression<Func<string>> tgtExpression = () => starshipInstance.Identifier;
            Assert.NotNull(idProp);
            var constant = Expression.Constant(starshipInstance);
            var parameter = Expression.Parameter(starshipType, "t");

            var memberExpression = Expression.Property(constant, idProp.GetGetMethod());
            var expr1 = Expression.Lambda(memberExpression, parameter);
            var str = expr1.ToString();
            var compiled = expr1.Compile();
            var funcExpr = Expression.Lambda<Func<string>>(memberExpression);
            var compiled2 = funcExpr.Compile();
            var result = compiled2();
            Assert.Equal("HAHA", result);
        }

        [Fact]
        public void CanGenerateExpression2()
        {
            var starshipType = typeof(Starship);
            var starshipInstance = new Starship() { Identifier = "HAHA" };
            var idProp = starshipType.GetProperty("Identifier");
            var expr = AeModelFormTools.GetExpression<string>(starshipInstance, idProp);

            var compiled = expr.Compile();
            var result = compiled();
            Assert.Equal("HAHA", result);
        }

        [Fact]
        public void CanGenerateExpressionAbstract()
        {
            var starshipType = typeof(Starship);
            var starshipInstance = new Starship() { Identifier = "HAHA", ShipName = "ze_cheap_name" };
            var idProp = starshipType.GetProperty("ShipName");
            var expr = AeModelFormTools.GetExpression<string>(starshipInstance, idProp);

            var compiled = expr.Compile();
            var result = compiled();
            Assert.Equal("ze_cheap_name", result);
        }

    }
}
