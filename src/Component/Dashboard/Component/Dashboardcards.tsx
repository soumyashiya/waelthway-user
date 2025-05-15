import React from 'react';
import cash from '../../../assets/cash.webp'
import bank from '../../../assets/bank.webp'
import cashtransfer from '../../../assets/cashtransfer.webp'
import onlinepayment from '../../../assets/onlinepayment.webp'
import './dashboardcards.css'
import { useNavigate } from 'react-router-dom';

const depositMethods = [
    {
      title: 'Bank',
      description: 'Deposit with bank transfer.',
      img: bank,
    },
    {
      title: 'Cash',
      description: 'Cash deposit.',
      img: cash,
    },
    {
      title: 'Domestic Bank Transfer',
      description: 'Deposit to domestic bank.',
      img: cashtransfer,
    },
    {
      title: 'Online',
      description: 'Online payment via stickpay.',
      img: onlinepayment,
    },
  ];

  
  const  Dashboardcards = () => {
      const navigate = useNavigate();

    const navigateToAddCommission = () => {
      navigate('/myfund/bankdeposit');
  };
    
    return (
    <div className="dashboard-deposit-container">
      <h2 className="deposit-title"></h2>
      <div className="deposit-grid">
        {depositMethods.map((method, index) => (
          <div className="deposit-card" key={index}>
            <img src={method.img} alt={method.title} className="deposit-icon" onClick={navigateToAddCommission} />
            <h3>{method.title}</h3>
            <p>{method.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboardcards;
