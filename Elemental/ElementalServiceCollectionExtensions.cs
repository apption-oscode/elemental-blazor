using Elemental.Services;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ElementalServiceCollectionExtensions
    {
        public static void AddElemental(this IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddScoped<UIControlsService>();
            services.AddScoped<NotifierService>();
            services.AddScoped<GetDimensionsService>();
        }
    }
}
