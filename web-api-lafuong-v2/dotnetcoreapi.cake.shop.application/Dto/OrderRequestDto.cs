using dotnetcoreapi.cake.shop.domain;
using System.ComponentModel.DataAnnotations;

namespace dotnetcoreapi.cake.shop.application
{
    public class OrderRequestDto
    {
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

        public int? OrderStatus { get; set; }


        [Required]
        public List<OrderItemRequestDto>? Items { get; set; }
    }
}
