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
import IBdashboard from './Pages/partnership/component/IBdashboard';
import Partnership from './Pages/partnership/Partnership';
import Myclient from './Pages/partnership/component/Myclient';
import Mycommissions from './Pages/partnership/component/Mycommisions';
import IBwithdraw from './Pages/partnership/component/IBwithdraw';
import Cashdeposit from './Pages/myfund/component/Cashdeposit';
import Onlinedeposit from './Pages/myfund/component/Onlinedeposit';
import Bankwithdrawal from './Pages/myfund/component/Bankwithdrawal';
import Cashwithdrawal from './Pages/myfund/component/Cashwithdrawal';
import Onlinewithdrawal from './Pages/myfund/component/Onlinewithdrawal';
import Mywallet from './Pages/mywallet/mywallet/Mywallet';
import Wallet_history from './Pages/mywallet/mywallet/component/Wallet_history';
import WalletMt5 from './Pages/mywallet/mywallet/component/WalletMt5';
import MT5wallet from './Pages/mywallet/mywallet/component/MT5wallet';
import News from './Pages/news/news/News';
import Readmore from './Pages/news/news/Readmore';
import Myticket from './Pages/helpdesk/helpdesk/Myticket';
import Viewticket from './Pages/helpdesk/helpdesk/Viewticket';
import Newticket from './Pages/helpdesk/helpdesk/Newticket';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoutes from './routes/PublicRoutes';
import Login from './Component/Login';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layout/MainLayout';


function App() {

  return (
    <Router>

      <AuthProvider>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<Login />} />
            {/* <Route path="/sign-up" element={<signup />} /> */}
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />

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
              <Route path="/myfund/cashdeposit" element={<Cashdeposit />} />
              <Route path="/myfund/onlinedeposit" element={<Onlinedeposit />} />

              <Route path="/myfund/bankwithdrawal" element={<Bankwithdrawal />} />
              <Route path="/myfund/cashdrawal" element={<Cashwithdrawal />} />
              <Route path="/myfund/onlinewithdrawal" element={<Onlinewithdrawal />} />


              {/*my report */}
              <Route path="/myreport" element={<Myreport />} />
              <Route path="/myreport/depositreport" element={<Depositreport />} />
              <Route path="/myreport/withdrawreport" element={<Withdrawreport />} />
              <Route path="/myreport/ibwithdrawreport" element={<IBwithdrawreport />} />
              <Route path="/myreport/internaltransferreport" element={<Internaltransferreport />} />
              <Route path="/myreport/dealreports" element={<Dealreports />} />


              {/*my report */}
              <Route path="/partnership" element={<Partnership />} />
              <Route path="/partnership/ibdashboard" element={<IBdashboard />} />
              <Route path="/partnership/myclient" element={<Myclient />} />
              <Route path="/partnership/mycommissions" element={<Mycommissions />} />
              <Route path="/partnership/ibwithdraw" element={<IBwithdraw />} />

              <Route path="/mywallet" element={<Mywallet />} />
              <Route path="/mywallet/wallet_history" element={<Wallet_history />} />
              <Route path="/mywallet/mt5wallet" element={<MT5wallet />} />
              <Route path="/mywallet/walletmt5" element={<WalletMt5 />} />

              {/* News */}
              <Route path="/news" element={<News />} />
              <Route path="/readmore" element={<Readmore />} />

              {/* hep desk */}
              <Route path="/myticket" element={<Myticket />} />
              <Route path="/viewticket" element={<Viewticket />} />
              <Route path="/newticket" element={<Newticket />} />
            </Route>


            </Route>
              
             
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
