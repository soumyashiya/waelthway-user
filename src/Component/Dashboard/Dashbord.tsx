import Accountlistcard from './Component/Accountlistcard'
import Accountlist from './Component/Accountlistcard'
import Dashboardcards from './Component/Dashboardcards'
import Dashboardtable from './Component/Dashboardtable'
import Linechart from './Component/Linechart'
import Liveaccountlist from './Component/Liveaccountlist'
import './dashbord.css'
const Dashbord = () => {
  return (
    <div className='dashbord-container'>
      <h1 >Dashboard</h1>
      <Linechart />
      <div className="dashboard-cards-container">

        <Dashboardcards />
      </div>

      <div className="account-card">
        <Accountlistcard/>
        <Liveaccountlist accounts={[]} />
      </div>
      <div className='dashboard-table-container'>
      <Dashboardtable/>

      </div>

    </div>
  )
}

export default Dashbord;  
