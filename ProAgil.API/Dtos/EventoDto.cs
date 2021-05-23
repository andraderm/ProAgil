using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.API.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }

        [Required]
        public string Local { get; set; }

        [Required]
        public string DataEvento { get; set; }

        [Required]
        public string Tema { get; set; }

        [Required]
        [Range(1, 120000)]
        public int QtdPessoas { get; set; }
        public string ImagemURL { get; set; }

        [Required]
        [Phone]
        public string Telefone { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public List<LoteDto> Lotes { get; set; }
        public List<RedeSocialDto> RedesSociais { get; set; }
        public List<PalestranteDto> Palestrantes { get; set; }
    }
}