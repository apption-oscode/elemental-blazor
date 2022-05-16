using Microsoft.AspNetCore.Components;
using System;
using AElemental.Code;
using Microsoft.JSInterop;

namespace AElemental.Services
{
    public partial class UIControlsService
    {
        private readonly IJSRuntime JSRuntime;

        public UIControlsService(IJSRuntime JSRuntime)
        {
            this.JSRuntime = JSRuntime;
        }

        internal event Action OnModalChange;
        
        public ModalParameter ModalParameter { get; set; }

        private void NotifyModalChange() => OnModalChange?.Invoke();

        /// <summary>
        /// Use in full customized modal
        /// </summary>
        /// <param name="modal"></param>
        public void ToggleModal(ModalParameter modal)
        {
            ModalParameter = modal;
            NotifyModalChange();
        }

        public async void ToggleModal(string title = null, RenderFragment body = null, RenderFragment footer = null)
        {
            var modal = new ModalParameter() { Class = null, Body = body, Footer = footer, Title = title, DisableBackgroundCancel = false };
            ModalParameter = modal;
            //ModalParameter.Body = ModalParameter.Body == body ? null : body;

            if (title is null && body is null && footer is null)
            {
                await JSRuntime.InvokeVoidAsync("modalHelper.unlockBodyScrolling");
            }
            NotifyModalChange();
        }

        /// <summary>
        /// Use in completely override the modal
        /// </summary>
        /// <param name="content"></param>
        /// <param name="disableBackground"></param>
        /// <param name="className"></param>
        public void ToggleModal(RenderFragment content, bool disableBackgroundCancel = false, string className = null)
        {
            var modal = new ModalParameter() { Content = content, DisableBackgroundCancel = disableBackgroundCancel, Class = className };
            ModalParameter = modal;
            NotifyModalChange();
        }
    }
}
