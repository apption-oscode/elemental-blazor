using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Text;
using Elemental.Code;

namespace Elemental.Services
{
    public class ModalService : IModalService
    {
        internal event Action<ModalParameter> OnModalShow;
        internal event Action<ModalParameter> OnModalCloseRequested;

        public void ShowModal(RenderFragment content, string title)
        {
            var modal = new ModalParameter() { Content = content, Title = title };
            OnModalShow?.Invoke(modal);
        }

        public void ShowModal<T>(string title, Dictionary<string, object> parameters) where T : ComponentBase
        {
            if (!typeof(ComponentBase).IsAssignableFrom(typeof(T)))
            {
                throw new ArgumentException($"{typeof(T).FullName} must be a Blazor Component");
            }
            var modalContent = new RenderFragment(builder =>
            {
                var i = 0;
                builder.OpenComponent(i++, typeof(T));
                foreach (var parameter in parameters)
                {
                    builder.AddAttribute(i++, parameter.Key, parameter.Value);
                }
                builder.CloseComponent();
            });
            ShowModal(modalContent, title);
        }
        public void ShowModal(ModalParameter modal)
        {
            OnModalShow?.Invoke(modal);
        }
    }

    public interface IModalService
    {
        void ShowModal(RenderFragment content, string title);
        void ShowModal(ModalParameter modal);
        void ShowModal<T>(string title, Dictionary<string, object> parameters) where T : ComponentBase;
    }
}
