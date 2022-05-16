using System.Collections.Generic;
using System.Threading.Tasks;

namespace AElemental.FormBuilder.Code
{
    public interface IFormFieldRepository
    {
         Task<IEnumerable<FormField>> GetFormFields();
         Task<FormField> GetFormField(int id);
         Task<FormField> AddFormField(FormField formField);
         Task<FormField> UpdateFormField(FormField formField);
         
    }
}