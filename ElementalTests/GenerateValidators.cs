using ElementalDocs.Data;
using Elemental.Code;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;
using Xunit;

namespace ElementalTests
{
    public class GenerateValidators
    {
        [Fact]
        public void GivenObject_GenerateAllValidators()
        {
            var model = typeof(Starship);
            var instance = new Starship() { Classification = "C3", Description = "C3 Class Fighter", IsValidatedDesign = true, ProductionDate = DateTime.Now, MaximumAccommodation = 5 };
            var allFuncs = new Dictionary<string, Func<object>>();
            GenerateAccessors(model, instance, allFuncs);
            Assert.Equal(instance.Classification, allFuncs["Classification"]());
            Assert.Equal(instance.MaximumAccommodation, allFuncs["MaximumAccommodation"]());
            Assert.Equal(instance.IsValidatedDesign, allFuncs["IsValidatedDesign"]());
        }

        private static void GenerateAccessors(Type model, Starship instance, Dictionary<string, Func<object>> allFuncs)
        {
            var instanceExpr = Expression.Constant(instance);
            foreach (var prop in model.GetProperties())
            {
                if (prop.PropertyType == typeof(string))
                {
                    var validationFunction = prop.GenerateValidatorFunction<string>(instanceExpr).Compile();
                    allFuncs.Add(prop.Name, validationFunction);
                }
                if (prop.PropertyType == typeof(int))
                {
                    var validationFunction = prop.GenerateValidatorFunction<int>(instanceExpr).Compile();
                    allFuncs.Add(prop.Name, () => validationFunction());
                }
                if (prop.PropertyType == typeof(bool))
                {
                    var validationFunction = prop.GenerateValidatorFunction<bool>(instanceExpr).Compile();
                    allFuncs.Add(prop.Name, () => validationFunction());
                }
            }
        }

        [Fact]
        public void GivenObject_GenerateAllValidatorsWithNulls()
        {
            var model = typeof(Starship);
            var instance = new Starship() { Classification = null, Description = null, ProductionDate = DateTime.Now, MaximumAccommodation = 5 };
            var allFuncs = new Dictionary<string, Func<object>>();
            GenerateAccessors(model, instance, allFuncs);

            Assert.Equal(instance.Classification, allFuncs["Classification"]());
            Assert.Equal(instance.MaximumAccommodation, allFuncs["MaximumAccommodation"]());
            Assert.Equal(instance.IsValidatedDesign, allFuncs["IsValidatedDesign"]());
        }


    }
}
