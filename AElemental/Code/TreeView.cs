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

namespace AElemental.Code
{
    public class TreeView<T>: ComponentBase
    {
        [Parameter]
        public Func<T, IEnumerable<T>> FetchChildren { get; set; }

        [Parameter]
        public IEnumerable<T> Roots { get; set; }

        [Parameter]
        public Func<T, bool> IsCollapsed { get; set; }

        [Parameter]
        public EventCallback<T> ToggleCollapsed { get; set; }

        private List<(T, bool)> IsCollapsedList = new List<(T, bool)>();

        protected override void OnInitialized()
        {
            foreach (var item in Roots)
            {
                if (!IsCollapsedList.Select(x => x.Item1).Contains(item))
                    IsCollapsedList.Add((item, true));
            }
            if (IsCollapsed == null || !ToggleCollapsed.HasDelegate)
            {
                IsCollapsed = itemCollapsed;
                ToggleCollapsed = new EventCallback<T>(this, (Action<T>)setItemCollapsed);
            }
        }

        private bool itemCollapsed(T item)
        {
            if (!IsCollapsedList.Select(x => x.Item1).Contains(item))
                IsCollapsedList.Add((item, true));
            return IsCollapsedList.First(t => t.Item1.Equals(item)).Item2;
        }

        private void setItemCollapsed(T item)
        {
            var isCollapsed = IsCollapsedList.First(t => t.Item1.Equals(item)).Item2;
            IsCollapsedList[IsCollapsedList.FindLastIndex(x => x.Item1.Equals(item))] = (item, !isCollapsed);
        }


    }
}
