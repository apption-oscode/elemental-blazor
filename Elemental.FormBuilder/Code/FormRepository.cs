using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Elemental.FormBuilder.Code
{
    public class FormRepository : IFormRepository
    {
        private readonly AppDbContext _appDbContext;

        public FormRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Form> AddForm(Form form)
        {
            var result = await _appDbContext.Forms.AddAsync(form);
            await _appDbContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Form> GetForm(int formId)
        {
            var result = await _appDbContext.Forms.FirstOrDefaultAsync(f => f.FormID == formId);
            return result;
        }

        public async Task<IEnumerable<Form>> GetForms()
        {
            var results = await _appDbContext.Forms.ToListAsync();
            return results;
        }

        public async Task<Form> UpdateForm(Form form)
        {
            var result = await _appDbContext.Forms.FirstOrDefaultAsync(f => f.FormID == form.FormID);
            if (result != null)
            {
                result.Title = form.Title;
                result.Description = form.Description;

                await _appDbContext.SaveChangesAsync();
            }

            return result;
        }
    }
}