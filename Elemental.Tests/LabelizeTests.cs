using Elemental.Components;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Elemental.Tests
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
