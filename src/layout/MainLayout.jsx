import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar.jsx'
import Footer from '../components/footer/Footer.jsx'

function MainLayout() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default MainLayout
