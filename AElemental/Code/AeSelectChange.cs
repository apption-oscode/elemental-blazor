using System.Collections.Generic;

namespace AElemental.Components
{
    public class AeSelectChange<T>
    {
        public IEnumerable<T> AddedItems { get; set; }

        public IEnumerable<T> RemovedItems { get; set; }
    }
}
