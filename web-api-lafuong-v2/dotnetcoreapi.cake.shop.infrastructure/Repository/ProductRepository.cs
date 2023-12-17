using dotnetcoreapi.cake.shop.domain;
using Microsoft.EntityFrameworkCore;

namespace dotnetcoreapi.cake.shop.infrastructure
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public ProductRepository(CakeShopContext context) : base(context)
        {
        }

        /// <summary>
        /// Kiểm tra một sản phẩm đã từng được bán chưa
        /// </summary>
        /// <param name="productId">ID sản phẩm</param>
        /// <returns></returns>
        public async Task<int> HasOrders(int productId)
        {
            var hasOrders = await _context.OrderItems.CountAsync(oi => oi.ProductId == productId);

            return hasOrders;
        }
    }
}
