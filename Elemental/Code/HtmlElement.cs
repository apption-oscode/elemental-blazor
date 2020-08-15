using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Text;

namespace Elemental.Code
{
    public class HtmlElement : ComponentBase
    {
        [Parameter]
        public string Classname { get; set; }
        [Parameter]
        public string Style { get; set; }
        [Parameter]
        public RenderFragment ChildContent { get; set; }
        [Parameter]
        public string Id { get; set; }
    }
}
