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
    public async Task<ElementPosition> GetPosition(object element)
    {
        return await _js.InvokeAsync<ElementPosition>("getPosition", element);
    }

}

public class ElementDimension
{
    public int Width { get; set; }
    public int Height { get; set; }
}

public class ElementPosition
{
    public int Top { get; set; }
    public int Left { get; set; }
    public int Bottom { get; set; }
    public int Right { get; set; }
}
