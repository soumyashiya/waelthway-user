import cash from '../../../assets/cash.webp';
import bank from '../../../assets/bank.webp';
import cashtransfer from '../../../assets/cashtransfer.webp';
import onlinepayment from '../../../assets/onlinepayment.webp';
import './deposit.css';
import { useNavigate } from 'react-router-dom';

const depositMethods = [
  {
    title: 'Bank',
    description: 'Deposit with bank transfer.',
    img: bank,
    route: '/myfund/bankdeposit',
  },
  {
    title: 'Cash',
    description: 'Cash deposit.',
    img: cash,
    route: '/myfund/cashdeposit',
  },
  {
    title: 'Domestic Bank Transfer',
    description: 'Deposit to domestic bank.',
    img: cashtransfer,
    route: '/myfund/bankdeposit',
  },
  {
    title: 'Online',
    description: 'Online payment via stickpay.',
    img: onlinepayment,
    route: '/myfund/onlinedeposit',
  },
];

const Deposit = () => {
  const navigate = useNavigate();

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="deposit-containerr">
      <h2 className="deposit-title" style={{color:'#55da59' }}>Deposit</h2>
      <div className="deposit-grid">
        {depositMethods.map((method, index) => (
          <div
            className="deposit-card"
            key={index}
            onClick={() => handleCardClick(method.route)}
            style={{ cursor: 'pointer' }}
          >
            <img src={method.img} alt={method.title} className="deposit-icon" />
            <h3>{method.title}</h3>
            <p>{method.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deposit;
