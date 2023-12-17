using System.ComponentModel.DataAnnotations;

namespace dotnetcoreapi.cake.shop.application
{
    public class ProductRequestDto
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; } = string.Empty;

        [StringLength(255)]
        public string? Description { get; set; }

        [StringLength(255)]
        public string? Image { get; set; }

        [Required]
        public int Qty { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public decimal CostPrice { get; set; }

        [Required]
        [StringLength(255)]
        public string Type { get; set; } = string.Empty;
    }
}
