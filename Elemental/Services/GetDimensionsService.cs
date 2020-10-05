using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.JSInterop;
using System.Threading.Tasks;

public class GetDimensionsService
{
  private IJSRuntime _js;

  public GetDimensionsService(IJSRuntime js)
  {
    _js = js;
  }

  public async Task<ElementDimension> GetDimensions(object element)
  {
    return await _js.InvokeAsync<ElementDimension>("getDimensions", element);
  }

}

public class ElementDimension
{
  public int Width { get; set; }
  public int Height { get; set; }
}
