using SalesReport.Models;

namespace SalesReport.Repositories
{
    public interface IProductRepository
    {
        List<Product> GetAll();
    }
}