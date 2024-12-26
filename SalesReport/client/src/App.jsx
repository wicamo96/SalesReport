import './App.css'
import { Routes } from 'react-router-dom'
import { Dashboard } from './components/dashboard/Dashboard.jsx'

export const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Dashboard />}/>
    </Routes>
  )
}