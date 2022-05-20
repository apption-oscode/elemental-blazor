using System.Collections.Generic;
using Microsoft.AspNetCore.Components;

namespace AElemental.Components;

public class AeLayoutInfo
{
    public AeSidebarInfo? SidebarInfo { get; set; }
    public AeTopbarInfo? TopbarInfo { get; set; }
}

public class AeSidebarInfo
{
    public List<AeNavLinkInfo> SidebarLinks { get; set; }
}

public class AeNavLinkInfo
{
    public string Name { get; set; }
    public string Url { get; set; }
    public string Icon { get; set; }
    public List<AeNavLinkInfo> SubLinks { get; set; }
}


public class AeTopbarInfo
{
    public string Title { get; set; }
    public RenderFragment Branding { get; set; }
    public List<AeNavLinkInfo> TopbarLinks { get; set; }
}