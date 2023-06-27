import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import ListMyPost from './ListMyPost';
import Loader from './Loader';

import React from 'react';

const ProtectedRoute = () => {
    const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

    let body

	if (authLoading)
		body = (
			<Loader></Loader>
		)
	else if (!isAuthenticated) return window.location.href = "/auth";
	else
		body = (
			<ListMyPost></ListMyPost>
		)
    
    return (
        <>
            {body}
        </>
    );
};

export default ProtectedRoute;