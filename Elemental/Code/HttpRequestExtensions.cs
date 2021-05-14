using Microsoft.AspNetCore.Http;

public static class HttpRequestService
{
    public static bool IsInternetExplorer(this HttpRequest request)
    {
        return IsInternetExplorer(request.Headers["User-Agent"]);
    }

    private static bool IsInternetExplorer(string userAgent)
    {
        return userAgent.Contains("MSIE")
               || userAgent.Contains("Trident");
    }
}