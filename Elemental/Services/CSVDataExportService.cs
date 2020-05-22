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
        void Dispose();
    }

    public class CSVDataExportService : ICSVDataExportService, IDisposable
    {
        private ITable _table;
        public ITable GetTable()
        {
            return _table;
        }
        
        public void SaveTable(ITable t)
        {
            //var content = t.ExportToCSVInByte();
            _table = t;
        }

        public void Dispose()
        {
            _table = null;
        }
    }
}
