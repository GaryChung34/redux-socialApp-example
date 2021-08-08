import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { postAdded, addNewPost } from './postsSlice.js'


export const AddPostForm = () => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [userId, setUserId] = useState('')
	const [requestStatus, setRequestStatus] = useState('idle')

	const users = useSelector(state => state.users.users)
	const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle'

	const dispatch = useDispatch()

	const onTitleChange = (e) => setTitle(e.target.value)
	const onContentChange = (e) => setContent(e.target.value)
	const onAuthorChange = (e) => setUserId(e.target.value)

	const onSavePostClick = async () => {
		if (canSave) {
			try {
				setRequestStatus('pending')
				const requestResult = await dispatch(
					addNewPost({title, content, user: userId})
				)
				unwrapResult(requestStatus) 
				setTitle('')
				setContent('')
				setUserId('')
			} 
			catch (err) {
				console.error('Fail to save the post: ', err)
			} 
			finally {
				setRequestStatus('idle')
			}
		}
	}

	const usersOptions = users.map((user) => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	))

	
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