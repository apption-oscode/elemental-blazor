using Elemental.Code;
using Microsoft.AspNetCore.Components.Forms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Elemental.Components.Forms
{

    public class ModelFormChangeArgs
    {
        public PropertyInfo PropertyInfo { get; set; }        
        public EditContext EditContext { get; set; }

        public bool HasPropertyChanged<T>(Expression<Func<T, object>> expression)
        {
            return AeModelFormTools.WithPropertyExpression<T>(expression) == PropertyInfo.Name;
        }
    }

    public class ModelFormContext<T>
    {
        private Dictionary<PropertyInfo, IEnumerable<string>> validValues = new Dictionary<PropertyInfo, IEnumerable<string>>();
        public IEnumerable<string> GetValidValues(PropertyInfo propertyInfo)
        {
            IEnumerable<string> validOptions;
            if (validValues.TryGetValue(propertyInfo, out validOptions))
            {
                return validOptions;
            }
            return propertyInfo.DropdownValues();
        }

        public Func<Task> RefreshModel { get; set; }
        public List<PropertyInfo> Properties { get; private set; }

        public async Task UpdateValidValues(PropertyInfo propertyInfo, IEnumerable<string> validOptions)
        {
            validValues[propertyInfo] = validOptions;
            await RefreshModel.Invoke();
        }

        public async Task UpdateValidValues(Expression<Func<T, object>> expression, IEnumerable<string> validOptions)
        {
            await UpdateValidValues(AeModelFormTools.WithPropertyExpression<T>(expression), validOptions);
        }

        public async Task UpdateValidValues(string propertyName, IEnumerable<string> validOptions)
        {
            await UpdateValidValues(GetProperty(propertyName), validOptions);            
        }

        public PropertyInfo GetProperty(string name)
        {
            return Properties.Single(p => string.Equals(p.Name, name, StringComparison.InvariantCultureIgnoreCase));
        }

        public void SetProperties(List<PropertyInfo> properties)
        {
            this.Properties = properties;
        }

    }
}
