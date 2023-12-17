using AutoMapper;
using dotnetcoreapi.cake.shop.domain;
using Microsoft.EntityFrameworkCore;

namespace dotnetcoreapi.cake.shop.application
{
    public class ProductService : BaseService<Product, ProductDto, ProductRequestDto, ProductRequestDto>, IProductService
    {
        private readonly IProductRepository _productRepository;
        public ProductService(IProductRepository productRepository, IMapper mapper)
            : base(productRepository, mapper)
        {
            _productRepository = productRepository;
        }

        /// <summary>
        /// Lấy một bản ghi theo ID
        /// </summary>
        /// <param name="entityId">ID của bản ghi</param>
        /// <returns></returns>
        public override async Task<ProductDto> GetEntityByIdAsync(int entityId)
        {
            var entity = await _baseReadOnlyRepository.GetEntityByIdAsync(entityId);

            var entityDto = _mapper.Map<ProductDto>(entity);

            var hasOrders = await _productRepository.HasOrders(entityId);
            entityDto.HasOrders = hasOrders;

            return entityDto;
        }

        /// <summary>
        /// Map DTO sang entity để thêm bản ghi
        /// </summary>
        /// <param name="entityCreateDto">Đối tượng cần map</param>
        /// <returns></returns>
        protected override async Task<Product> MapCreateAsync(ProductRequestDto entityCreateDto)
        {
            var newProduct = _mapper.Map<Product>(entityCreateDto);
            newProduct.CreatedDate = DateTime.UtcNow;

            return await Task.FromResult(newProduct);
        }

        /// <summary>
        /// Map DTO sang entity để cập nhật bản ghi
        /// </summary>
        /// <param name="entityUpdateDto">Đối tượng cần map</param>
        /// <returns></returns>
        protected override async Task<Product> MapUpdateAsync(int entityId, ProductRequestDto entityUpdateDto)
        {
            var existProduct = await _productRepository.GetEntityByIdAsync(entityId);

            _mapper.Map(entityUpdateDto, existProduct);

            return existProduct;
        }

        /// <summary>
        /// Thực hiện hành động trước khi xoá
        /// </summary>
        /// <param name="product">Đối tượng đã xoá</param>
        /// <returns></returns>
        protected override async Task BeforeDeleteAsync(Product product)
        {
            // Check sản phẩm đã được đặt hàng chưa
            var hasOrders = await _productRepository.HasOrders(product.ProductId);
            if (hasOrders > 0)
            {
                throw new ConstraintException("Không thể xoá sản phẩm đã được đặt hàng");
            }
        }
    }
}
