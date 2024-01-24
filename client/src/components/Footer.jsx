import React from 'react';
import '../styles/footer.scss';
import { LocationOn, LocalPhone, Email } from '@mui/icons-material';

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer_left'>
            <a href='/'><img src="/assets/mansionlogo.png" alt="logo" /></a>
        </div>

        <div className='footer_center'>
            <h3>Useful Links</h3>
            <ul>
                <li>About Us</li>
                <li>Terms and Condition</li>
                <li>Return and Refund Policy</li>
            </ul>
        </div>

        <div className='footer_right'>
            <h3>Contact</h3>
            <div className='footer_right_info'>
                <LocalPhone/>
                <p>+92 3546 583 893</p>
            </div>
            <div className='footer_right_info'>
                <Email/>
                <p>RentalHomes@gmail.com</p>
            </div>
            <img src='/assets/payment.png' alt='payment'/>
        </div>
    </div>
  )
}

export default Footer
