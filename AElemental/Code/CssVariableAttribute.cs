namespace AElemental.Code;

[System.AttributeUsage(System.AttributeTargets.Property)] 
public class CssVariableAttribute : System.Attribute
{
    public string CssVariable;

    public CssVariableAttribute(string cssVariable)
    {
        CssVariable = cssVariable;
    }

}