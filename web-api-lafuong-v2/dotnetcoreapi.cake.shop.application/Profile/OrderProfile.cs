using AutoMapper;
using dotnetcoreapi.cake.shop.domain;

namespace dotnetcoreapi.cake.shop.application
{
    public class OrderProfile : Profile
    {
        public OrderProfile() {
            CreateMap<Order, OrderDto>();
            CreateMap<OrderItem, OrderItemDto>();

            CreateMap<OrderRequestDto, Order>();
            CreateMap<OrderItemRequestDto, OrderItem>();
        }
    }
}
