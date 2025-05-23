import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const IBwithdraw = () => {
  const [mt5Id, setMt5Id] = useState('');
  const [passwordType, setPasswordType] = useState('Both');
  const [mainPassword, setMainPassword] = useState('');
  const [investorPassword, setInvestorPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ mt5Id, passwordType, mainPassword, investorPassword });
  };

  return (
    <div className="container py-5">
      <h2 className="title" style={{fontSize:'30px',color:' #55da59'}}>IB Withdraw</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label htmlFor="withdrawType" className="form-label">Withdraw Type</label>
                <select
                  id="withdrawType"
                  value={passwordType}
                  onChange={(e) => setPasswordType(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select...</option>
                  <option value="Investor">Investor</option>
                  <option value="Both">Both</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="mt5Id" className="form-label">Select MT5 ID</label>
                <select
                  id="mt5Id"
                  value={mt5Id}
                  onChange={(e) => setMt5Id(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select MT5 ID</option>
                  <option value="123456">123456</option>
                  <option value="789012">789012</option>
                </select>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input
                  type="number"
                  id="amount"
                  value={mainPassword}
                  onChange={(e) => setMainPassword(e.target.value)}
                  className="form-control"
                  placeholder="0"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="note" className="form-label">Note</label>
                <input
                  type="text"
                  id="note"
                  value={investorPassword}
                  onChange={(e) => setInvestorPassword(e.target.value)}
                  className="form-control"
                  placeholder="Note..."
                />
              </div>
            </div>

 <button type="submit" className="submit-btn">
            Submit
          </button>             
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default IBwithdraw;
