import { useEffect, useState } from "react"
import { useRef } from "react"
import * as d3 from 'd3'
import { getAllProducts } from "../../services/ProductService.jsx"
import { LineChartFilteredList } from "./LineChartFilteredList.jsx"
import './LineChart.css'
import { getByProductId } from "../../services/SalesOrderDetailService.jsx"

export const LineChart = () => {
    const svgRef = useRef()
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([])
    const [chartProductId, setChartProductId] = useState(0)
    const [salesData, setSalesData] = useState([])

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
        getByProductId(chartProductId).then(res => {
            res.map(entry => {
                 let parse = entry.modifiedDate.split("T", 1)
                 entry.modifiedDate = Date.parse(parse[0])
                return entry
            })
            setSalesData(res)
        })
    }, [chartProductId])

    useEffect(() => {
        const w = window.innerWidth * 0.75
        const h = window.innerHeight * 0.75

        const svg = d3.select(svgRef.current)
                      .attr("width", w)
                      .attr("height", h)
                      .style('background', '#d3d3d3')
                      .style("overflow", "visible")

        if (!salesData.length) {
            svg.selectAll('path').remove()
            svg.selectAll('g').remove()
        }
        else if (salesData[0]?.orderQty) {
            
            const xScale = d3.scaleTime()
                             .domain(d3.extent(salesData, d => d.modifiedDate))
                             .range([0, w])
            
            const yScale = d3.scaleLinear()
                             .domain([0, ((d3.max(salesData, d => d.orderQty)) * 1.1)])
                             .range([h, 0])
    
            const line = d3.line()
                           .x((d, i) => xScale(d.modifiedDate))
                           .y(d => yScale(d.orderQty))
    
            let xAxis = d3.axisBottom(xScale)
                          .ticks(d3.timeMonth.every(2))
                          .tickFormat(d3.timeFormat('%b %y'))

            
            svg.selectAll('g').remove()

            svg.append("g")
               .transition()
               .duration(350)
               .attr('class', 'x-axis')
               .call(xAxis)
               .attr('transform', `translate(0, ${h})`)

            let yAxis = d3.axisLeft(yScale)
    
            svg.append('g')
               .transition()
               .duration(350)
               .attr('class', 'y-axis')
               .call(yAxis)
               .attr('transform', 'translate(0, 0')
    
            svg.selectAll('path').remove()
            svg.append('path')
               .datum(salesData)
               .join('path')
               .transition()
               .duration(350)
               .attr('fill', 'none')
               .attr('stroke', 'black')
               .attr('stroke-width', 1)
               .attr('d', line)
    
            svg.append('text')
               .attr('class', 'x-axis-label')
               .attr('text-anchor', 'middle')
               .attr('x', w / 2)
               .attr('y', h + 40)
               .text('Sale Date')
    
            svg.append('text')
               .attr('class', 'y-axis-label')
               .attr('text-anchor', 'middle')
               .attr('transform', 'rotate(-90)')
               .attr('x', -1 * (h / 2))
               .attr('y', -40)
               .text('Quantity')
        }
    }, [salesData, chartProductId])

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
        <svg className="lineChart" ref={svgRef}>
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
    </>
    
}