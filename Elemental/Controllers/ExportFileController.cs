using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Elemental.Services;
using Elemental.Components;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Elemental.Controllers
{
    public class ExportFileController : ControllerBase
    { 
        [HttpGet]
        public IActionResult ToCSV([FromServices] ICSVDataExportService csvService, string filename)
        {
            ITable table;
            lock (csvService)
            {
                table = csvService.GetTable();
                csvService.Dispose();
            }
            var content = table.ExportToCSVInByte();

            return File(content, "application/octet-stream", filename);
        }
    }
}
