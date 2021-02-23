using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Elemental.Components
{
    public class AeSelectChange<T>
    {
        public IEnumerable<T> AddedItems { get; set; }

        public IEnumerable<T> RemovedItems { get; set; }
    }
}
