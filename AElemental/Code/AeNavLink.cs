using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace AElemental.Code
{
    public class AeNavLink
    {
        public string To { get; set; }
        public string Label { get; set; }
        public string Title { get; set; }
        public string IconName { get; set; }
        public string IconClassName { get; set; }
        public string Color { get; set; }
        public Dictionary<string, object> IconAttributes { get; set; }
        public string IconStyle { get; set; }
        public List<AeNavLink> ChildLinks { get; set; } = new List<AeNavLink>();
        public RenderFragment CustomRender { get; set; }
        public bool Enable { get; set; } = true;
        public RenderFragment IconRender { get; set; }
    }
}
