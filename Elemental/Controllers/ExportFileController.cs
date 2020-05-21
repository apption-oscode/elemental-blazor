using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Elemental.Services;
using Elemental.Components;
using System.Text;
// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Elemental.Controllers
{
    public class ExportFileController : ControllerBase
    {
        private ICSVDataExportService _csvService;
        public ExportFileController (ICSVDataExportService csvService)
        {
            _csvService = csvService;
        }

        [HttpGet]
        public IActionResult ToCSV(string filename)
        {
            var table = _csvService.GetTable();
            var content = table.ExportToCSVInByte();
            return File(content, "application/octet-stream", filename);
        }
    }
}
