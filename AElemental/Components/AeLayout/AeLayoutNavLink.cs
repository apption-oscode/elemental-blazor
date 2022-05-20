using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Components;

namespace AElemental.Components;

public class AeLayoutNavLink
{
    public string? Name { get; set; }
    public string? Url { get; set; }
    public string? Icon { get; set; }
    
    public IEnumerable<AeLayoutNavLink>? SubLinks { get; set; }
    
    public RenderFragment? CustomRender { get; set; }
}