import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
    return (
        <div className='container'>
            <div className='footer'>
                <div className='footer-title'><b>Parents</b> Talk <b>.</b></div>
                <div className='footer-inp'>Subscribe for ParentsTalk Updates!</div>
                <div className='email'>
                    <input
                            type='email'
                            name='email'
                            placeholder='Enter your email here*'
                            className='inp-email'
                    />
                    <button className='btn-join'>Join</button>
                </div>
                <div className='line'></div>
                <div className='footer-end'>© 2023 by Parents Talk&nbsp;&nbsp;<FontAwesomeIcon icon={faCircleDot} size="2xs" />&nbsp;&nbsp;Powered and secured by Tri</div>
            </div>
        </div>
    );
};

export default Footer;