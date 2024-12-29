export const LineChartFilteredList = ({ filteredProducts, setChartProductId }) => {
    return (
        filteredProducts.map(product => {
            return (
                <div>
                    <button className="lineChartFilterTitle" onClick={() => {setChartProductId(product.productID)}}>{product.name}</button>
                </div>
            )
        })
    )
}