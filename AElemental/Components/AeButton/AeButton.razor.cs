namespace AElemental.Components;

public partial class AeButton
{
    public struct ButtonAppearance
    {
        public const string Primary = "primary"; 
        public const string Secondary = "secondary";  
        public const string Tertiary = "tertiary";
        public const string Ghost = "ghost";
        
        public const string Danger = "danger";
        public const string DangerTertiary = "danger-tertiary";
        public const string DangerGhost = "danger-ghost";
    }

    public struct ButtonSize
    {
        public const string Regular = "";
        public const string Small = "sm";
        public const string Large = "xl";
        public const string FormField = "field";
    }
}