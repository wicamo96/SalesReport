import './Footer.css'

export const Footer = () => {
    return (
        <footer>
            <h3>Adventure Works</h3>
            <div className='linkContainer'>
                <h4 className='noPadding'>Quick Links</h4>
                <ul className='footerList noPadding'>
                    <li className='footerListItem'><a href="/">Home</a></li>
                    <li className='footerListItem'><a href='/line'>Line Chart</a></li>
                    <li className='footerListItem'>Bar Chart</li>
                    <li className='footerListItem'>Scatter Plot</li>
                    <li className='footerListItem'>Pie Chart</li>
                    <li className='footerListItem'>Heat Map</li>
                </ul>
            </div>
        </footer>
    )
}