using System;

namespace AElemental.Code
{
    public class AEException : Exception
    {
        public AEException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
