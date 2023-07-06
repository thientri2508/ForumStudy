import React from 'react';
import '../App.css';
import Header from '../components/Header';
import Category from '../components/Category';
import BannerTop from '../components/BannerTop';
import BannerBottom from '../components/BannerBottom';
import Footer from '../components/Footer';
import { Outlet } from "react-router-dom";
import AddPostModal from '../components/AddPostModal';
import EditProfile from '../components/EditProfile';

const Layout = () => {

    // const { authState } = useContext(AuthContext)

    // var name = null
    // if(authState.isAuthenticated) {
    //     const user = authState.user
    //     name = user.username
    // }

    return (
        <body>
            {/* <Header name={name}></Header> */}
            <Header></Header>
            <EditProfile></EditProfile>
            <AddPostModal></AddPostModal>
            <Category></Category>
            <BannerTop></BannerTop>
            <Outlet />
            <BannerBottom></BannerBottom>
            <Footer></Footer>
        </body>
    );
};

export default Layout;