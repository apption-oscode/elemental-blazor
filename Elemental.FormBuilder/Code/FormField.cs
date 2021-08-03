using System;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.RegularExpressions;
using Elemental.Components;

namespace Elemental.FormBuilder
{
    public class FormField
    {
        [AeFormIgnore]
        [Key]
        public int FormFieldID { get; set; }

        [Required]
        [StringLength(100)]
        public string Section { get; set; }

        [Required]
        [StringLength(100)]
        public string Field { get; set; }

        [AeLabel(isDropDown:true, validValues: new [] 
            {
                "NONE", "AMT", "AMTL", "AMTR", "CD", "CNT", "DT", "DESC", "DUR", "URL", "EMAIL", "NT", "FCTR", "ID", "FLAG", 
                "MULT", "NAME", "NUM", "PCT", "QTY", "RT", "RTO", "SID", "TXT", "IND", "TIME", "TS", "VAL"
            })]
        public string Extension { get; set; } = "NONE";
        public int? MaxLength { get; set; }
        public bool Mandatory { get; set; }

        [AeLabel(isDropDown:true, validValues: new [] 
        {
            "Text", "Integer", "Decimal", "Boolean", "Dropdown", "Date", "Time", "Money"
        })]
        public string FieldType { get; set; } = "Text";
        public int? DropdownOptionCount { get; set; }

        [AeFormIgnore]
        public string Formatted
        {
            get
            {
                if (Field == null) return string.Empty;

                var deDashed = Field.Replace("-","");
                return Regex.Replace(deDashed, "[^A-Za-z0-9_]+", "_", RegexOptions.Compiled);
            }
        }

        [AeFormIgnore]
        public string Code
        {
            get 
            {
                return Extension;
            }
        }

        [AeFormIgnore]
        public string ExtensionLabel
        {
            get
            {
                return ExtensionTypeReference.ClassWordsStr[Extension];
            }
        }

        [AeFormIgnore]
        public string SQLName
        {
            get
            {
                return Extension == "NONE" ?
                    Formatted :
                    Formatted + "_" + Code;
            }
        }
        
        [AeFormIgnore]
        public string EFType
        {
            get
            {
                return FormFieldTypeReference.EFTypesStr[FieldType];
            }
        }

        [AeFormIgnore]
        public string EFCoreAnnotations
        {
            get
            {
                var sb = new StringBuilder();
                // EFCoreAnnotation1: field type
                if (FormFieldTypeReference.AnnotationsStr.ContainsKey(FieldType))
                {
                    sb.AppendLine(FormFieldTypeReference.AnnotationsStr[FieldType]);
                }

                // EFCoreAnnotation2: required
                if (Mandatory)
                {
                    sb.AppendLine("[Required]");
                }

                // EFCoreAnnotation3: MaxLength
                if (MaxLength.HasValue)
                {
                    sb.AppendLine($"[MaxLength({MaxLength.Value})]");
                }

                return sb.ToString();
            }
        }

        [AeFormIgnore]
        public string JSON
        {
            get
            {
                return $"\"{SQLName}\": \"{System.Web.HttpUtility.JavaScriptStringEncode(Field)}\"";
            }
        }

        [AeFormIgnore]
        public string CSCode
        {
            get
            {
                // /** Section: Outcome Level **/ [Required][MaxLength(100)]public string Outcome_Level_DESC {get;set;}
                // =CONCATENATE("/** Section: ",[@Section], " **/ ",
                //          [@[EF Core Annotation1]],[@[EF Core Annotation2]],[@[EF Core Annotation3]],
                //          "public ",[@[EF Type]]," ",[@[SQL Name]]," {get;set;}")
                var sb = new StringBuilder();

                sb.AppendLine($"/** Section: {Section} **/");
                // EFCoreAnnotations already has a line break at the end
                sb.Append(EFCoreAnnotations);
                sb.AppendLine($"public {EFType} {SQLName} {{ get; set; }}");

                return sb.ToString();
            }
        }

        public FormField Clone()
        {
            return new FormField()
            {
                Section = this.Section,
                Field = this.Field,
                Extension = this.Extension,
                MaxLength = this.MaxLength,
                Mandatory = this.Mandatory,
                FieldType = this.FieldType,
                DropdownOptionCount = this.DropdownOptionCount
            };
        }

        public void TakeValuesFrom(FormField other)
        {
            Section = other.Section;
            Field = other.Field;
            Extension = other.Extension;
            MaxLength = other.MaxLength;
            Mandatory = other.Mandatory;
            FieldType = other.FieldType;
            DropdownOptionCount = other.DropdownOptionCount;
        }
    }
}
