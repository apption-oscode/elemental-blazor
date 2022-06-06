namespace AElemental.Theme;

public partial class AeTheme
{
    [AeCssVariable]
    public string AeCornerRadius { get; set; } = "4px";

    [AeCssVariable]
    public string AeHoverUi { get; set; } = AeColors.Slate100;

    
    [AeCssVariable]
    public string AeText { get; set; } = AeColors.Slate900;
    
    [AeCssVariable]
    public string AeTextButton { get; set; } = AeColors.White;
    
    [AeCssVariable]
    public string AeTextLink { get; set; } = AeColors.Blue600;
    
    [AeCssVariable]
    public string AeHoverTextLink { get; set; } = AeColors.Blue700;
}