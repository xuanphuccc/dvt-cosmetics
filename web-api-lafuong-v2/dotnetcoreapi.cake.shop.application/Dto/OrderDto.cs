using System.ComponentModel.DataAnnotations;

namespace dotnetcoreapi.cake.shop.application
{
    public class OrderDto
    {
        public int OrderId { get; set; }

        [Required]
        [StringLength(100)]
        public string CustomerName { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string CustomerPhone { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string Address { get; set; } = string.Empty;

        [Required]
        public decimal ShippingFee { get; set; }

        [Required]
        public decimal OrderTotal { get; set; }

        public int? OrderStatus { get; set; }

        public DateTime CreatedDate { get; set; }

        public List<OrderItemDto>? Items { get; set; }
    }
}
