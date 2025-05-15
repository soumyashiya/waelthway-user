import React, { useState } from 'react';
import './changemt5password.css'; // Link to the CSS file

const Changemt5password = () => {
  const [mt5Id, setMt5Id] = useState('');
  const [passwordType, setPasswordType] = useState('Both');
  const [mainPassword, setMainPassword] = useState('');
  const [investorPassword, setInvestorPassword] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log({ mt5Id, passwordType, mainPassword, investorPassword });
    // You can integrate API submission here
  };

  return (
    <div className="container">
      <h2 className="title">Change MT5 Password</h2>
      <form className="form-box" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Select MT5 ID</label>
            <input
              type="text"
              placeholder="Enter MT5 Id"
              value={mt5Id}
              onChange={(e) => setMt5Id(e.target.value)}
              className="input input-blue"
            />
          </div>
          <div className="form-group">
            <label>Password Type</label>
            <select
              value={passwordType}
              onChange={(e) => setPasswordType(e.target.value)}
              className="input"
            >
              <option value="Main">Main</option>
              <option value="Investor">Investor</option>
              <option value="Both">Both</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Main Password</label>
            <input
              type="password"
              placeholder="Enter Main Password"
              value={mainPassword}
              onChange={(e) => setMainPassword(e.target.value)}
              className="input input-blue"
            />
          </div>
          <div className="form-group">
            <label>Investor Password</label>
            <input
              type="text"
              placeholder="Enter Investor Password"
              value={investorPassword}
              onChange={(e) => setInvestorPassword(e.target.value)}
              className="input"
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default Changemt5password;
