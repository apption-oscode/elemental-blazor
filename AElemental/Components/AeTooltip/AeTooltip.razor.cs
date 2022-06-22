namespace AElemental.Components;

public partial class AeTooltip
{
    public struct Directions
    {
        public const string Left = "left";
        public const string Right = "right";
        public const string Top = "top";
        public const string Bottom = "bottom";
    }

    public struct Alignments
    {
        public const string Start = "start";
        public const string End = "end";
        public const string Center = "center";
    }

    public struct States
    {
        // There should be four states open, closed, siyad, and undecided
        public const string Open = "open";
        
    }
}
