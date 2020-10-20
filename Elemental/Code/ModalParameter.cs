using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Text;

namespace Elemental.Code
{
    public class ModalParameter
    {
        public string Title { get; set; }
        public string Class { get; set; }
        public bool DisableBackgroundCancel { get; set; }
        public RenderFragment Content { get; set; }
        public RenderFragment Footer { get; set; }
        public RenderFragment Body { get; set; }
    }

}
