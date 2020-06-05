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
