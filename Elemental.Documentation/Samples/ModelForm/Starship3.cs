using Elemental.Components.Forms;
using System;
using System.ComponentModel.DataAnnotations;

namespace Elemental.Documentation.Data
{
    public class Starship3
    {
        [AeFormIgnore]
        private int ID { get; set; } = 1;

        [Required]
        [AeLabel(placeholder: "Starship identifier...", row: "1", column: "1")]
        [AeFormCategory("Identification", 1)]
        public string ShipName { get; set; }

        [Required]
        [StringLength(16, ErrorMessage = "Identifier too long (16 character limit).")]
        [AeLabel(placeholder: "Starship identifier...", row: "1", column: "2")]
        [AeFormCategory("Identification", 1)]
        public string Identifier { get; set; }

        [Required]
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$", ErrorMessage = "Invalid Email Address")]
        [StringLength(20, ErrorMessage = "Identifier too long (16 character limit).")]
        [AeLabel(placeholder: "Enter Email...", row: "2", column: "1")]
        [AeFormCategory("Identification", 1)]
        public string CaptainsEmail { get; set; }


        [Required]
        [AeLabel(validValues: new[] { "Class1Fighter", "Class1Discovery" }, row: "2", column: "2")]
        [AeFormCategory("Identification", 1)]
        public string Classification { get; set; }


        [AeLabel(size: 50, placeholder: "Describe your starship including crew size", row: "3", column: "1")]
        [AeFormCategory("Details", 2)]
        public string Description { get; set; }

        [Range(1, 100000, ErrorMessage = "Accommodation invalid (1-100000).")]
        [AeLabel(label: "Maximum Accomodation", row: "4", column: "1")]
        [AeFormCategory("Details", 2)]
        public int MaximumAccommodation { get; set; }

        [Required]
        [Range(typeof(bool), "true", "true", ErrorMessage = "This form disallows unapproved ships.")]
        [AeLabel("Validated Design", row: "4", column: "2")]
        [AeFormCategory("Details", 2)]
        public bool IsValidatedDesign { get; set; }

        [Required]
        [AeLabel("Production Date", row: "4", column: "3")]
        [AeFormCategory("Details", 2)]
        public DateTime ProductionDate { get; set; }

        [AeLabel("Production Date", row: "5", column: "1")]
        [AeFormCategory("Details", 2)]
        public DateTime? FirstFlightDate { get; set; }

        [AeLabel("Production Date", row: "5", column: "2")]
        [AeFormCategory("Details", 2)]
        public int? SubLightEngines { get; set; }
    }
}
