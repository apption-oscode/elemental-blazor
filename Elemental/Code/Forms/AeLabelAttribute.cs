using System;
using System.Collections.Generic;
using System.Text;

namespace Elemental.Code.Forms
{
    public class AeLabelAttribute : Attribute
    {
        private readonly string _label;

        private readonly string _placeHolder;

        private readonly int _order;

        private readonly int? _inputLength;
        private readonly string[] _validValues;
        private readonly bool _isDropDown;
        private readonly string _row;
        private readonly string _column;


        public AeLabelAttribute(string label = null, string placeholder = null, int order = 0, int size = 0, string[] validValues = null, bool isDropDown = false, string row = null, string column = null, bool isPasswordField = false)
        {
            _label = label;
            _order = order;
            _inputLength = size;
            this._validValues = validValues;
            _isDropDown = isDropDown;
            if (size == 0)
                _inputLength = null;
            _placeHolder = placeholder;
            this._row = row;
            this._column = column;
            IsPasswordField = isPasswordField;
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

        public virtual string[] ValidValues => _validValues;

        public virtual bool IsDropDown => _isDropDown;

        public virtual string Row {get {return _row; } }
        public virtual string Column {get {return _column; } }

        public virtual bool IsPasswordField { get; }
    }
}
