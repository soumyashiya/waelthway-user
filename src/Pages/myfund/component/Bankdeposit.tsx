import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
// import './deposit.css '

const Bankdeposit = () => {
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
    <div className="container py-5">
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
        <Button
                   type="submit"
                   className="btn fw-bold px-5"
                   style={{
                     background: "linear-gradient(45deg, #32cd32, #00b300, #007f00)",
                     border: "none",
                   }}
                 >
                   Submit
                 </Button>
      </form>

      {/* Deposit Details Box */}
      <div className="bg-white p-4 mt-4 shadow-sm rounded">
        <h5 className="text"style={{color:'#55da59'}}>Deposit Details</h5>
        <p className="mb-0">
          Deposit funds into the provided account and upload the deposit proof. Make sure to mention the Transaction ID.
        </p>
        <p className="mb-0 mt-2">
          In case you need support, please email: <span className="text"style={{color:'#55da59'}}><i>support@wealthway.com</i></span>
        </p>
      </div>

      {/* Bank Detail Cards */}
      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <div className="bg-white p-4 rounded shadow-sm h-100">
            <h5 className="text"style={{color:'#55da59'}}>Bank Detail</h5>
            <p className="mb-1"><strong>Account Name:</strong> Eone commercial brokers LLC</p>
            <p className="mb-1"><strong>Account No.:</strong> 0012238946001</p>
            <p className="mb-1"><strong>Bank Name:</strong> SHARJAH ISLAMIC BANK</p>
            <p className="mb-1"><strong>IFSC/Swift Code:</strong> NBSHAEASXXX</p>
            <p className="mb-0"><strong>BAN Number:</strong> AE94041000012238946001</p>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="bg-white p-4 rounded shadow-sm h-100">
            <h5 className="text" style={{color:'#55da59'}}>Deposit Detail</h5>
            <p className="mb-1"><strong>Account Name:</strong> Eone commercial brokers LLC</p>
            <p className="mb-1"><strong>Account No.:</strong> 0012238946001</p>
            <p className="mb-1"><strong>Bank Name:</strong> SHARJAH ISLAMIC BANK</p>
            <p className="mb-1"><strong>IFSC/Swift Code:</strong> NBSHAEASXXX</p>
            <p className="mb-0"><strong>BAN Number:</strong> AE94041000012238946001</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bankdeposit;
