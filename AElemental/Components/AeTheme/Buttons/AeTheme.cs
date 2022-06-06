namespace AElemental.Theme;

public partial class AeTheme
{
    [CssVariable("--ae-primary")]
    public string Primary { get; set; } = "#2d3748";
    [CssVariable("--ae-hover-primary")]
    public string HoverPrimary { get; set; } = "#4a5568";
    
    
    [CssVariable("--ae-secondary")]
    public string Secondary { get; set; } = "#4a5568";
    [CssVariable("--ae-hover-secondary")]
    public string HoverSecondary { get; set; } = "#4a5568";
    
    
    [CssVariable("--ae-tertiary")]
    public string Tertiary { get; set; } = "#2d3748";
    [CssVariable("--ae-hover-tertiary")]
    public string HoverTertiary { get; set; } = "#2d3748";
    
    
    [CssVariable("--ae-ghost")]
    public string Ghost { get; set; } = "#2d3748";
    [CssVariable("--ae-hover-ghost")]
    public string HoverGhost { get; set; } = "#2d3748";
    
    
    // [CssVariable("--ae-danger")]
    // public string Danger { get; set; } = "#2d3748";
    // [CssVariable("--ae-danger-tertiary")]
    // public string DangerTertiary { get; set; } = "#2d3748";
    // [CssVariable("--ae-danger-ghost")]
    // public string DangerGhost { get; set; } = "#2d3748";
}