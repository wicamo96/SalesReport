import { useEffect, useState } from "react"
import { useRef } from "react"
import * as d3 from 'd3'
import { getAllProducts } from "../../services/ProductService.jsx"

export const LineChart = () => {
    const svgRef = useRef()
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([])

    const filterProductSearch = () => {
        if (searchTerm === "") {
            setFilteredProducts(products)
        } else {
            let filteredList = products.filter(product => product.toLowerCase().includes(searchTerm.toLowerCase()))
            setFilteredProducts(filteredList)
        }
    }

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        getAllProducts().then(res => setProducts(res)).then(setIsLoading(false))
    }, [])

    // useEffect(() => {
    //     const w = window.innerWidth * 0.5
    //     const h = window.innerHeight * 0.5

    //     const svg = d3.select(svgRef.current)
    //                   .attr("width", w)
    //                   .attr("height", h)
    //                   .style("overflow", "visible")

    //     const xScale = d3.scaleLinear()
    //                      .domain(d3.extent())

    // }, [])

    return isLoading ? <h1>Loading...</h1> 
    :
    <>
        <div>
            <input></input>
        </div>
        <svg ref={svgRef}></svg>
    </>
    
}