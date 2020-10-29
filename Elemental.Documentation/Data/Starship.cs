using Elemental.Components.Forms;
using System;
using System.ComponentModel.DataAnnotations;

namespace Elemental.Documentation.Data
{
    public class Starship
    {

        [AeFormIgnore]
        private int ID { get; set; } = 1;

        [Required]
        [StringLength(16, ErrorMessage = "Identifier too long (16 character limit).")]
        [AeLabel(placeholder:"Starship identifier...")]
        public string Identifier { get; set; }

        [Required]
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$", ErrorMessage = "Invalid Email Address")]
        [StringLength(20, ErrorMessage = "Identifier too long (16 character limit).")]
        [AeLabel(placeholder: "Enter Email...")]
        public string CaptainsEmail { get; set; }

        [AeLabel(size:50,placeholder:"Describe your starship including crew size")]
        public string Description { get; set; }

        [Required]
        public string Classification { get; set; }

        [Range(1, 100000, ErrorMessage = "Accommodation invalid (1-100000).")]
        [AeLabel(label: "Maximum Accomodation")]
        public int MaximumAccommodation { get; set; }

        [Required]
        [Range(typeof(bool), "true", "true", ErrorMessage = "This form disallows unapproved ships.")]
        [AeLabel("Validated Design")]
        public bool IsValidatedDesign { get; set; }

        [Required]
        [AeLabel("Production Date")]
        public DateTime ProductionDate { get; set; }
    }
}
