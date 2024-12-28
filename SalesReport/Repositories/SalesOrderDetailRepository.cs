using SalesReport.Models;
using SalesReport.Utils;

namespace SalesReport.Repositories
{
    public class SalesOrderDetailRepository : BaseRepository, ISalesOrderDetailRepository
    {
        public SalesOrderDetailRepository(IConfiguration configuration) : base(configuration) { }

        public List<SalesOrderDetail> GetByProductId(int productId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT SUM(S.OrderQty) AS 'Sale Quantity', S.ModifiedDate AS 'Sale Date'
                                        FROM Sales.SalesOrderDetail S
                                        LEFT JOIN Production.Product P
                                        ON P.ProductID = S.ProductID
                                        WHERE P.ProductID = @ProductID
                                        GROUP BY S.ModifiedDate";

                    DbUtils.AddParameter(cmd, "ProductId", productId);

                    var reader = cmd.ExecuteReader();
                    var salesOrderDetails = new List<SalesOrderDetail>();

                    while (reader.Read())
                    {
                        salesOrderDetails.Add(new SalesOrderDetail()
                        {
                            OrderQty = DbUtils.GetInt(reader, "Sale Quantity"),
                            ModifiedDate = DbUtils.GetDateTime(reader, "Sale Date")
                        });
                    }

                    reader.Close();

                    return salesOrderDetails;
                }
            }
        }
    }
}