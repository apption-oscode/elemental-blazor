using Elemental.Documentation;
using System.Linq;
using Xunit;

namespace Elemental.Tests
{
    public class SampleParsingTests
    {
        private const string _testFilePath = "./Samples/Dropdowns/Examples/BasicDropdown.razor";
        private const string _testTitle = "Test Component";
        private const string _testDescription = "Lorem ipsum dolor sit amet.";


        [Fact]
        public void CanReadFile()
        {
            var lines = ParsedFile.ReadLines(_testFilePath);
            
            Assert.NotNull(lines);
            Assert.Equal(29, lines.Count());
        }

        [Fact]
        public void CanFindTitle()
        {
            var lines = ParsedFile.ReadLines(_testFilePath);
            var title = ParsedFile.ParseTitle(lines);
            
            Assert.Equal("Basic Dropdowns", title);
        }

        [Fact]
        public void CanFindDescription()
        {
            var lines = ParsedFile.ReadLines(_testFilePath);
            var description = ParsedFile.ParseDescription(lines);

            Assert.StartsWith("Single option dropdown selector", description);            
        }

        [Fact]
        public void CanFindHtml()
        {
            var lines = ParsedFile.ReadLines(_testFilePath);
            var html = ParsedFile.ParseHtml(lines);

            Assert.Equal(7, html.Count);
            Assert.Contains(@"<AeTypography>", html.First());
            Assert.Contains(@"/>", html.Last());
        }

        [Fact]
        public void CanFindCode()
        {
            var lines = ParsedFile.ReadLines(_testFilePath);
            var code = ParsedFile.ParseCode(lines);

            Assert.Equal(10, code.Count);
            Assert.Equal("@code {", code.First());
            Assert.Equal("}", code.Last());
        }

        [Fact]
        public void CanFindScss()
        {
            var lines = ParsedFile.ReadScssLines("./Samples/Cards/Examples/CardSamples.razor");
            var code = ParsedFile.ParseScss(lines);
            Assert.Equal(35, code.Count);
        }


    }
}
