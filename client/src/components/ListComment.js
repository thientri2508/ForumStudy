import React from 'react'
import ItemListComment from './ItemListComment'
import { useContext, useEffect } from 'react'
import { CommentContext } from '../contexts/CommentContext'
import DotLoading from './DotLoading';

const ListComment = ({postId, socket, replies, post}) => {

    const {
		commentState: { comments, commentsLoading },
		getComments
	} = useContext(CommentContext)

    useEffect(() => {
        getComments(postId);
        socket.on("updateComment", (comment) => {
            getComments(postId)
            console.log("newcomment")
        });
    }, [])

    

    let body = null

    if (commentsLoading) {
		body = (
			<DotLoading></DotLoading>
		)
	} else if (comments.length === 0) {
        document.getElementById("amountComment").innerHTML=`${comments.length} Comment`
        body = (
			<></>
		)
    } else{
        document.getElementById("amountComment").innerHTML=`${comments.length} Comment`

        body = (
            <>
                {comments.map(comment => (
                    <ItemListComment key={comment._id} comment={comment} socket={socket} replies={replies} post={post} ></ItemListComment>
                ))}
            </>
        )
    }

    return (
        <>
            {body}
        </>
    );
};

export default ListComment;