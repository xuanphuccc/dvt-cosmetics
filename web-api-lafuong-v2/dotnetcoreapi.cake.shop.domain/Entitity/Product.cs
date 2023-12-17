﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnetcoreapi.cake.shop.domain
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

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

        public DateTime? CreatedDate { get; set; }

        public List<OrderItem>? OrderItems { get; set; }
    }
}
