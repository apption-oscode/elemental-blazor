using System.ComponentModel.DataAnnotations;
using Elemental.Components.Forms;

namespace Elemental.FormBuilder
{
    public class Form
    {
        [AeFormIgnore]
        [Key]
        public int FormID { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        public string Description { get; set; }
    }
}