import React from 'react';
import './liveaccountlist.css'

interface Account {
  loginId: string;
  accountType: string;
  balance: number;
  equity: number;
}

const Liveaccountlist: React.FC<{ accounts: Account[] }> = ({ accounts = [] }) => {
  return (
    <div className="account-list-container">
      <h1>Live Account List</h1>
      <table>
        <thead>
          <tr>
            <th>LOGIN ID</th>
            <th>Account Type</th>
            <th>BALANCE</th>
            <th>EQUITY</th>
          </tr>
        </thead>
        <tbody>
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <tr key={account.loginId}>
                <td>{account.loginId}</td>
                <td>{account.accountType}</td>
                <td>{account.balance}</td>
                <td>{account.equity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="no-data">
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Liveaccountlist;