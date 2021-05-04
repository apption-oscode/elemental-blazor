using System.Collections.Generic;
using System.Threading.Tasks;

namespace Elemental.FormBuilder.Code
{
    public interface IFormRepository
    {
        Task<IEnumerable<Form>> GetForms();
        Task<Form> GetForm(int formId);
        Task<Form> AddForm(Form form);
        Task<Form> UpdateForm(Form form);
    }
}