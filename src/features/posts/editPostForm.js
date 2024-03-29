import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { postUpdated } from './postsSlice.js'
import { selectPostById } from './postsSlice.js'


export const EditPostForm = ({match}) => {
	const {postId} = match.params
  const post = useSelector(state => selectPostById(state, postId))

  const dispatch = useDispatch()
  const history = useHistory()

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)
  const onSavePostClick = () => {
  	if (title && content) {
  		dispatch(
	  		postUpdated({
	  			id: postId, title, content
	  		})
  		)
  		history.push(`/post/${postId}`)
  	}
  }

	return (
		<section>
			<h2>Edit Post</h2>
			<form>
				<label htmlFor='postTitle'>Post Title:</label>
				<input type='text'
					id='postTitle'
					name='postTitle'
					placeholder="What's on your mind."
					value={title}
					onChange={onTitleChange}
				/>
				<label htmlFor='postContent'>Post Content:</label>
				<textarea 
					id='postContent'
					name='postContent'
					value={content}
					onChange={onContentChange}
				/>
				<button type='button' onClick={onSavePostClick}>Save Post</button>
			</form>
		</section>
	)
}