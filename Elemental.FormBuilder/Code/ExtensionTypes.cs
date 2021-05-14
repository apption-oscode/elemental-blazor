using System.Collections.Generic;

namespace Elemental.FormBuilder
{
    public enum ExtensionType
    {
        NONE,
        AMT,
        AMTL,
        AMTR,
        CD,
        CNT,
        DT,
        DESC,
        DUR,
        URL,
        EMAIL,
        NT,
        FCTR,
        ID,
        FLAG,
        MULT,
        NAME,
        NUM,
        PCT,
        QTY,
        RT,
        RTO,
        SID,
        TXT,
        IND,
        TIME,
        TS,
        VAL

    }

    public static class ExtensionTypeReference
    {
        public readonly static EnumIndexedArray<ExtensionType, string> ClassWords = new EnumIndexedArray<ExtensionType, string>() 
        {
            { ExtensionType.NONE, "None" },
            { ExtensionType.AMT, "Amount" },
            { ExtensionType.AMTL, "Amount (local currency)" },
            { ExtensionType.AMTR, "Amount (reporting currency)" },
            { ExtensionType.CD, "Code - A code may be paired with a description, name or nothing at all (in cases where the code is meaningful)" },
            { ExtensionType.CNT, "Count" },
            { ExtensionType.DT, "Date" },
            { ExtensionType.DESC, "Description" },
            { ExtensionType.DUR, "Duration" },
            { ExtensionType.URL, "URL" },
            { ExtensionType.EMAIL, "Email" },
            { ExtensionType.NT, "Notes" },
            { ExtensionType.FCTR, "Factor" },
            { ExtensionType.ID, "Identification / Identifier" },
            { ExtensionType.FLAG, "Indicator" },
            { ExtensionType.MULT, "Multiplier" },
            { ExtensionType.NAME, "Name" },
            { ExtensionType.NUM, "Number" },
            { ExtensionType.PCT, "Percentage" },
            { ExtensionType.QTY, "Quantity" },
            { ExtensionType.RT, "Rate" },
            { ExtensionType.RTO, "Ratio" },
            { ExtensionType.SID, "Surrogate Key" },
            { ExtensionType.TXT, "Text" },
            { ExtensionType.IND, "Indicator" },
            { ExtensionType.TIME, "Time" },
            { ExtensionType.TS, "Timestamp" },
            { ExtensionType.VAL, "Value" }
        };

        public readonly static Dictionary<string, string> ClassWordsStr = new Dictionary<string, string>()
        {
            { "NONE", "None" },
            { "AMT", "Amount" },
            { "AMTL", "Amount (local currency)" },
            { "AMTR", "Amount (reporting currency)" },
            { "CD", "Code - A code may be paired with a description, name or nothing at all (in cases where the code is meaningful)" },
            { "CNT", "Count" },
            { "DT", "Date" },
            { "DESC", "Description" },
            { "DUR", "Duration" },
            { "URL", "URL" },
            { "EMAIL", "Email" },
            { "NT", "Notes" },
            { "FCTR", "Factor" },
            { "ID", "Identification / Identifier" },
            { "FLAG", "Indicator" },
            { "MULT", "Multiplier" },
            { "NAME", "Name" },
            { "NUM", "Number" },
            { "PCT", "Percentage" },
            { "QTY", "Quantity" },
            { "RT", "Rate" },
            { "RTO", "Ratio" },
            { "SID", "Surrogate Key" },
            { "TXT", "Text" },
            { "IND", "Indicator" },
            { "TIME", "Time" },
            { "TS", "Timestamp" },
            { "VAL", "Value" }
        };

        public readonly static EnumIndexedArray<ExtensionType, string> Definitions = new EnumIndexedArray<ExtensionType, string>()
        {
            { ExtensionType.NONE, "-" },
            { ExtensionType.AMT, "A numeric measurement of monetary value. An amount attribute can be specified as an integer, may include decimal positions and may have a positive or negative value. For example, $23,943.00, $99, -$14.00." },
            { ExtensionType.AMTL, "A numeric measurement of monetary value expressed in local currency." },
            { ExtensionType.AMTR, "A numeric measurement of monetary value expressed in a reporting currency." },
            { ExtensionType.CD, "A set of one or more user-defined values that represent a more meaningful and descriptive piece of business information. A code usually represents a static set of values. For example, \"C01\" may be the coded value for the description \"Calendar Year 2000 - Period 1\"." },
            { ExtensionType.CNT, "An integer number that represents the counted value for some business event, programmatically calculated by a counter." },
            { ExtensionType.DT, "A point in time in terms of day, month, or year in any combination This includes calendar days (MMDDYYYY, YYYYMMDD) and fiscal dates." },
            { ExtensionType.DESC, "A word or phrase that interprets a, code. For example, \"Calendar Year 2000 - Period 1\" is the description for the coded value \"C01\"." },
            { ExtensionType.DUR, "A numeric field that represents the time (greater than hours and minutes) during which something exists or lasts." },
            { ExtensionType.URL, "Standard URL" },
            { ExtensionType.EMAIL, "Single email Address" },
            { ExtensionType.NT, "Long text for notes" },
            { ExtensionType.FCTR, "Numeric field expressing a real number other than a percentage value. For example, PRODUCT COST GROSSUP FACTOR might hold the numeric value that is used to calculated a grossed up product cost." },
            { ExtensionType.ID, "A unique label. Identifiers can often be classed as business or surrogate. A business identifier is a commonly used by a business unit. For example, a serial number used to identify a piece of EQUIPMENT. Business identifiers may have some intelligence. Surrogate identifiers usually do not have any meaning or intelligence; they merely provide a unique key." },
            { ExtensionType.FLAG, "A code that has only 2 domain values: Y or N." },
            { ExtensionType.MULT, "An integer value that can hold 1 of 3 values: -1, 0, 1. Multipliers are used to derive other values." },
            { ExtensionType.NAME, "Character value used to identify or describe a business object or concept. This is usually a commonly used, descriptive name or title. It is often a proper name for example, SERVICE NAME, CUSTOMER NAME. The classword NAME can be paired with a code if it's deemed to be more meaningful." },
            { ExtensionType.NUM, "A value which is not for the purpose of measuring a quantity or expressing a percentage or factor, but which is usually a numeric value. Non-numeric characters could be contained in the value, such as in ACTIVITY NUMBER. For this reason, attributes with this class word are not normally subject to arithmetic." },
            { ExtensionType.PCT, "Numeric field expressing a percentage. For example an attribute DISCOUNTED SALES PERCENTAGE might hold the percentage that is used to discount price of a product." },
            { ExtensionType.QTY, "An integer number that represents the counted value for some business event or other object. For example, TOTAL INVENTORY QUANTITY." },
            { ExtensionType.RT, "A quantity, amount, or degree of something measured per unit of something else. An amount of payment or charge based on another amount; for example the amount of premium per unit of insurance." },
            { ExtensionType.RTO, "The indicated quotient of two mathematical expressions. The relationship in quantity, amount, or size between two or more things." },
            { ExtensionType.SID, "A unique identifier that does not have any meaning or intelligence. The SID is used for the unique identifiers of mart dimensions." },
            { ExtensionType.TXT, "Free form or unstructured text description. Text, unlike name and description, does not have any specific pre-defined purpose." },
            { ExtensionType.IND, "Binary value of 0 or 1 to be used as indicator" },
            { ExtensionType.TIME, "A point in time or measurement stated in terms of hour, minute, second or fraction thereof in any combination. (HH:MM:SS, HHMM, HH, etc.) This does not include hours measured as a quantity, such as the number of hours it takes to fulfill a purchase order." },
            { ExtensionType.TS, "A system generated date and time value that is used to record a system event. Often the timestamp is used for audit purposes." },
            { ExtensionType.VAL, "A numeric value that can be used in an arithmetic computation." }
        };
    }
}
