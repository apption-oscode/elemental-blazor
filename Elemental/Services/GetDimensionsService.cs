using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.JSInterop;
using System.Threading.Tasks;

//This is used to get the height and width of whatever element is supplied
//await Service.GetDimensions(SomeElementReference);
//returns that data as an 'ElementDimension' object with Width and height components
//it works with blazor ElementReference objects, javascript get by id untested

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
