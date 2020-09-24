/**
 * Copyright 2020 Apption Corporation
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
