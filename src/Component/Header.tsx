import React, { useState } from 'react';
import './header.css';
import logoimg from '../assets/wealth-logo.svg';
import { useTheme } from '../context/Themecontext'; // Make sure the path is correct with capital 'C'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightToBracket, faRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';

const notifications = [
  { id: '888891305', user: 'L', date: '2025-03-28' },
  { id: '888891303', user: 'J', date: '2025-03-28' },
  { id: '888891302', user: 'I', date: '2025-03-28' },
  { id: '888891301', user: 'H', date: '2025-03-28' },
];

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const [showNotification, setShowNotification] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleNotification = () => {
    setShowNotification(!showNotification);
    setShowProfileDropdown(false); // close profile if open
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowNotification(false); 
  };

  return (
    <>
      <header className={`header-container ${isSidebarOpen ? 'expanded' : ''}`}>
        {/* toggle menu button */}
        <div className='toggle-menu-btn' onClick={toggleSidebar}>
          <img className="sidebar-logo" src={logoimg} alt="logo" style={{ width: '50px', height: '50px' }} />
          <FontAwesomeIcon icon={faBars} />
        </div>

        <div className='header-logo'>
          <button
            onClick={toggleTheme}
            style={{ border: 'none', background: 'none' }}
            className="btn btn-outline-secondary me-3"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Bell Icon */}
          <div className="notification-wrapper">
            <button
              onClick={toggleNotification}
              className="notification-btn"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 6V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {showNotification && (
              <div className="notification-dropdown">
                <h4>Notifications</h4>
                <hr />
                <div className="notification-list">
                  {notifications.map((item, i) => (
                    <div key={i} className="notification-item">
                      <div className='notification-content'><strong>{item.user}</strong> has created a new MT5 account with (MT5 ID: {item.id}).</div>
                      <div className="notification-date">{item.date}</div>
                    </div>
                  ))}
                </div>
                <hr />
                <button className="read-all-btn">Read All Notifications</button>
              </div>
            )}
          </div>

          {/* Logo Icon with Profile Dropdown */}
          <div className="profile-wrapper">
            <img
              className='logo-img'
              src={logoimg}
              alt="Logo"
              onClick={toggleProfileDropdown}
              style={{ cursor: 'pointer' }}
            />

            {showProfileDropdown && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <img src={logoimg} alt="logo" className="dropdown-logo" />
                  <div className='profile-info'>
                    <strong>Wealth Way</strong>
                    <span className="admin-label">ADMIN</span>
                  </div>
                </div>
                <div className="dropdown-item">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Change Password
                </div>
                <div className="dropdown-item">
                  <FontAwesomeIcon icon={faRightToBracket} className="me-2" />
                  Manager Login
                </div>
                <div className="dropdown-item signout">
                  <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
                  Sign Out
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;