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

	const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
	const dispatch = useDispatch()

	const renderedPosts = orderedPosts.map(post => {
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
	})

	useEffect(() => {
		if(postStatus === 'idle') {
			dispatch(fetchPosts())
		}
	}, [postStatus, dispatch])

	return (
		<section className='posts-list'>
			<h2>Posts:</h2>
			{renderedPosts}
		</section>
	)
}