import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = [
	{id: '1', title: 'First post!', content: 'Hello', user: '1', 
		date: new Date().toISOString(),
		reactions: {
			thumbsUp: 0,
	  	hooray: 0,
	  	heart: 0,
	  	rocket: 0,
	  	eyes: 0
		}
	},
	{id: '2', title: 'second post.', content: 'here we go.', user: '2', 
		date: new Date().toISOString(),
		reactions: {
			thumbsUp: 0,
	  	hooray: 0,
	  	heart: 0,
	  	rocket: 0,
	  	eyes: 0
		}
	}
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
						user: userId,
						reactions: {
							thumbsUp: 0,
					  	hooray: 0,
					  	heart: 0,
					  	rocket: 0,
					  	eyes: 0
						}
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
		}, 

		reactionAdded(state, action) {
			const {postId, name} = action.payload
			const existPost = state.find(post => post.id === postId)
			if (existPost) {
				existPost.reactions[name]++
			}
		}
	}
})


export default postsSlice.reducer

export const { postAdded, postUpdated , reactionAdded } = postsSlice.actions