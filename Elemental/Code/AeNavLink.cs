using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Elemental.Code
{
    public class AeNavLink
    {
        public string To { get; set; }
        public string Label { get; set; }
        public string Title { get; set; }
        public string IconName { get; set; }
        public string IconClassName { get; set; }
        public string Color { get; set; }
        public RXIcon.RXStyle IconStyle { get; set; }
        public List<AeNavLink> ChildLinks { get; set; } = new List<AeNavLink>();
        public RenderFragment CustomRender { get; set; }
        public bool Enable { get; set; } = true;
    }
}
