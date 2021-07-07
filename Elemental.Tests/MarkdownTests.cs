using Markdig;
using Markdig.Parsers;
using Markdig.Renderers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Elemental.Tests
{
    public class MarkdownTests
    {
        private MarkdownPipeline _pipeline;

        public MarkdownTests()
        {
            var builder = new MarkdownPipelineBuilder().UseAdvancedExtensions();
            //if (!builder.Extensions.Contains<AeMDLinkExtension>())
            //{
            //    builder.Extensions.Add(new AeMDLinkExtension(new[] {"abc" }));
            //}            
            _pipeline = builder.Build();

            var pipeline = new MarkdownPipelineBuilder().Build();


        }

        private Func<string, string> rewrite_link = s => $"https://link?{s}";

        [Fact]
        public void GivenMDLink_RenderWithExtension()
        {

            var writer = new StringWriter();
            var renderer = new HtmlRenderer(writer);
            renderer.LinkRewriter = rewrite_link;
            _pipeline.Setup(renderer);
            var testMD = @"
#header
[page](/link/page)
";
            var doc = Markdown.Parse(testMD, _pipeline);// ToHtml(testMD, _pipeline);
            renderer.Render(doc);
            writer.Flush();
            var result = writer.ToString(); 
        }
    }
}
