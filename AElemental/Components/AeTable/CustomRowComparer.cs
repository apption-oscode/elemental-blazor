using System;
using System.Collections.Generic;

namespace AElemental.Components
{
    public class CustomRowComparer<T> : IComparer<T>
    {
        private Comparison<T> comparison;

        public CustomRowComparer(Comparison<T> comparison)
        {
            if (comparison == null)
                throw new ArgumentNullException(nameof(comparison));
            this.comparison = comparison;
        }

        public int Compare(T x, T y)
        {
            return comparison(x, y);
        }
    }
}

