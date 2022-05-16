using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;

namespace AElemental.Documentation.Wasm
{
    public class WasmHostEnvironment : IHostEnvironment
    {
        public string EnvironmentName { get => "WASM"; set => throw new System.NotImplementedException(); }
        public string ApplicationName { get => "AElementalDemo"; set => throw new System.NotImplementedException(); }
        public string ContentRootPath { get => throw new System.NotImplementedException(); set => throw new System.NotImplementedException(); }
        public IFileProvider ContentRootFileProvider { get => throw new System.NotImplementedException(); set => throw new System.NotImplementedException(); }
    }
}
