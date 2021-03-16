using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "{0} is required")]
        public string Username { get; set; }
        [Required(ErrorMessage = "{0} is required")]
        [StringLength(20,MinimumLength=8,
        ErrorMessage="Should be between 8-20 characters")]
        public string Password { get; set; }
        [Required]
        public string knownAs { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string Location {get; set;}
        
    }
}