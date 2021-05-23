using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.API.Dtos
{
    public class PalestranteDto
    {
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        public string MiniCurriculo { get; set; }
        public string ImagemURL { get; set; }

        [Required]
        [Phone]
        public string Telefone { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public List<RedeSocialDto> RedesSociais { get; set; }
        public List<EventoDto> Eventos { get; set; }
    }
}