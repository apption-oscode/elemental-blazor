/**
 * Copyright 2021 Apption Corporation
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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Elemental.Code
{
    public class NonGenericTreeView<T>: TreeView<T>
    {
        [Parameter]
        public Func<T, string> RenderNode { get; set; }

        [Parameter]
        public EventCallback<T> NodeClicked { get; set; }

        [Parameter]
        public Func<T, bool> IsBold { get; set; }

        [Parameter]
        public Func<T, bool> NodeIsClickable { get; set; }


        protected override void OnInitialized()
        {
            base.OnInitialized();
            if (!NodeClicked.HasDelegate)
                NodeClicked = new EventCallback<T>(this, (Action<T>)nodeClicked);
            if (IsBold == null)
                IsBold = isBold;
            if (NodeIsClickable == null)
                NodeIsClickable = isClickable;
        }

        private void nodeClicked(T root) {/*do nothing*/}
        private bool isBold(T root) { return false; }
        private bool isClickable(T root) { return true; }
    }
}
