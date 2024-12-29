namespace SalesReport.Models
{
    public class SalesOrderDetail
    {
        public int SalesOrderID { get; set; }
        public int SalesOrderDetailID { get; set; }
        public int CarrierTrackingNumber{ get; set; }
        public int OrderQty { get; set; }
        public int ProductID { get; set; }
        public int SpecialOfferID { get; set; }
        public float UnitPrice { get; set; }
        public float UnitPriceDiscount { get; set; }
        public float LineTotal { get; set; }
        public string rowguid { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
