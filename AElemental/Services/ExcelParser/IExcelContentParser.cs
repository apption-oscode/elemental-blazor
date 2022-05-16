using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AElemental.Services
{ 
    public interface IExcelContentParser
    {
        String ValidMimeType { get; }

        public Boolean CanParse(String mimeType) => ValidMimeType.Equals(mimeType, StringComparison.InvariantCultureIgnoreCase);
        Task<IList<String[]>> GetRows(String input);
    }
}
