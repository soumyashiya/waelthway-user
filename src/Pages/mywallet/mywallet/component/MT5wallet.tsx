import React, { useState } from "react";
import "./MT5wallet.css";

function MT5wallet() {
  const [mt5Account, setMt5Account] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ mt5Account, amount, note });
    // API integration would go here
  };

  return (
    <div className="mt5-to-wallet-container">
      <h1>MT5 To Wallet</h1>
      
      <div className="bank-card">
        <div className="bank-details">
          <h2>Bank</h2>
          <p>Wallet Balance: 0</p>
        </div>
      </div>

      <div className="transfer-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-fields">
            <div style={{ display: "flex", flexDirection: "row", gap: "10px"}}>
            <div className="form-group">
              <label>Select MT5 Account</label>
              <div className="select-wrapper">
                <select 
                  value={mt5Account}
                  onChange={(e) => setMt5Account(e.target.value)}
                  className="form-control"
                >
                  <option value="">Select MT5 Account</option>
                  <option value="account1">Account 1</option>
                  <option value="account2">Account 2</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label>Amount</label>
              <input
                type="text"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-control"
              />
            </div>
            </div>
            
            <div className="form-group note-group">
              <label>Note.</label>
              <input
                type="text"
                placeholder="Enter Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-action">
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MT5wallet;