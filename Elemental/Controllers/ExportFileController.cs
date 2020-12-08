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
using System.Linq;
using System.Threading.Tasks;
//using Microsoft.AspNetCore.Mvc;
using Elemental.Services;
using Elemental.Components;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860


/// <summary>
/// Not used since mvc is involved here in a class library
/// </summary>
namespace Elemental.Controllers
{
    //public class ExportFileController : ControllerBase
    public class ExportFileController
    { 
        //[HttpGet]
        //public IActionResult ToCSV([FromServices] ICSVDataExportService csvService, string filename)
        //{
        //    ITable table;
        //    lock (csvService)
        //    {
        //        table = csvService.GetTable();
        //        csvService.Dispose();
        //    }
        //    var content = table.ExportToCSVInByte();

        //    return File(content, "application/octet-stream", filename);
        //}
    }
}
