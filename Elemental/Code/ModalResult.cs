using System;
using System.Collections.Generic;
using System.Text;

namespace Elemental.Code
{
    public class ModalResult
    {
        public object Data { get; }
        public Type DataType { get; }
        public ModalResult(object data, Type resultType)
        {
            Data = data;
            DataType = resultType;
        }

    }
}
