using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Text;

namespace Elemental.Components
{
    public interface ITable
    {
        byte[] ExportToCSVInByte();
    }
}
