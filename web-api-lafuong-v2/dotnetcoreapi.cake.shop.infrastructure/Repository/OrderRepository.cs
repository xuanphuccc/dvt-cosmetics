using dotnetcoreapi.cake.shop.domain;
using Microsoft.EntityFrameworkCore;

namespace dotnetcoreapi.cake.shop.infrastructure
{
    public class OrderRepository : BaseRepository<Order>, IOrderRepository
    {
        public OrderRepository(CakeShopContext context) : base(context)
        {
        }

        /// <summary>
        /// Lấy một bản ghi theo ID
        /// </summary>
        /// <param name="orderId">ID của bản ghi</param>
        /// <returns></returns>
        public override async Task<Order> GetEntityByIdAsync(int orderId)
        {
            var order = await _context.Orders.Include(o => o.Items).FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order == null)
            {
                throw new NotFoundException("Đơn hàng không tồn tại", ErrorCode.NotFound);
            }

            return order;
        }
    }
}
