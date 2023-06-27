import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComment, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import ItemListPost from './ItemListPost';
import ItemListPostMobile from './ItemListPostMobile';
import { PostContext } from '../contexts/PostContext'
import { CommentContext } from '../contexts/CommentContext'
import { LikeContext } from '../contexts/LikeContext'
import { useContext, useEffect } from 'react'
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import SortBy from './SortBy';

const ListPostByTopic = () => {

    const params = useParams()
    const topicId = params.topicId
    
    const {
		postState: { posts, postsLoading },
		getPostsByTopic
	} = useContext(PostContext)
    
    const {
		commentState: { comments, commentsLoading },
		getAllComments
	} = useContext(CommentContext)

    const {
		likeState: { likes, likesLoading },
		getAllLikes
	} = useContext(LikeContext)
    
    useEffect(() => {
        getPostsByTopic(topicId);
        getAllComments();
        getAllLikes();
    }, [])

    const fnBack = () => {
        return window.history.back()
    }

    let body = null

    if (postsLoading || commentsLoading || likesLoading) {
		body = (
			<Loader></Loader>
		)
	} else if (posts.length === 0) {
		body = (
            <div className='container'>
                <div className='post'>
                    <div className='header-listPost'>
                        <div className='sort-listPost'>
                            <p>Sort by: </p>
                            <SortBy></SortBy>
                        </div>
                    </div>   

                    <div className='title-listPost'>
                        <div className='post-left'>
                            <div className='back' onClick={fnBack}>
                                <FontAwesomeIcon icon={faAngleLeft} size='xl' />
                            </div>
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
		body = (
            <div className='container'>
                <div className='post'>
                    <div className='header-listPost'>
                        <div className='sort-listPost'>
                            <p>Sort by: </p>
                            <SortBy></SortBy>
                        </div>
                    </div>   

                    <div className='title-listPost'>
                        <div className='post-left'>
                            <div className='back' onClick={fnBack}>
                                <FontAwesomeIcon icon={faAngleLeft} size='xl' />
                            </div>
                        </div>
                        <ul className='post-right'>
                            <li className='showAmount'><FontAwesomeIcon icon={faThumbsUp} size='lg' /></li>
                            <li className='showAmount'><FontAwesomeIcon icon={faComment} size='lg' /></li>
                            <li className='showAmount'>Recent Activity</li>
                        </ul>
                    </div>

                    <div className='listPost'>
                        {posts.map(post => (
                            <ItemListPost key={post._id} post={post} comments={comments} likes={likes}></ItemListPost>
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

export default ListPostByTopic;