import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = [
	{id: '1', title: 'First post!', content: 'Hello'},
	{id: '2', title: 'second post.', content: 'here we go.'}
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