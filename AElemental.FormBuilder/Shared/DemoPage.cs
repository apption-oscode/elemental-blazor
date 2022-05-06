using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace AElemental.FormBuilder.Shared
{
    public class DemoPage : ComponentBase
    {
        [Inject]
        IJSRuntime JSRuntime { get; set; }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            await JSRuntime.InvokeVoidAsync("initHighlight");
        }
    }
}
