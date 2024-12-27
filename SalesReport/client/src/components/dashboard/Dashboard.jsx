import './Dashboard.css'

export const Dashboard = () => {

    return (
        <main className="container">
            <section className="dashboardSection">
                <img className="dashImage" src="src\static\stock_photo_1.jpg" alt="stock photo"></img>
                <div className='dashText'>
                    At [Company Name], we believe in pushing the boundaries of innovation and excellence. Our mission is to provide unparalleled solutions that drive growth, enhance efficiency, and create value for our clients. With a dedicated team of professionals, we strive to foster an environment of collaboration and continuous improvement. We are committed to delivering high-quality services that meet the evolving needs of our diverse customer base. Whether you are a startup or an established enterprise, we are here to support your journey toward success.
                </div>
            </section>
            <section className="dashboardSection">
                <div className='dashText'>
                    Integrity, accountability, and customer satisfaction are at the core of everything we do. We take pride in building lasting relationships with our clients, grounded in trust and mutual respect. Our commitment to ethical practices ensures that we uphold the highest standards of professionalism in every aspect of our operations. By embracing diversity and promoting a culture of inclusion, we encourage innovative thinking and welcome new ideas that drive positive change. At [Company Name], we believe that our success is intertwined with the success of our clients and partners.
                </div>
                <img className="dashImage" src="src\static\stock_photo_2.jpg" alt="stock photo"></img>
            </section>
            <section className='dashboardSection'>
                <img className='dashImage' src='src/static/stock_photo_3.jpg' alt='stock photo'></img>
                <div className='dashText'>
                    At [Company Name], we offer a comprehensive range of services designed to meet the unique needs of our clients. From consulting and strategy development to implementation and ongoing support, we work closely with you to ensure your objectives are achieved. Our team of experts leverages cutting-edge technology and industry best practices to deliver results that exceed expectations. Whether you're looking to optimize your processes, enhance customer engagement, or streamline operations, we have the expertise to help you achieve your goals. Let us be your trusted partner in success.
                </div>
            </section>
        </main>
    )
}