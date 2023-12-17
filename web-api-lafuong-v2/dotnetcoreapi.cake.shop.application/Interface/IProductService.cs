
using dotnetcoreapi.cake.shop.domain;

namespace dotnetcoreapi.cake.shop.application
{
    public interface IProductService : IBaseService<ProductDto, ProductRequestDto, ProductRequestDto>
    {
    }
}
