import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './deposit.css'
import { Button } from 'react-bootstrap';

const Onlinewithdrawal = () => {
  const [mt5Id, setMt5Id] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ mt5Id, amount });
  };

  return (
    <div className="container py-5">
      <h2 style={{ color: '#55da59', fontWeight: '600', marginBottom: '20px',fontSize:'30px' }}>
        Online Deposit
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="row align-items-end">
          <div className="col-md-6 mb-3">
            <select
              className="form-select"
              value={mt5Id}
              onChange={(e) => setMt5Id(e.target.value)}
            >
              <option value="">Enter MT5 Id</option>
              <option value="123456">123456</option>
              <option value="654321">654321</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Stickey Pay Email</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)} 
            />
          </div>
        </div>
        

        <Button
            type="submit"
            className="btn btn-success fw-bold px-5"
            style={{
              background: "linear-gradient(45deg, #32cd32, #00b300, #007f00)",
              border: "none",
            }}
          >
            Submit
          </Button>
      </form>
    </div>
  );
};

export default Onlinewithdrawal;
