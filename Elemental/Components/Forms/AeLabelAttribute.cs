using System;
using System.Collections.Generic;
using System.Text;

namespace Elemental.Components.Forms
{
    public class AeLabelAttribute : Attribute
    {
        private readonly string _label;

        private readonly string _placeHolder;

        private readonly int _order;

        private readonly int? _inputLength;

        public AeLabelAttribute(string label = null, string placeholder = null, int order = 0, int size = 0)
        {
            _label = label;
            _order = order;
            _inputLength = size;
            if (size == 0)
                _inputLength = null;
            _placeHolder = placeholder;
        }

        public virtual string Label
        {
            get { return _label; }
        }
        public virtual string PlaceHolder
        {
            get { return _placeHolder; }
        }

        public virtual int? Order
        {
            get { return _order; }
        }

        public virtual int? InputLength
        {
            get { return _inputLength; }
        }


    }
}
