using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Elemental.Code
{
    public class AEException : Exception
    {
        public AEException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
