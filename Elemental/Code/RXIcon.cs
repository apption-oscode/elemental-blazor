using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Elemental.Code
{
    public class RXIcon
    {
        public string Name { get; set; }
        public string Classname { get; set; }
        public RXStyle Style { get; set; }

        public enum RXStyle
        {
            Line,
            Fill
        }
        
  //<i class="ri-admin-line ri-fw"></i> <!-- fixed width -->
  //< i class="ri-admin-line ri-xxs"></i> <!-- 0.5em -->
  //<i class="ri-admin-line ri-xs"></i> <!-- 0.75em -->
  //<i class="ri-admin-line ri-sm"></i> <!-- 0.875em -->
  //<i class="ri-admin-line ri-1x"></i> <!-- 1em -->
  //<i class="ri-admin-line ri-lg"></i> <!-- 1.3333em -->
  //<i class="ri-admin-line ri-xl"></i> <!-- 1.5em -->
  //<i class="ri-admin-line ri-2x"></i> <!-- 2em -->
  //<i class="ri-admin-line ri-3x"></i> <!-- 3em -->
  //...
  //<i class="ri-admin-line ri-10x"></i> <!-- 10em -->
    }
}
