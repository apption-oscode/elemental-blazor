namespace AElemental.Components;

public partial class AeProgressStep
{
    public struct States
    {
        // The states are invalid, complete, current, default, and disabled.
        public const string Invalid = "invalid";
        public const string Complete = "complete";
        public const string Current = "current";
        public const string Default = "queued";
    }
}