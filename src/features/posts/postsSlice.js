import { createSlice, nanoid, creatAsyncThunk } from "@reduxjs/toolkit"
import { client } from '../../api/client.js'


const initialState = {
	posts: [],
	status: 'idle',
	error: null
}

const postsSlice = createSlice({
	name: 'posts', 
	initialState,
	
	reducers: {
		postAdded: {
			reducer(state, action) {
				state.posts.push(action.payload)
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
			const existPost = state.posts.find(post => post.id === id)
			if (existPost) {
				existPost.title = title
				existPost.content = content
			}
		}, 

		reactionAdded(state, action) {
			const {postId, name} = action.payload
			const existPost = state.posts.find(post => post.id === postId)
			if (existPost) {
				existPost.reactions[name]++
			}
		}
	}

	extraReducers: {
		[fetchPosts.pending]: (state, action) => {
			state.status = 'loading'
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts = state.posts.concat(action.payload)
			state.status = 'completed'
		},
		[fetchPosts.rejected]:  (state, action) => {
			state.status = 'error'
			state.error = action.error.message
		}
	}
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts',async () => {
		const response = await client.get('/fakeAPI/posts')
		return response
	}
)

export const selectAllPosts = state => state.posts.posts
export const selectPostById = (state, postId) => (
	state.posts.find(post => post.id === postId)
)

export default postsSlice.reducer
export const { postAdded, postUpdated , reactionAdded } = postsSlice.actions