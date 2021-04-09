using System;
using System.Text;
using System.Text.RegularExpressions;

namespace Elemental.FormBuilder
{
    public class FormField
    {
        public string Section { get; set; }
        public string Field { get; set; }
        public ExtensionType Extension { get; set; }
        public int? MaxLength { get; set; }
        public bool Mandatory { get; set; }
        public FormFieldType FieldType { get; set; }
        public int? DropdownOptionCount { get; set; }

        public string Formatted
        {
            get
            {
                var deDashed = Field.Replace("-","");
                return Regex.Replace(deDashed, "[^A-Za-z0-9_]+", "_", RegexOptions.Compiled);
            }
        }

        public string Code
        {
            get 
            {
                return Enum.GetName<ExtensionType>(Extension);
            }
        }

        public string ExtensionLabel
        {
            get
            {
                return ExtensionTypeReference.ClassWords[Extension];
            }
        }

        public string SQLName
        {
            get
            {
                return Extension == ExtensionType.NONE ?
                    Formatted :
                    Formatted + "_" + Code;
            }
        }
        
        public string EFType
        {
            get
            {
                return FormFieldTypeReference.EFTypes[FieldType];
            }
        }

        public string EFCoreAnnotations
        {
            get
            {
                var sb = new StringBuilder();
                // EFCoreAnnotation1: field type
                if (FormFieldTypeReference.Annotations[FieldType] != null) 
                {
                    sb.AppendLine(FormFieldTypeReference.Annotations[FieldType]);
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

        public string JSON
        {
            get
            {
                return $"\"{SQLName}\": \"{Field}\"";
            }
        }

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
    }
}
