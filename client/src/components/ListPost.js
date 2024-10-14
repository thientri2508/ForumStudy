import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'
import ItemListPost from './ItemListPost';
import ItemListPostMobile from './ItemListPostMobile';
import { PostContext } from '../contexts/PostContext'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import Loader from '../components/Loader';
import DotLoading from '../components/DotLoading'
import SortBy from './SortBy';
const ListPost = () => {

    const [page, setPage] = useState(2)
    const {
		postState: { posts, btnSeeMore, postsLoading },
		getPosts,
        getPostsByPage,
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

    const NextPage = async () => {
        document.getElementById("btn-page").style.display='none'
        document.getElementById("btn-page-loading").style.display='block'
        try {
			await getPostsByPage(page) 
            var p = page + 1
            setPage(p)
		} catch (error) {
			console.log(error)
		}
        document.getElementById("btn-page-loading").style.display='none'
        document.getElementById("btn-page").style.display='block'
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
        var title = document.getElementById("AllPosts")
        if(title) {
            title.style.color="#C38077"
            title.style.fontSize="22px"
        }
        var titleMobile = document.getElementById("category-menu-mobile")
        if(titleMobile) {
            titleMobile.value = "/all-posts"
        }
        
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
        // if(!btnSeeMore) {
        //     document.getElementById("btn-page").style.display='block'
        // }
        var title = document.getElementById("AllPosts")
        if(title) {
            title.style.color="#C38077"
            title.style.fontSize="22px"
        }
        var titleMobile = document.getElementById("category-menu-mobile")
        if(titleMobile) {
            titleMobile.value = "/all-posts"
        }

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
                        
                    { btnSeeMore ? (<button id='btn-page' onClick={NextPage}>See More</button>) : (<></>) }

                    <div id='btn-page-loading'>
                        <DotLoading></DotLoading>
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