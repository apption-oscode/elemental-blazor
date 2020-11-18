using System;
using System.Collections.Generic;
using System.Text;

namespace Elemental.Components.Forms
{
    public class AeFormCategoryAttribute : Attribute
    {
        public AeFormCategoryAttribute(string category, int order)
        {
            Category = category;
            Order = order;
        }

        public string Category { get; }
        public int Order { get; }
    }
}
