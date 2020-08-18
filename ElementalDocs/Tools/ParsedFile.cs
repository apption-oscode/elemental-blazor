﻿using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ElementalDocs
{
    public class ParsedFile
    {
        public string Pathname { get; private set; }
        public string Title { get; private set; }
        public object Description { get; private set; }
        public List<string> Html { get; private set; }
        public List<string> Code { get; private set; }

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
        }


        public static string[] ReadLines(string pathname)
        {
            return File.ReadAllLines(pathname);
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
                .SkipWhile(l => !l.Equals("*@"))
                .Skip(1)
                .SkipWhile(l => string.IsNullOrWhiteSpace(l))
                .TakeWhile(l => !l.Equals("@code {"))
                .Reverse()
                .SkipWhile(l => string.IsNullOrWhiteSpace(l))
                .Reverse()
                .ToList();
        }

        public static List<string> ParseCode(string[] lines)
        {
            return lines
                .SkipWhile(l => !l.Equals("@code {"))
                .ToList();
        }
    }
}
