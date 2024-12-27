using SalesReport.Models;
using SalesReport.Utils;

namespace SalesReport.Repositories
{
    public class ProductRepository : BaseRepository, IProductRepository
    {
        public ProductRepository(IConfiguration configuration) : base(configuration) { }

        public List<Product> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT ProductID, Name
                                        FROM Production.Product";

                    var reader = cmd.ExecuteReader();
                    var products = new List<Product>();

                    while (reader.Read())
                    {
                        products.Add(new Product()
                        {
                            ProductID = DbUtils.GetInt(reader, "ProductID"),
                            Name = DbUtils.GetString(reader, "Name")
                        });
                    }

                    reader.Close();

                    return products;
                }
            }
        }
    }
}
