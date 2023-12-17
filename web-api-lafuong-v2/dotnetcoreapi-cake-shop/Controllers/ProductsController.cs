using dotnetcoreapi.cake.shop.application;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dotnetcoreapi.cake.shop
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : BaseController<ProductDto, ProductRequestDto, ProductRequestDto>
    {
        public ProductsController(IProductService productService) : base(productService)
        {
        }
    }
}
