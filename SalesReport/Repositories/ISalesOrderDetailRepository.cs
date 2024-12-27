using SalesReport.Models;

namespace SalesReport.Repositories
{
    public interface ISalesOrderDetailRepository
    {
        List<SalesOrderDetail> GetByProductId(int productId);
    }
}