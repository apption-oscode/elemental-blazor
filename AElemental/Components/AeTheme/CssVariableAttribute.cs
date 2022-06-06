namespace AElemental.Theme;

[System.AttributeUsage(System.AttributeTargets.Property)] 
public class CssVariableAttribute : System.Attribute
{
    public readonly string CssVariable;

    public CssVariableAttribute(string cssVariable)
    {
        CssVariable = cssVariable;
    }
}