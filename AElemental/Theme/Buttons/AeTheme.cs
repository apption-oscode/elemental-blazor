namespace AElemental.Theme;

public partial class AeTheme
{
    [AeCssVariable]
    public string AePrimary { get; set; } = AeColors.Slate700;
    [AeCssVariable]
    public string AePrimaryAccent { get; set; } = AeColors.Slate600;
    
    [AeCssVariable]
    public string AeSecondary { get; set; } = AeColors.Slate500;
    [AeCssVariable]
    public string AeSecondaryAccent { get; set; } = AeColors.Slate600;
    
    [AeCssVariable]
    public string AeTertiary { get; set; } = AeColors.Slate700;
    [AeCssVariable]
    public string AeTertiaryAccent { get; set; } = AeColors.Slate700;
    
    [AeCssVariable]
    public string AeDanger { get; set; } = AeColors.Red600;
    [AeCssVariable]
    public string AeDangerAccent { get; set; } = AeColors.Red700;
}