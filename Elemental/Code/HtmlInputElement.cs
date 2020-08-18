using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using System;
using System.Timers;

namespace Elemental.Code
{
    public class HtmlInputElement : HtmlElement
    {
        [Parameter]
        public string Placeholder { get; set; }
        [Parameter]
        public Action<string> OnInputChange { get; set; }
        [Parameter]
        public int EventTimer { get; set; } = 500;
        [Parameter]
        public string DefaultValue { get; set; }

        protected string _inputValue = "";
        protected Timer inputTimer;

        protected override void OnInitialized()
        {
            base.OnInitialized();

            inputTimer = new Timer(EventTimer);
            inputTimer.Elapsed += OnTimerFire;
            inputTimer.AutoReset = false;
            _inputValue = DefaultValue;
        }

        protected void HandleKeyUp(KeyboardEventArgs e)
        {
            inputTimer.Stop();
            inputTimer.Start();
        }

        protected void OnTimerFire(Object source, ElapsedEventArgs e)
        {
            InvokeAsync(() =>
            {
                OnInputChange?.Invoke(_inputValue);
            });
        }
    }
}
