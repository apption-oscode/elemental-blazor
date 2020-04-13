using ElementalDocs.Data;
using Elemental.Code;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;
using Xunit;

namespace ElementalTests
{
    public class UnitTest1
    {
        [Fact]
        public void GivenObject_GenerateAllValidators()
        {
            var model = typeof(Starship);
            var instance = new Starship() { Classification = "C3", Description = "C3 Class Fighter", IsValidatedDesign = true, ProductionDate = DateTime.Now, MaximumAccommodation = 5 };
            var instanceExpr = Expression.Constant(instance);
            var allFuncs = new Dictionary<string, Func<string>>();
            foreach (var prop in model.GetProperties())
            {
                Func<string> validationFunction;
                validationFunction = prop.GenerateValidatorFunction(instanceExpr).Compile();
                allFuncs.Add(prop.Name, validationFunction);
            }
            Assert.Equal(instance.Classification, allFuncs["Classification"]());
            Assert.Equal(instance.MaximumAccommodation.ToString(), allFuncs["MaximumAccommodation"]());
            Assert.Equal(instance.IsValidatedDesign.ToString(), allFuncs["IsValidatedDesign"]());
        }

        [Fact]
        public void GivenObject_GenerateAllValidatorsWithNulls()
        {
            var model = typeof(Starship);
            var instance = new Starship() { Classification = null, Description = null, ProductionDate = DateTime.Now, MaximumAccommodation = 5 };
            var instanceExpr = Expression.Constant(instance);
            var allFuncs = new Dictionary<string, Func<string>>();
            foreach (var prop in model.GetProperties())
            {
                Func<string> validationFunction;
                validationFunction = prop.GenerateValidatorFunction(instanceExpr).Compile();
                allFuncs.Add(prop.Name, validationFunction);
            }
            Assert.Equal(instance.Classification, allFuncs["Classification"]());
            Assert.Equal(instance.MaximumAccommodation.ToString(), allFuncs["MaximumAccommodation"]());
            Assert.Equal(instance.IsValidatedDesign.ToString(), allFuncs["IsValidatedDesign"]());
        }


    }
}
