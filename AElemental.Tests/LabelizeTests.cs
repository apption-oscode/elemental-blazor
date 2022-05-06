using AElemental.Components;
using Xunit;

namespace AElemental.Tests
{
    public class LabelizeTests
    {
        [Fact]
        public void Test_Labelize1()
        {
            Assert.Equal("Class 1 Fighter", AeModelFormTools.Labelize("Class1Fighter"));
        }
    }
}
