import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../src/context/Themecontext';
import Header from '../src/Component/Header';
import Sidebar from './Component/Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Component/Dashboard/Dashbord';
import './App.css';
import Compliance from './Pages/compliance/Compliance';
import Bankdetails from './Pages/component/Bankdetails';
import Myaccount from './Pages/myaccount/Myaccount';
import Createmt5account from './Pages/myaccount/Component/Createmt5account';
import Myaccountlist from './Pages/myaccount/Component/Myaccountlist';
import Openliveaccount from './Pages/myaccount/Component/Openliveaccount';
import Changemt5password from './Pages/myaccount/Component/Changemt5password';
import Myfund from './Pages/myfund/Myfund';
import Deposit from './Pages/myfund/component/Deposit';
import Internaltransfer from './Pages/myfund/component/Internaltransfer';
import Documentlist from './Pages/component/document/Documentlist';
import Withdrawal from './Pages/myfund/component/Withdrawal';
import Bankdeposit from './Pages/myfund/component/Bankdeposit';
import Myreport from './Pages/myreport/Myreport';
import Depositreport from './Pages/myreport/component/Depositreport';
import Withdrawreport from './Pages/myreport/component/Withdrawreport';
import IBwithdrawreport from './Pages/myreport/component/IBwithdrawreport';
import Internaltransferreport from './Pages/myreport/component/Internaltransferreport';
import Dealreports from './Pages/myreport/component/Dealreports';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className={`app-container ${isSidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className={`main-content ${isSidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
            <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            <div className='dashboard-container'>

              <Routes>
                {/* Main dashboard */}
                <Route path="/" element={<Dashboard />} />

                {/* Compliance section */}
                <Route path="/compliance" element={<Compliance />}>
                  {/* <Route path="documentuploadlist" element={<Documentuploadlist />} /> */}
                  <Route path="bankdetails" element={<Bankdetails />} />
                  <Route path="documentlist" element={<Documentlist />} />
                </Route>

                {/* My Account section */}
                <Route path="/myaccount" element={<Myaccount />} />
                <Route path="/myaccount/createmt5account" element={<Createmt5account />} />
                <Route path="/myaccount/openliveaccount" element={<Openliveaccount />} />
                <Route path="/myaccount/myaccountlist" element={<Myaccountlist />} />
                <Route path="/myaccount/changemt5account" element={<Changemt5password />} />
                {/* my fund */}

                <Route path="/myfund" element={<Myfund />} />
                <Route path="/myfund/deposit" element={<Deposit />} />
                <Route path="/myfund/withdrawal" element={<Withdrawal />} />
                <Route path="/myfund/internaltransfer" element={<Internaltransfer />} />
                <Route path="/myfund/bankdeposit" element={<Bankdeposit />} />

                {/*my report */}
                <Route path="/myreport" element={<Myreport />} />
                <Route path="/myreport/depositreport" element={<Depositreport />} />
                <Route path="/myreport/withdrawreport" element={<Withdrawreport />} />
                <Route path="/myreport/ibwithdrawreport" element={<IBwithdrawreport />} />
                <Route path="/myreport/internaltransferreport" element={<Internaltransferreport />} />
                <Route path="/myreport/dealreports" element={<Dealreports/>} />

              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
