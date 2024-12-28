import { useEffect, useState } from "react"
import { useRef } from "react"
import * as d3 from 'd3'
import { getAllProducts } from "../../services/ProductService.jsx"
import { LineChartFilteredList } from "./LineChartFilteredList.jsx"
import './LineChart.css'

export const LineChart = () => {
    const svgRef = useRef()
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([])
    const [chartProductId, setChartProductId] = useState(0)

    const filterProductSearch = () => {
        if (searchTerm === "") {
            setFilteredProducts(products)
        } else {
            let filteredList = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
            setFilteredProducts(filteredList)
        }
    }
    
    useEffect(() => {
        getAllProducts().then(res => setProducts(res)).then(setIsLoading(false))
    }, [])

    useEffect(() => {
        filterProductSearch()
    }, [searchTerm])

    useEffect(() => {

    }, [chartProductId])

    useEffect(() => {
        const w = window.innerWidth * 0.5
        const h = window.innerHeight * 0.5

        const svg = d3.select(svgRef.current)
                      .attr("width", w)
                      .attr("height", h)
                      .style("overflow", "visible")

        const xScale = d3.scaleLinear()
                         .domain(d3.extent())

    }, [])

    return isLoading ? <h1>Loading...</h1> 
    :
    <>
        <div>
            <input className="margin" onChange={(e) => {
                                setSearchTerm(e.target.value)
                            }}
            ></input>
            <section className="lineChartFilter">
                {searchTerm == "" ? <LineChartFilteredList filteredProducts={products} setChartProductId={setChartProductId} /> : <LineChartFilteredList filteredProducts={filteredProducts} setChartProductId={setChartProductId} />}
            </section>
        </div>
        <svg ref={svgRef}></svg>
    </>
    
}