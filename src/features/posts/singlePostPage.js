import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './postAuthor.js'
import TimeAgo from './timeAgo.js'
import ReactionButtons from './reactionButton.js'
import { selectPostById } from './postsSlice.js'


export const SinglePostPage = ({ match }) => {
	const { postId } = match.params
	const post = useSelector(state => selectPostById(state, postId)) 

	if(!post) {
		return(
			<section>
				<h2>Post not found!</h2>
			</section>
		)
	}

	return (
		<section>
			<article className='post'>
				<h2>{post.title}</h2>
				<PostAuthor userId={post.user} />
				<TimeAgo timeStamp={post.date} />
				<p className='post-content'>{post.content}</p>
				<ReactionButtons post={post} />
				<Link to={`/editPost/${postId}`} className='button'>
					Edit post
				</Link>
			</article>
		</section>
	)
}