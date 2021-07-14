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
using System.Collections.Generic;
using System.Linq;

namespace Elemental.Code
{
    public class HtmlElement : ComponentBase
    {
        [Parameter]
        public RenderFragment ChildContent { get; set; }
        [Parameter(CaptureUnmatchedValues = true)]
        public Dictionary<string, object> InputAttributes { get; set; }
        public Dictionary<string, object> InputAttributesWithoutClass { get; set; }
        protected string _inputClass => InputAttributes != null && InputAttributes.ContainsKey("class") ? InputAttributes["class"] as string : "";

        public Dictionary<string, object> InputAttributesWithoutClassOrStyle { get; set; }
        protected string _inputStyle => InputAttributes != null && InputAttributes.ContainsKey("style") ? InputAttributes["style"] as string : "";


        protected override void OnInitialized()
        {
            base.OnInitialized();

            InputAttributesWithoutClass = InputAttributes?
                .Keys
                .Where(k => k != "class")
                .ToDictionary(_ => _, _ => InputAttributes[_]);

            InputAttributesWithoutClassOrStyle = InputAttributesWithoutClass?
                .Keys
                .Where(k => k != "style")
                .ToDictionary(_ => _, _ => InputAttributes[_]);
        }
    }
}
