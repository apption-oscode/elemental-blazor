using Elemental.Components;
using Elemental.Documentation.Samples.ModelForm;
using Elemental.Documentation.Samples.ModelForm.Examples;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Elemental.Tests
{
    public class ModelFormFunctionMappersTests
    {
        [Fact]
        public void TestMapFunctions()
        {
            var labelFuncs = new List<Delegate>();
            Func<StarshipOwner, string> ownerLabel = s => s.OwnerName;
            Func<StarshipPort, string> portLabel = s => s.PortName;
            labelFuncs.Add(ownerLabel);
            labelFuncs.Add(portLabel);

            var funcForOwner = labelFuncs.FirstOrDefault(d => d.Method.ReturnType == typeof(string));

            var listFuncs = new List<Delegate>();
            Func<IEnumerable<StarshipOwner>> ownerList = () => new List<StarshipOwner>();
            Func<IEnumerable<StarshipPort>> portList = () => new List<StarshipPort>();
            listFuncs.Add(ownerList);
            listFuncs.Add(portList);

            var ctx = new ModelFormContext<StarshipWithOwner>();
            //var soFunc = ctx.ListFor<StarshipOwner>();
            //Assert.NotNull(soFunc);
            //var mapFunc = ctx.MapFor<StarshipOwner>();
            //Assert.NotNull(soFunc);
            ctx.RegisterOptionValueProperty(p => p.Owner, s => s.OwnerName, 
                () => new List<StarshipOwner>() { new() {  OwnerID = 1, OwnerName ="Joe"}, new() { OwnerID = 2, OwnerName = "Brian" } });
            var o = typeof(StarshipWithOwner).GetProperty("Owner");
            Assert.NotNull(o);
            var choices = ctx.GetOptionValuesForProperty(o);
            Assert.Collection(choices, e => Assert.Equal("Joe",e), e => Assert.Equal("Brian",e));
        }

        [Fact]
        public void ValidateMapping()
        {
            //var allProps = typeof(StarshipWithOwner).GetAeModelFormCategories();
            var ctx = new ModelFormContext<StarshipWithOwner>();
            var o = typeof(StarshipWithOwner).GetProperty("Owner");
            
            Assert.True(ctx.IsDropDown(o));
            var starship = new StarshipWithOwner();
            AeModelFormTools.GetExpressionObject(starship, o);
        }
    }
}
