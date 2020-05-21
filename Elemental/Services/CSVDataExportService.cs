using System;
using System.Collections.Generic;
using System.Text;
using Elemental.Components;

namespace Elemental.Services
{
    public interface ICSVDataExportService
    {
        ITable GetTable();
        void SaveTable(ITable t);
    }

    public class CSVDataExportService : ICSVDataExportService
    {
        private ITable _table;
        public ITable GetTable()
        {
            return _table;
        }
        
        public void SaveTable(ITable t)
        {
            _table = t;
        }
    }
}
