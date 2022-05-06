using Microsoft.AspNetCore.Components;

namespace AElemental.Code
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
