using Elemental.Documentation.Samples.ModelForm;
using Elemental.Documentation.Samples.ModelForm.Examples;
using System;
using System.Collections.Generic;
using System.Linq;
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

            var listFuncs = new List<Delegate>();
            Func<IEnumerable<StarshipOwner>> ownerList = () => new List<StarshipOwner>();
            Func<IEnumerable<StarshipPort>> portList = () => new List<StarshipPort>();
            listFuncs.Add(ownerList);
            listFuncs.Add(portList);

        }
    }
}
