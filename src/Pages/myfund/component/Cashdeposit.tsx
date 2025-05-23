import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './deposit.css '

const Cashdeposit = () => {
  const [mt5Id, setMt5Id] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [note, setNote] = useState('');
  const [depositProof, setDepositProof] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ mt5Id, amount, transactionId, note, depositProof });
  };

  return (
    <div className="container py-4">
      <h2 style={{ color: '#55da59',fontWeight:'600',marginTop:'10px',fontSize:'30px' }}>Bank Deposit</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-sm rounded">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Select MT5 ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter MT5 Id"
              value={mt5Id}
              onChange={(e) => setMt5Id(e.target.value)}
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
          <div className="col-md-6 mb-3">
            <label className="form-label">Transaction Id.</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Transaction Id"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>
         <div className="col-md-6 mb-3">
  <label className="form-label">Deposit Proof</label>
  <input
    type="file"
    className="form-control file-input"
    onChange={(e) => setDepositProof(e.target.files?.[0] || null)}
  />
</div>


          <div className="col-12 mb-4">
            <label className="form-label">Note</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Transaction Id"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="submit-btn">
            Submit
          </button>
      </form>

     
     
    </div>
  );
};

export default Cashdeposit;
