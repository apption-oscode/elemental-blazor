using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class GenericComparer<T> : IComparer<T>
{
    private Comparison<T> comparison;

    public GenericComparer(Comparison<T> comparison)
    {
        if (comparison == null)
            throw new ArgumentNullException("comparison");
        this.comparison = comparison;
    }

    public int Compare(T x, T y)
    {
        return comparison(x, y);
    }
}

