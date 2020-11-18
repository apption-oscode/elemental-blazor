using Elemental.Code;
using Elemental.Documentation.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Elemental.Tests
{
    public class ModelFormTests
    {
        [Fact]
        public async Task TestStarshipCategories()
        {
            var s1 = typeof(Starship).GetAeModelFormCategories();
            Assert.Single(s1);
            var (c1, l1) = s1[0];
            Assert.Equal(9, l1.Count);

        }

        [Fact]
        public async Task TestTransportStarshipCategories()
        {
            var s1 = typeof(TransportStarship).GetAeModelFormCategories();
            Assert.Equal(3, s1.Count);
            Assert.Collection(s1, e => Assert.Null(e.category), e => Assert.Equal("Identification", e.category));
            //var (c1, l1) = s1[0];

        }
    }
}
