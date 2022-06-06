using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;

namespace AElemental.Theme;

[System.AttributeUsage(System.AttributeTargets.Property)] 
public class AeCssVariableAttribute : System.Attribute
{
    public readonly string AeCssVariable;

    public AeCssVariableAttribute([CallerMemberName] string aeCssVariable = "")
    {
        var cssVar = ToCssVariable(aeCssVariable);
        AeCssVariable = cssVar.StartsWith("--") ? cssVar : $"--{cssVar.ToLower()}";
    }

    private static string ToCssVariable(string str)
    {
        return Regex.Replace(str, "[a-z][A-Z]", m => $"{m.Value[0]}-{char.ToLower(m.Value[1])}");
    }
}