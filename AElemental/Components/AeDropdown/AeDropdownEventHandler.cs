using System;
using Microsoft.AspNetCore.Components;

namespace AElemental.Components;

[EventHandler("onaedropdownselected", typeof(AeDropdownSelectedEventArgs), enableStopPropagation:true, enablePreventDefault: true)]
public static class EventHandlers {}

public class AeDropdownSelectedEventArgs : EventArgs
{
    public string Value { get; set; }
}