import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Dashboard } from './components/dashboard/Dashboard.jsx'
import { NavBar } from './components/navBar/NavBar.jsx'
import { Footer } from './components/footer/Footer.jsx'
import { LineChart } from './components/lineChart/LineChart.jsx'
import { BarChart } from './components/barChart/BarChart.jsx'

export const App = () => {

  return (
    <Routes>
      <Route 
        path='/' 
        element={
          <>
            <NavBar />
            <Outlet />
            <Footer />
          </>
        } >
          <Route index element={<Dashboard />} />
          <Route path='line' element={<LineChart />} />
          <Route path='bar' element={<BarChart />} />
        </Route>
    </Routes>
  )
}