using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace AElemental.Documentation
{
    public class ParsedFile
    {
        public string Pathname { get; private set; }
        public string AdditionalCS { get; }
        public string Title { get; private set; }
        public object Description { get; private set; }
        public List<string> Html { get; private set; }
        public List<string> Code { get; private set; }
        public List<string> Scss { get; private set; }
        public List<string> AdditionalCode { get; }

        public ParsedFile(string path, string additionalCS)
        {
            Pathname = path;
            if (!string.IsNullOrWhiteSpace(additionalCS))
            {
                AdditionalCode = ReadLines(additionalCS)?.ToList();
            }
            AdditionalCS = additionalCS;
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

        private static List<string> ReadFile(string pathName)
        {
            var assembly = typeof(DocumentationTools).Assembly;
            var asmName = assembly.GetName().Name;
            var fullPath = pathName;
            if (pathName.StartsWith("./"))
                fullPath = pathName.Substring(2);
            fullPath = fullPath.Replace('/', '.');
            fullPath = asmName + "." + fullPath;
            return ReadLines(() => assembly.GetManifestResourceStream(fullPath), Encoding.UTF8).ToList();

        }

        public static IEnumerable<string> ReadLines(Func<Stream> streamProvider,
                                             Encoding encoding)
        {
            using var stream = streamProvider();
            if (stream is null)
                yield break;
            using var reader = new StreamReader(stream, encoding);
            string line;
            while ((line = reader.ReadLine()) != null)
            {
                yield return line;
            }            
        }

        public static IEnumerable<string> ReadLines(string pathname)
        {
            var lines = ReadFile(pathname);
            if (lines is null || !lines.Any())
            {
                Console.Error.WriteLine($"Path {pathname} not found");
                return new[] { $"Title: N/A (File {pathname} not found)", $"Description: N/A (File {pathname} not found)", $"File {pathname} not found" };
            }
            return lines;

            //var asmPath = Path.GetDirectoryName(typeof(DocumentationTools).Assembly.Location);
            //var fullPath = Path.Join(asmPath, pathname);
            //if (string.IsNullOrWhiteSpace(asmPath))
            //{
            //    //strip ./
            //    if (pathname.StartsWith("./"))
            //        fullPath = pathname.Substring(2);
            //}


            //if (!File.Exists(fullPath))
            //{
            //    Console.Error.WriteLine($"Path {fullPath} not found");
            //    return new[] { $"Title: N/A (File {pathname} not found)", $"Description: N/A (File {pathname} not found)", $"File {pathname} not found" };
            //}
            //return File.ReadAllLines(fullPath);

        }
        public static IEnumerable<string> ReadScssLines(string pathname)
        {
            var scssPathname = Path.ChangeExtension(pathname, ".scss");
            return ReadFile(scssPathname);
        }

        public static string ParseTitle(IEnumerable<string> lines)
        {
            return lines
                .FirstOrDefault(
                    l => l.Contains("Title"))
                .Split(":")
                .Skip(1)
                .FirstOrDefault()
                .Trim();
        }

        public static string ParseDescription(IEnumerable<string> lines)
        {
            return lines
                .FirstOrDefault(
                    l => l.Contains("Description"))
                .Split(":")
                .Skip(1)
                .FirstOrDefault()
                .Trim();
        }

        public static List<string> ParseHtml(IEnumerable<string> lines)
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

        public static List<string> ParseCode(IEnumerable<string> lines)
        {
            return lines
                .SkipWhile(l => !l.Trim().Equals("@code {"))
                .ToList();
        }

        public static List<string> ParseScss(IEnumerable<string> lines)
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
