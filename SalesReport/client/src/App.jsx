import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Dashboard } from './components/dashboard/Dashboard.jsx'
import { NavBar } from './components/navBar/NavBar.jsx'

export const App = () => {

  return (
    <Routes>
      <Route 
        path='/' 
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        } >
          <Route index element={<Dashboard />} />
        </Route>
    </Routes>
  )
}