using AutoMapper;
using dotnetcoreapi.cake.shop.domain;
using Microsoft.EntityFrameworkCore;

namespace dotnetcoreapi.cake.shop.application
{
    public class OrderService : BaseService<Order, OrderDto, OrderRequestDto, OrderRequestDto>, IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(
            IOrderRepository orderRepository,
            IMapper mapper) : base(orderRepository, mapper)
        {
            _orderRepository = orderRepository;
        }

        /// <summary>
        /// Map DTO sang entity để thêm bản ghi
        /// </summary>
        /// <param name="entityCreateDto">Đối tượng cần map</param>
        /// <returns></returns>
        protected override async Task<Order> MapCreateAsync(OrderRequestDto orderRequestDto)
        {
            var newOrder = _mapper.Map<Order>(orderRequestDto);

            newOrder.CreatedDate = DateTime.UtcNow;

            // Get order item price
            decimal totalItemsPrice = 0;
            if (newOrder.Items != null)
            {
                foreach (var orderItem in newOrder.Items)
                {
                    totalItemsPrice += orderItem.Price * orderItem.Qty;
                }
            }

            newOrder.OrderStatus = (int)EOrderStatus.Created;

            // Get order total
            newOrder.OrderTotal = totalItemsPrice + orderRequestDto.ShippingFee;

            return await Task.FromResult(newOrder);
        }

        /// <summary>
        /// Map DTO sang entity để cập nhật bản ghi
        /// </summary>
        /// <param name="entityUpdateDto">Đối tượng cần map</param>
        /// <returns></returns>
        protected override async Task<Order> MapUpdateAsync(int entityId, OrderRequestDto entityUpdateDto)
        {
            var existOrder = await _orderRepository.GetEntityByIdAsync(entityId);

            _mapper.Map(entityUpdateDto, existOrder);

            // Get order item price
            decimal totalItemsPrice = 0;
            if (existOrder.Items != null)
            {
                foreach (var orderItem in existOrder.Items)
                {
                    totalItemsPrice += orderItem.Price * orderItem.Qty;
                }
            }

            // Get order total
            existOrder.OrderTotal = totalItemsPrice + existOrder.ShippingFee;

            return existOrder;
        }
    }
}
