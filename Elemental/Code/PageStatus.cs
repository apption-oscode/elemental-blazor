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

using System;
using System.Collections.Generic;
using System.Text;

namespace Elemental.Code
{
    public class PageStatus
    {
        /// <summary>
        /// Start from 1
        /// </summary>
        public int CurrentPage { get; set; }
        /// <summary>
        /// Number of pages
        /// </summary>
        public int PageCount { get; set; }
        /// <summary>
        /// Number of items inside a page
        /// </summary>
        public int PageSize { get; set; }

        public PageStatus (int pageCount, int pagesize)
        {
            CurrentPage = 1;
            PageCount = pageCount;
            PageSize = pagesize;
        }
    }
}
