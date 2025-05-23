import Liveaccountcard from './Liveaccountcard';
import './openliveaccount.css';

const Openliveaccount = () => {
  return (
    // <div className='live-account-container'>

    <div className="open-live-account-container">
      <div className='open-live-account-content'>

       <h1 >Create MT5 Account</h1>
      </div>
      <div className='cards'>

      {/* {[...Array(4)].map((_, index) => ( */}
        <Liveaccountcard />
        <Liveaccountcard />
        <Liveaccountcard />
        <Liveaccountcard />
      {/* ))} */}
      </div>
     
    </div>
    // </div>
  );
};

export default Openliveaccount;
