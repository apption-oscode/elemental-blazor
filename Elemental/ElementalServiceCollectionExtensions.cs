using Elemental.Services;
using System;
using System.Collections.Generic;
using System.Text;
using Elemental.Components;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ElementalServiceCollectionExtensions
    {
        public static void AddElemental(this IServiceCollection services)
        {
            services.AddSingleton<ICSVDataExportService, CSVDataExportService>();
            services.AddScoped<IModalService, ModalService>();
        }
    }
}
