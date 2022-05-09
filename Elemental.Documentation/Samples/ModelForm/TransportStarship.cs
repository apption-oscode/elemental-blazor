using Elemental.Components;
using System;
using System.ComponentModel.DataAnnotations;

namespace Elemental.Documentation.Data
{
    public class TransportStarship
    {

        [AeFormIgnore]
        private int ID { get; set; } = 1;

        [Required]
        [StringLength(16, ErrorMessage = "Identifier too long (16 character limit).")]
        [AeLabel(placeholder:"Starship identifier...")]
        [AeFormCategory("Identification",1)]
        public string Identifier { get; set; }

        [Required]
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$", ErrorMessage = "Invalid Email Address")]
        [StringLength(20, ErrorMessage = "Identifier too long (16 character limit).")]
        [AeLabel(placeholder: "Enter Email...")]
        public string CaptainsEmail { get; set; }

        [AeLabel(size:50,placeholder:"Describe your starship including crew size")]
        [AeFormCategory("Details", CategoryOrder = 2)]
        public string Description { get; set; }

        [Required]
        [AeLabel(validValues:new[] { "Class1Fighter", "Class1Discovery"})]
        [AeFormCategory("Details", CategoryOrder = 2)]
        public string Classification { get; set; }

        [Range(1, 100000, ErrorMessage = "Accommodation invalid (1-100000).")]
        [AeFormCategory("Details", CategoryOrder = 2)]
        [AeLabel(label: "Maximum Accomodation")]
        public int MaximumAccommodation { get; set; }

        [Required]
        [Range(typeof(bool), "true", "true", ErrorMessage = "This form disallows unapproved ships.")]
        [AeFormCategory("Details", CategoryOrder = 2)]
        [AeLabel("Validated Design")]
        public bool IsValidatedDesign { get; set; }

        [Required]
        [AeLabel("Production Date")]
        [AeFormCategory("Details", CategoryOrder = 2)]
        [DisplayFormat(DataFormatString ="d")]
        public DateTime ProductionDate { get; set; }
        
        public DateTime? FirstFlightDate { get; set; }

        public int? SubLightEngines { get; set; }
    }
}
