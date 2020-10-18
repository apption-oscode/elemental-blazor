using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Text;
using Elemental.Code;

namespace Elemental.Services
{
    public class ModalService : IModalService
    {
        internal event Action<ModalReference> OnModalShow;
        //internal event Action<ModalReference> OnModalCloseRequested;

        public ModalReference ShowModal(RenderFragment content, string title)
        {
            var modal = new ModalParameter() { Content = content, Title = title };
            var modalReference = new ModalReference(modal);
            OnModalShow?.Invoke(modalReference);
            return modalReference;
        }

        public ModalReference ShowModal<T>(string title, Dictionary<string, object> parameters) where T : ComponentBase
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
            return ShowModal(modalContent, title);
        }
        public ModalReference ShowModal(ModalParameter modal)
        {
            var modalReference = new ModalReference(modal);
            OnModalShow?.Invoke(modalReference);
            return modalReference;
        }
    }

    public interface IModalService
    {
        ModalReference ShowModal(RenderFragment content, string title);
        ModalReference ShowModal(ModalParameter modal);
        ModalReference ShowModal<T>(string title, Dictionary<string, object> parameters) where T : ComponentBase;
    }
}
