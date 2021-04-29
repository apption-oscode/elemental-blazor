using System.Collections.Generic;

namespace Elemental.FormBuilder
{
    public enum FormFieldType
    {
        Text,
        Integer,
        Decimal,
        Boolean,
        Dropdown,
        Date,
        Time,
        Money
    }

    public static class FormFieldTypeReference
    {
        public static readonly EnumIndexedArray<FormFieldType, string> EFTypes = new EnumIndexedArray<FormFieldType, string>()
        {
            { FormFieldType.Text, "string" },
            { FormFieldType.Integer, "int" },
            { FormFieldType.Decimal, "double" },
            { FormFieldType.Boolean, "bool" },
            { FormFieldType.Dropdown, "string" },
            { FormFieldType.Date, "DateTime" },
            { FormFieldType.Time, "DateTime" },
            { FormFieldType.Money, "double" }
        };

        public static readonly Dictionary<string, string> EFTypesStr = new Dictionary<string, string>()
        {
            { "Text", "string" },
            { "Integer", "int" },
            { "Decimal", "double" },
            { "Boolean", "bool" },
            { "Dropdown", "string" },
            { "Date", "DateTime" },
            { "Time", "DateTime" },
            { "Money", "double" }
        };

        public static readonly EnumIndexedArray<FormFieldType, string> Annotations = new EnumIndexedArray<FormFieldType, string>()
        {
            { FormFieldType.Money, "[Column(TypeName=\"Money\")]" }
        };

        public static readonly Dictionary<string, string> AnnotationsStr = new Dictionary<string, string>()
        {
            { "Money", "[Column(TypeName=\"Money\")]" }
        };
    }

}