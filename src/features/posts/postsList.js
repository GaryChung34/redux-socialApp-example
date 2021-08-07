import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './postAuthor.js'
import TimeAgo from './timeAgo.js'
import ReactionButtons from './reactionButton.js'
import { selectAllPosts, fetchPosts } from './postsSlice.js'


export const PostsList = () => {
	const posts = useSelector(selectAllPosts)
	const postStatus = useSelector(state => state.posts.status)
	const error = useSelector(state => state.posts.error)

	const dispatch = useDispatch()

	const PostExcerpt = ({ post }) => {
		return (
			<article className='post-excerpt' key={post.id}>
				<h3>{post.title}</h3>

				<PostAuthor userId={post.user} />
				<TimeAgo timeStamp={post.date} />

				<p className='post-content'>{post.content.substring(0,100)}</p>

				<ReactionButtons post={post} />
				<Link to={`/posts/${post.id}`} className="button muted-button">
					View Post
				</Link>
			</article> 
		)
	}
	

	useEffect(() => {
		if(postStatus === 'idle') {
			dispatch(fetchPosts())
		}
	}, [postStatus, dispatch])


	let content

	if (postStatus === 'loading') {
		content = <div className='loader'>loading...</div>
	} 
	else if (postStatus === 'successed') {
		const orderedPosts = posts.slice().sort((a, b) => (
			b.date.localeCompare(a.date)
		))
		content = orderedPosts.map(post => {
			return <PostExcerpt key={post.id} post={post} />
		})
	} 
	else if (postStatus === 'failed') {
		content = <div>Error: {error}</div>
	}


	return (
		<section className='posts-list'>
			<h2>Posts:</h2>
			{content}
		</section>
	)
}