using System;
using System.Collections.Generic;
using System.Text;

namespace Elemental.Code.Forms
{
    public class AeFormCategoryAttribute : Attribute
    {
        public AeFormCategoryAttribute(string category, int categoryOrder = 0)
        {
            Category = category;
            CategoryOrder = categoryOrder;
        }

        public string Category { get; }
        public int CategoryOrder { get; set; }
    }
}
