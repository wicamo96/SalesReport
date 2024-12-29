import { useEffect, useRef, useState } from "react"
import { getAllProducts } from "../../services/ProductService.jsx"
import { LineChartFilteredList } from "../lineChart/LineChartFilteredList.jsx"
import { getByProductId } from "../../services/SalesOrderDetailService.jsx"
import * as d3 from 'd3'

export const BarChart = () => {
    const svgRef = useRef()
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [filterKeyWord, setFilterKeyWord] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([])
    const [chartProductId, setChartProductId] = useState(0)
    const [salesData, setSalesData] = useState([])

    useEffect(() => {
        getAllProducts().then(res => {
                                        setProducts(res)
                                        setFilteredProducts(res)
                                     }).then(setIsLoading(false))
    }, [])

    useEffect(() => {
        if (filterKeyWord === "") {
            setFilteredProducts(products)
        } else {
            let filter = products.filter(entry => entry.name.toLowerCase().includes(filterKeyWord.toLowerCase()))
            setFilteredProducts(filter)
        }
    }, [filterKeyWord])

    useEffect(() => {
        getByProductId(chartProductId).then(res => setSalesData(res))
    }, [chartProductId])

    useEffect(() => {
        let h = innerHeight * 0.75
        let w = innerWidth * 0.75

        let svg = d3.select(svgRef.current)
                    .attr('width', w)
                    .attr('height', h)
                    .style('background', '#d3d3d3')
                    .style('overflow', 'visible')

        if (!salesData.length) {
            svg.selectAll('rect').remove()
        } else if (salesData[0]?.orderQty) {
            
                    let xScale = d3.scaleTime()
                                  .domain(d3.extent(salesData, d => d.dateModified))
                                  .range([0, w])
            
                    let yScale = d3.scaleLinear()
                                  .domain([0, (d3.max(salesData, d => d.orderQty) * 1.1)])
                                  .range([h, 0])
            
                    let xAxis = d3.axisBottom(xScale)
                                  .ticks(d3.timeMonth.every(2))
                                  .tickFormat('%b %y')
                    
                    svg.selectAll('g').remove()
            
                    svg.append('g')
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
                       .attr('transform', 'translate(0, 0)')
            
                    svg.selectAll('rect').remove()
            
                    svg.selectAll('rect')
                       .data(salesData)
                       .enter()
                       .append('rect')
                       .transition()
                       .duration(350)
                       .attr('x', (d, i) => i * (w / salesData.length))
                       .attr('y', (d, i) => h - d.dateModified)
                       .attr('width', (w / salesData.length))
                       .attr('height', (d, i) => d.orderQty)
                       .attr('fill', 'gray')
        }


    }, [salesData, chartProductId])

    return isLoading ? 
        <h1>Loading...</h1>
        :
        <main>
            <section>
                <input className="margin" onChange={(e) => setFilterKeyWord(e.target.value)}></input>
                <div className="lineChartFilter">
                    {<LineChartFilteredList filteredProducts={filteredProducts} setChartProductId={setChartProductId}/>}
                </div>
            </section>
            <svg className="lineChart" ref={svgRef}></svg>
        </main>
}