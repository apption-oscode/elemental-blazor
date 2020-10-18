using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Elemental.Code
{
    public class ModalReference
    {
        public ModalReference(ModalParameter modalParameter)
        {
            _closed = HandleClosed;
            ModalParameter = modalParameter;
        }

        private readonly TaskCompletionSource<ModalResult> _resultCompletion = new TaskCompletionSource<ModalResult>();
        private readonly Action<ModalResult> _closed;

        private void HandleClosed(ModalResult obj)
        {
            _ = _resultCompletion.TrySetResult(obj);
        }

        public Task<ModalResult> Result => _resultCompletion.Task;
        public ModalParameter ModalParameter { get; set; }
        internal void Dismiss(ModalResult result)
        {
            _closed.Invoke(result);
        }
    }
}
