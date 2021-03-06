using System.ComponentModel.DataAnnotations;

namespace ProAgil.API.Dtos
{
    public class LoteDto
    {
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        public decimal Preco { get; set; }

        [Required]
        public string DataInicio { get; set; }

        [Required]
        public string DataFim { get; set; }

        [Required]
        public int Quantidade { get; set; }
    }
}