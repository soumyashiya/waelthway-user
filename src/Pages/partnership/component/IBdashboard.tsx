import './ibdashboardcard.css';

import IBdashboardcards from './IBdashboardcard';
import Deposit from '../../../assets/cashdeposit.webp';
import Withdraw from '../../../assets/cashtransfer.webp';
import client from '../../../assets/total-client.webp'
import Ibdashboardchart from './Ibdashboardchart';
import Depositwithdrawcard from './Depositwithdrawcard';
import IBdashboardtable from './IBdashboardtable';
const IBdashboard = () => {
    return (
        <div className="ibuser-viewuserlist">
            <h1>User Details</h1>
            <div className="viewuserlist-cards">
                <div className="viewuser-dashboard-cards-wrapper">
                    <IBdashboardcards title="Withdraw Commission" value={120} img={Deposit} data={''} />
                </div>
                <div className="viewuser-dashboard-cards-wrapper">
                    <IBdashboardcards title="Total Deposits " value={450} img={client} data={''} />
                </div>
                <div className="viewuser-dashboard-cards-wrapper">
                    <IBdashboardcards title="IB Bonus" value={75} img={Withdraw} data={''} />
                </div>
                <div className="viewuser-dashboard-cards-wrapper">
                    <IBdashboardcards title="Earnings" value={230} img={Deposit} data={''} />
                </div>
            </div>
            <div className='ibuser-dashboard-chart'>
                <Ibdashboardchart />
            </div>

            <div className='Deposit-Withdrawals-container'>
                <div className='deposit-card-wrapperr'>

                    <Depositwithdrawcard />
                    <Depositwithdrawcard />
                    <Depositwithdrawcard />

                </div>
                <div className='deposit-right'>
                    <Ibdashboardchart/>

                </div>

            </div>
            <div className='ibdashboard-table'>
                <IBdashboardtable/>

            </div>
        </div>
    );
};

export default IBdashboard;

