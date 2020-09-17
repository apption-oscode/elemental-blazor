/**
 * Copyright 2020 Apption Corporation
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
