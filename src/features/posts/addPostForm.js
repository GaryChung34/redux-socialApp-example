import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { postAdded } from './postsSlice.js'



export const AddPostForm = () => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [userId, setUserId] = useState('')

	const users = useSelector(state => state.users.users)

	const dispatch = useDispatch()

	const onTitleChange = (e) => setTitle(e.target.value)
	const onContentChange = (e) => setContent(e.target.value)
	const onAuthorChange = (e) => setUserId(e.target.value)
	const onSavePostClick = () => {
		if (title && content && userId) {
			dispatch(postAdded(title, content, userId))
		}

		setTitle('')
		setContent('')
	}

	const usersOptions = users.map((user) => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	))

	const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

	return (
		<section>
			<h2>Add a new post</h2>
			<form>
				<label htmlFor='postTitle'>Post title:</label>
				<input type='text'
					id='postTitle'
					name='postTitle'
					value={title}
					onChange={onTitleChange}
				/>
				<label htmlFor='postAuthor'>Author:</label>
				<select id='postAuthor' value={userId} onChange={onAuthorChange}>
					<option value=''></option>
					{usersOptions}
				</select>
				<label htmlFor='postContent'>Content:</label>

				<textarea 
					id='postContent'
					name='postContent'
					value={content}
					onChange={onContentChange}
				/>
			</form>
			<button type='button' onClick={onSavePostClick} disabled={!canSave}>
				Save post
			</button>
		</section>
	)
}