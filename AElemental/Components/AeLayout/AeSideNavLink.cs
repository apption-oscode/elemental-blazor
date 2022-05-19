using System.Collections.Generic;

namespace AElemental.Components;

public class AeSideNavLink
{
    public string? Url { get; set; }
    public string? Name { get; set; }
    public string? Icon { get; set; }
    
    public List<AeSideNavLink>? SubLinks { get; set; }
}