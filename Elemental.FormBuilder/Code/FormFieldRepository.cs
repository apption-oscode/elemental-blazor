using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Elemental.FormBuilder.Code
{
    public class FormFieldRepository : IFormFieldRepository
    {
        private readonly AppDbContext _appDbContext;

        public FormFieldRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<FormField> AddFormField(FormField formField)
        {
            var result = await _appDbContext.FormFields.AddAsync(formField);
            await _appDbContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<FormField> GetFormField(int id)
        {
            var result = await _appDbContext.FormFields.FirstOrDefaultAsync(f => f.FormFieldID == id);
            return result;
        }

        public async Task<IEnumerable<FormField>> GetFormFields()
        {
            var results = await _appDbContext.FormFields.ToListAsync();
            return results;
        }

        public async Task<FormField> UpdateFormField(FormField formField)
        {
            var result = await _appDbContext.FormFields.FirstOrDefaultAsync(f => f.FormFieldID == formField.FormFieldID);
            if (result != null)
            {
                result.Section = formField.Section;
                result.Field = formField.Field;
                result.Extension = formField.Extension;
                result.MaxLength = formField.MaxLength;
                result.Mandatory = formField.Mandatory;
                result.FieldType = formField.FieldType;
                result.DropdownOptionCount = formField.DropdownOptionCount;

                await _appDbContext.SaveChangesAsync();
            }

            return result;
        }
    }
}