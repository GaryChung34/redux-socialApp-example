import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

import { postAdded } from './postsSlice.js'



export const AddPostForm = () => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')

	const dispatch = useDispatch()

	const onTitleChange = (e) => setTitle(e.target.value)
	const onContentChange = (e) => setContent(e.target.value)
	const onSavePostClick = () => {
		if (title && content) {
			dispatch(
				postAdded({
					id: nanoid(),
					title,
					content
				}))
		}

		setTitle('')
		setContent('')
	}


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
				<label htmlFor='postContent'>Content:</label>
				<textarea 
					id='postContent'
					name='postContent'
					value={content}
					onChange={onContentChange}
				/>
			</form>
			<button type='button' onClick={onSavePostClick}>
				Save post
			</button>
		</section>
	)
}