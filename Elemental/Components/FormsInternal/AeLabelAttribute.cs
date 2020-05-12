using System;
using System.Collections.Generic;
using System.Text;

namespace Elemental.Components.FormsInternal
{
    public class AeLabelAttribute : Attribute
    {
        private readonly string _label;

        public AeLabelAttribute(string label)
        {
            _label = label;
        }

        public virtual string Label
        {
            get { return _label; }
        }
    }
}
