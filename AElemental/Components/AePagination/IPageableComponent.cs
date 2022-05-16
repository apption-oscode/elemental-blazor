using System;

namespace AElemental.Components
{
    public interface IPageableComponent
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int Total { get; set; }
        public AePagination Paginator { get; set; }
        public int PageCount => ((int)Math.Ceiling(Total / (decimal)Math.Max(1, PageSize)));
    }
}