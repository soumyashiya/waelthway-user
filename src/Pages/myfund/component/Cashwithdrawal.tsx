import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
// import './deposit.css '

const Cashwithdrawal = () => {
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
            <h2 style={{ color: '#55da59', fontWeight: '600', marginTop: '10px',fontSize:'30px' }}>Cash Withdrawal</h2>
            <form onSubmit={handleSubmit} className="bg-white p-4 shadow-sm rounded">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Select Bank Account No.</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter MT5 Id"
                            value={mt5Id}
                            onChange={(e) => setMt5Id(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Select Account.</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    
                    <div className="col-md-12 mb-3">
                        <label className="form-label">Note.</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Transaction Id"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
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

export default Cashwithdrawal;
