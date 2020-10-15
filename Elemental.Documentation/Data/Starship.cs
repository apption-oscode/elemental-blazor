﻿using Elemental.Components.FormsInternal;
using System;
using System.ComponentModel.DataAnnotations;

namespace Elemental.Documentation.Data
{
    public class Starship
    {
        [Required]
        [StringLength(16, ErrorMessage = "Identifier too long (16 character limit).")]
        [AeLabel(placeholder:"Starship identifier...")]
        public string Identifier { get; set; }

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
