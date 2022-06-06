namespace AElemental.Theme;

public partial class AeTheme
{
    [AeCssVariable]
    public string AePrimary { get; set; } = "#2d3748";
    [AeCssVariable]
    public string AeHoverPrimary { get; set; } = "#4a5568";
    
    
    [AeCssVariable]
    public string AeSecondary { get; set; } = "#718096";
    [AeCssVariable]
    public string AeHoverSecondary { get; set; } = "#4a5568";
    
    
    [AeCssVariable]
    public string AeTertiary { get; set; } = "#2d3748";
    [AeCssVariable]
    public string AeHoverTertiary { get; set; } = "#2d3748";
    
    
    [AeCssVariable]
    public string AeGhost { get; set; } = "#2d3748";
    [AeCssVariable]
    public string AeHoverGhost { get; set; } = "#2d3748";
    
    
    // [CssVariable("--ae-danger")]
    // public string Danger { get; set; } = "#2d3748";
    // [CssVariable("--ae-danger-tertiary")]
    // public string DangerTertiary { get; set; } = "#2d3748";
    // [CssVariable("--ae-danger-ghost")]
    // public string DangerGhost { get; set; } = "#2d3748";
}