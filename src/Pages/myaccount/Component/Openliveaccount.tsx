import Liveaccountcard from './Liveaccountcard';
import './openliveaccount.css';

const Openliveaccount = () => {
  return (
    <div className="open-live-account-container">
      {[...Array(4)].map((_, index) => (
        <Liveaccountcard key={index} />
      ))}
    </div>
  );
};

export default Openliveaccount;
