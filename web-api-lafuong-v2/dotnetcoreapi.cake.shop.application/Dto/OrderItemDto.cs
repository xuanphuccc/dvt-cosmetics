using System.ComponentModel.DataAnnotations;

namespace dotnetcoreapi.cake.shop.application
{
    public class OrderItemDto
    {
        public int OrderItemId { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string Type { get; set; } = string.Empty;

        [StringLength(255)]
        public string? Image { get; set; }

        [Required]
        public int Qty { get; set; }

        [Required]
        public decimal Price { get; set; }

        public int ProductId { get; set; }
    }
}
