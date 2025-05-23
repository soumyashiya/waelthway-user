import './sidebar.css';
import logo from '../../assets/wealth-logo.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  faChartPie,
  faUsers,
  faGift,
  faMinus,
  faEnvelope,
  faNewspaper,
  faGears,
  faUserTie,
  faBars,
  faAngleLeft,
  faAngleRight,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);
  const [isMyAccountOpen, setIsMyAccountOpen] = useState(false);
  const [isMyFundOpen, setIsMyFundOpen] = useState(false);
  const [isMyReportOpen, setIsMyReportOpen] = useState(false);
  const [isPartnershipOpen, setIsPartnershipOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isHelpDeskOpen, setIsHelpDeskOpen] = useState(false);

  const navigate = useNavigate();

  const handleNavigation = (item: string, path: string) => {
    setSelectedItem(item);
    navigate(path);
  };

  return (
    <div className={`sidebar-container ${isOpen ? '' : 'collapsed'}`}>
      <div className="sidebar-logo1">
        <img className="sidebar-logo" src={logo} alt="logo" />
        <button
          style={{ border: 'none', background: 'none' }}
          onClick={toggleSidebar}
          className="collapse-icon"
        >
<FontAwesomeIcon 
  icon={isOpen ? faAngleLeft : faAngleRight} 
  style={{ fontSize: '24px' }} // Increase size here
/>
        </button>
      </div>

      <div className="sidebar-menu">
        <ul>
          {/* Dashboard */}
          <li
            className={`icons ${selectedItem === 'dashboard' ? 'selected' : ''}`}
            onClick={() => handleNavigation('dashboard', '/dashboard')}
          >
            <FontAwesomeIcon icon={faChartPie} className="navbar-icon-color" />
            <div className="menu-item"><span>Dashboard</span></div>
          </li>

          {/* Compliance */}
          <li
            className={`icons ${selectedItem === 'compliance' ? 'selected' : ''}`}
            onClick={() => setIsComplianceOpen(!isComplianceOpen)}
          >
            <FontAwesomeIcon icon={faUsers} className="navbar-icon-color" />
            <div className="menu-item">
              <span>Compliance</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </li>
          {isComplianceOpen && (
            <ul className="sub-menu">
              <li onClick={() => handleNavigation('documentlist', '/compliance/documentlist')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> Document Upload List
              </li>
              <li onClick={() => handleNavigation('bankdetails', '/compliance/bankdetails')}>
                <FontAwesomeIcon icon={faUser} className="navbar-icon-color" /> Add Bank Details
              </li>
            </ul>
          )}

          {/* My Account */}
          <li
            className={`icons ${selectedItem === 'myaccount' ? 'selected' : ''}`}
            onClick={() => setIsMyAccountOpen(!isMyAccountOpen)}
          >
            <FontAwesomeIcon icon={faUsers} className="navbar-icon-color" />
            <div className="menu-item">
              <span>My Account</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </li>
          {isMyAccountOpen && (
            <ul className="sub-menu">
              <li onClick={() => handleNavigation('myaccountlist', '/myaccount/myaccountlist')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> Account List
              </li>
              <li onClick={() => handleNavigation('openliveaccount', '/myaccount/openliveaccount')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> Open Live Account
              </li>
              <li onClick={() => handleNavigation('changemt5account', '/myaccount/changemt5account')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> Change MT5 Account
              </li>
            </ul>
          )}

          {/* My Fund */}
          <li
            className={`icons ${selectedItem === 'myfund' ? 'selected' : ''}`}
            onClick={() => setIsMyFundOpen(!isMyFundOpen)}
          >
            <FontAwesomeIcon icon={faUsers} className="navbar-icon-color" />
            <div className="menu-item">
              <span>My Fund</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </li>
          {isMyFundOpen && (
            <ul className="sub-menu">
              <li onClick={() => handleNavigation('deposit', '/myfund/deposit')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> Deposit
              </li>
              <li onClick={() => handleNavigation('withdrawal', '/myfund/withdrawal')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> Withdrawal
              </li>
              <li onClick={() => handleNavigation('internaltransfer', '/myfund/internaltransfer')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> Internal Transfer
              </li>
            </ul>
          )}
          {/* Partnership */}
          <li
            className={`icons ${selectedItem === 'partnership' ? 'selected' : ''}`}
            onClick={() => setIsPartnershipOpen(!isPartnershipOpen)}
          >
            <FontAwesomeIcon icon={faUsers} className="navbar-icon-color" />
            <div className="menu-item">
              <span>Partnership</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </li>
          {isPartnershipOpen && (
            <ul className="sub-menu">
              <li onClick={() => handleNavigation('ibdashboard', '/partnership/ibdashboard')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> IB Dashboard
              </li>
              <li onClick={() => handleNavigation('myclient', '/partnership/myclient')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> My Clients
              </li>
              <li onClick={() => handleNavigation('mycommissions', '/partnership/mycommissions')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> My Commissions
              </li>
              <li onClick={() => handleNavigation('ibwithdraw', '/partnership/ibwithdraw')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> IB Withdraw
              </li>
            </ul>
          )}

          {/* My Report */}
          <li
            className={`icons ${selectedItem === 'myreport' ? 'selected' : ''}`}
            onClick={() => setIsMyReportOpen(!isMyReportOpen)}
          >
            <FontAwesomeIcon icon={faUsers} className="navbar-icon-color" />
            <div className="menu-item">
              <span>My Report</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </li>
          {isMyReportOpen && (
            <ul className="sub-menu">
              <li onClick={() => handleNavigation('depositreport', '/myreport/depositreport')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> Deposit Report
              </li>
              <li onClick={() => handleNavigation('withdrawreport', '/myreport/withdrawreport')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> Withdraw Report
              </li>
              <li onClick={() => handleNavigation('internaltransferreport', '/myreport/internaltransferreport')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> Internal Transfer Report
              </li>
              <li onClick={() => handleNavigation('dealreports', '/myreport/dealreports')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> Deal Report
              </li>
            </ul>
          )}


          {/* My Wallet */}
          <li
            className={`icons ${selectedItem === 'wallet' ? 'selected' : ''}`}
            onClick={() => setIsWalletOpen(!isWalletOpen)}
          >
            <FontAwesomeIcon icon={faUsers} className="navbar-icon-color" />
            <div className="menu-item">
              <span>My Wallet</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </li>
          {isWalletOpen && (
            <ul className="sub-menu">
              <li onClick={() => handleNavigation('wallet_history', '/mywallet/wallet_history')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> Wallet History
              </li>
              <li onClick={() => handleNavigation('mt5wallet', '/mywallet/mt5wallet')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> MT5 To Wallet
              </li>
              <li onClick={() => handleNavigation('walletmt5', '/mywallet/walletmt5')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> Wallet To MT5
              </li>
            </ul>
          )}

          {/* News */}
          <li
            className={`icons ${selectedItem === 'news' ? 'selected' : ''}`}
            onClick={() => handleNavigation('news', '/news')}
          >
            <FontAwesomeIcon icon={faNewspaper} className="navbar-icon-color" />
            <div className="menu-item"><span>News</span></div>
          </li>

          {/* Help Desk */}
          <li
            className={`icons ${selectedItem === 'helpdesk' ? 'selected' : ''}`}
            onClick={() => setIsHelpDeskOpen(!isHelpDeskOpen)}
          >
            <FontAwesomeIcon icon={faEnvelope} className="navbar-icon-color" />
            <div className="menu-item">
              <span>Help Desk</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </li>
          {isHelpDeskOpen && (
            <ul className="sub-menu">
              <li onClick={() => handleNavigation('myticket', '/myticket')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> My Ticket
              </li>
              <li onClick={() => handleNavigation('newticket', '/newticket')}>
                <FontAwesomeIcon icon={faMinus} className="navbar-icon-color" /> New Ticket
              </li>
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
