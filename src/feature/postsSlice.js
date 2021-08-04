import {createSlice} from "@reduxjs/toolkit"

const initialState = [
	{id: '1', title: 'First post!', context: 'Hello'},
	{id: '2', title: 'second post.', context: 'here we go.'}
]

const postsSlice = createSlice({
	name: "", 
	initialState,
	reducer: {}
})

export default postsSlice.reducer