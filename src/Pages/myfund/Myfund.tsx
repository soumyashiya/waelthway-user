import { Outlet } from 'react-router-dom'
import './myfund.css'
const Myfund = () => {
  return (
    <div className="myfund-container">
        <Outlet/>
        
    </div>
  )
}

export default Myfund