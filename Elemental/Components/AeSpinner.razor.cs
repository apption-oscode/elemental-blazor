using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Elemental.Components
{
    public partial class AeSpinner
    {
        [Parameter]
        public Spinner Spinner { get; set; }

    }
    public enum Spinner
    {
        Type1,
        Type2,
        Type3,
        Type4,
        Type5,
        Type6,
        Type7
    };
}
