import './myclient.css';
import img from '../../../assets/investor.webp'
import img1 from '../../../assets/team-member.webp'
import img2 from '../../../assets/cashdeposit.webp'


const dummyData = [
  {
    title: 'Active Trader',
    value: 0,
    img: img,
  },
  {
    title: 'Active Sub IB',
    value: 0,
    img: img1,
  },
  {
    title: 'Referral Link',
    value: 'Copy',
    img: img2,
  },
];

const Myclient = () => {
  return (
    <div className='myclient-container'>
      <h2 className="myclient-heading">User: <span>Textdxb</span></h2>

      <div className="cards-wrapper">
        {dummyData.map((item, index) => (
          <div className='deposit-dashboard-cards-wrapper' key={index}>
            <div className='card-body'>
              <img className="user-img" src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myclient;
