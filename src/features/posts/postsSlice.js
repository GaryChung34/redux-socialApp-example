import {createSlice} from "@reduxjs/toolkit"

const initialState = [
	{id: '1', title: 'First post!', content: 'Hello'},
	{id: '2', title: 'second post.', content: 'here we go.'}
]

const postsSlice = createSlice({
	name: 'posts', 
	initialState,
	reducers: {}
})

export default postsSlice.reducer