import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'
import ItemListPost from './ItemListPost';
import ItemListPostMobile from './ItemListPostMobile';
import { PostContext } from '../contexts/PostContext'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import Loader from '../components/Loader';
import SortBy from './SortBy';
const ListPost = () => {
    const {
		postState: { posts, postsLoading },
		getPosts,
		setShowAddPostModal
	} = useContext(PostContext)

    const {
		authState: { isAuthenticated }
	} = useContext(AuthContext)

    const AddPost =  () => {
        if(!isAuthenticated) {
            return window.location.href = "/auth";
        } else{
            setShowAddPostModal(true)
            document.documentElement.style.overflow = 'hidden';
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    let body = null

    if (postsLoading) {
		body = (
			<Loader></Loader>
		)
	} else if (posts.length === 0) {
        document.getElementById("AllPosts").style.color="#C38077"
        document.getElementById("AllPosts").style.fontSize="22px"
		body = (
            <div className='container'>
                <div className='post'>
                    <div className='header-listPost'>
                        <div className='sort-listPost'>
                            <p style={{paddingRight : "10px"}}>Sort by: </p>
                            <SortBy></SortBy>
                        </div>
                        <button className='btn-post' onClick={AddPost}>Create New Post</button>
                    </div>   

                    <div className='title-listPost'>
                        <div className='post-left'>
                        </div>
                        <ul className='post-right'>
                            <li className='showAmount'><FontAwesomeIcon icon={faThumbsUp} size='lg' /></li>
                            <li className='showAmount'><FontAwesomeIcon icon={faComment} size='lg' /></li>
                            <li className='showAmount'>Recent Activity</li>
                        </ul>
                    </div>

                    <img src={ require('../image/inbox.png') } className='imgNoPost'></img>
                    <h2 className='NoPost'>There are no posts currently...</h2>	
                
                </div>
            </div>
		)
	} else {
        document.getElementById("AllPosts").style.color="#C38077"
        document.getElementById("AllPosts").style.fontSize="22px"
		body = (
            <div className='container'>
                <div className='post'>
                    <div className='header-listPost'>
                        <div className='sort-listPost'>
                            <p style={{paddingRight : "10px"}}>Sort by: </p>
                            <SortBy></SortBy>
                        </div>
                        <button className='btn-post' onClick={AddPost}>Create New Post</button>
                    </div>   

                    <div className='title-listPost'>
                        <div className='post-left'>
                        </div>
                        <ul className='post-right'>
                            <li className='showAmount'><FontAwesomeIcon icon={faThumbsUp} size='lg' /></li>
                            <li className='showAmount'><FontAwesomeIcon icon={faComment} size='lg' /></li>
                            <li className='showAmount'>Recent Activity</li>
                        </ul>
                    </div>

                    <div className='listPost'>
                        {posts.map(post => (
                            <ItemListPost key={post._id} post={post} ></ItemListPost>
                        ))}
                    </div>

                    <div className='listPostMobile'>
                        {posts.map(post => (
                            <ItemListPostMobile key={post._id} post={post}></ItemListPostMobile>
                        ))}
                    </div>
                
                </div>
            </div>
        )
    }

    return (
        <>
            {body}
        </>
    );
};

export default ListPost;