import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = [
	{id: '1', title: 'First post!', content: 'Hello', user: '1', date: new Date().toISOString()},
	{id: '2', title: 'second post.', content: 'here we go.', user: '2', date: new Date().toISOString()}
]

const postsSlice = createSlice({
	name: 'posts', 
	initialState,
	
	reducers: {
		postAdded: {
			reducer(state, action) {
				state.push(action.payload)
			},

			prepare(title, content, userId) {
				return {
					payload: {
						id: nanoid(),
						date: new Date().toISOString(),
						title,
						content,
						user: userId
					}
				}
			}
		},

		postUpdated(state, action) {
			const {id, title, content} = action.payload
			const existPost = state.find(post => post.id === id)
			if (existPost) {
				existPost.title = title
				existPost.content = content
			}
		}
	}
})


export default postsSlice.reducer

export const { postAdded, postUpdated } = postsSlice.actions