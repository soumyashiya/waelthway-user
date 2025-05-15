import { Outlet } from 'react-router-dom'
import './myaccount.css'
const Myaccount = () => {
  return (
    <div className='myaccount-container'>
      <Outlet />
    </div>
  )
}

export default Myaccount