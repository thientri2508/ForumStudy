import React from 'react';
import '../App.css';
import ListMeeting from '../components/ListMeeting';
import Header from '../components/Header';
import BannerTop from '../components/BannerTop';
import BannerBottom from '../components/BannerBottom';
import Footer from '../components/Footer';

const Meeting = () => {
    return (
        <body>
            <Header></Header>
            <BannerTop></BannerTop>
            <ListMeeting></ListMeeting>
            <BannerBottom></BannerBottom>
            <Footer></Footer>
        </body>
    );
};

export default Meeting;