import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './liveaccountcard.css';

const Liveaccountcard = () => {
   

    return (
        <div className="account-wrapper">
           <div className='card-container'>
            <div className='card-content'>
                <h2>Standard3</h2>
                <p>Account</p>

            </div>
            <div className='card-details'>
                <h3>Minimum First Deposit</h3>
                <p>10 Dollar</p>

            </div>
            <div className='card-details'>
                <h3>Minimum First Deposit</h3>
                <p>10 Dollar</p>

            </div>
            <div className='card-details'>
                <h3>Minimum First Deposit</h3>
                <p>10 Dollar</p>

            </div>
            <div className='card-details'>
                <h3>Minimum First Deposit</h3>
                <p>10 Dollar</p>

            </div>
            <div className='card-details'>
                <h3>Minimum First Deposit</h3>
                <p>10 Dollar</p>

            </div>
            <div className='card-btn'>
                <button>
                    Select Account
                </button>

            </div>

           </div>
        </div>
    );
};

export default Liveaccountcard;
