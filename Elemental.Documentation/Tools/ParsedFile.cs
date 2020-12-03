using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Elemental.Documentation
{
    public class ParsedFile
    {
        public string Pathname { get; private set; }
        public string Title { get; private set; }
        public object Description { get; private set; }
        public List<string> Html { get; private set; }
        public List<string> Code { get; private set; }
        public List<string> Scss { get; private set; }

        public ParsedFile (string path)
        {
            Pathname = path;
            Initialize();
        }

        private void Initialize()
        {
            var lines = ReadLines(Pathname);
            Title = ParseTitle(lines);
            Description = ParseDescription(lines);
            Html = ParseHtml(lines);
            Code = ParseCode(lines);

            Scss = ScssIfExists(Pathname);
        }


        public static string[] ReadLines(string pathname)
        {
            if (!File.Exists(pathname))
            {
                return new[] { $"Title: N/A (File {pathname} not found)", $"Description: N/A (File {pathname} not found)",$"File {pathname} not found" };
            }
            return File.ReadAllLines(pathname);
        }
        public static string[] ReadScssLines(string pathname)
        {
            var scssPathname = Path.ChangeExtension(pathname, ".scss");
            if (!File.Exists(scssPathname))
            {
                return null;
            }
            return File.ReadAllLines(scssPathname);
        }

        public static string ParseTitle(string[] lines)
        {
            return lines
                .FirstOrDefault(
                    l => l.Contains("Title"))
                .Split(":")
                .Skip(1)
                .FirstOrDefault()
                .Trim();
        }

        public static string ParseDescription(string[] lines)
        {
            return lines
                .FirstOrDefault(
                    l => l.Contains("Description"))
                .Split(":")
                .Skip(1)
                .FirstOrDefault()
                .Trim();
        }

        public static List<string> ParseHtml(string[] lines)
        {
            return lines
                .SkipWhile(l => !l.Trim().Equals("*@"))
                .Skip(1)
                .SkipWhile(l => string.IsNullOrWhiteSpace(l))
                .TakeWhile(l => !l.Trim().Equals("@code {"))
                .Reverse()
                .SkipWhile(l => string.IsNullOrWhiteSpace(l))
                .Reverse()
                .ToList();
        }

        public static List<string> ParseCode(string[] lines)
        {
            return lines
                .SkipWhile(l => !l.Trim().Equals("@code {"))
                .ToList();
        }

        public static List<string> ParseScss(string[] lines)
        {
            return lines?.ToList();
        }

        public static List<string> ScssIfExists(string pathname)
        {
            var lines = ReadScssLines(pathname);
            return ParseScss(lines);
        }
    }
}
