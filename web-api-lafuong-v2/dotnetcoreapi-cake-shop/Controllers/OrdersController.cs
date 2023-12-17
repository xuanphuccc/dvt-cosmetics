using dotnetcoreapi.cake.shop.application;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dotnetcoreapi.cake.shop
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : BaseController<OrderDto, OrderRequestDto, OrderRequestDto>
    {
        public OrdersController(IOrderService orderService) : base(orderService)
        {
        }
    }
}
