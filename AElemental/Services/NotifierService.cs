using System;
using System.Threading.Tasks;

namespace AElemental.Services
{
    public class NotifierService
    {
        // Can be called from anywhere
        public async Task Update()
        {
            if (Notify != null)
            {
                await Notify.Invoke();
            }
        }

        public event Func<Task> Notify;
    }

}
