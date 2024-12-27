import './NavBar.css'

export const NavBar = () => {
    return (
        <ul className='navBar'>
            <h2 className='alignLeft'>Adventure Works</h2>
            <li className='navItem'><a href="/">Home</a></li>
            <li className='navItem'><a href="/line">Line Chart</a></li>
            <li className='navItem'>Bar Chart</li>
            <li className='navItem'>Scatter Plot</li>
            <li className='navItem'>Pie Chart</li>
            <li className='navItem'>Heat Map</li>
            <li className='navItem'></li>
            <li className='navItem'></li>
            <li className='navItem'></li>
        </ul>
    )
}