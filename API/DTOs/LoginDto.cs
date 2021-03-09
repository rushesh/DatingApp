using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class LoginDto
    {
        [Required(ErrorMessage="{0} is Required.")]
        public string Username { get; set; }
        [Required(ErrorMessage="{0} is Required.")]
        public string Password { get; set; }

    }
}