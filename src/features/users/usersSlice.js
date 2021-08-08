import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client.js'

const initialState = {
	users: [],
	status: 'idle',
	error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers',
		async () => {
			const response = await client.get('/fakeApi/users')
			return response.users
})

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},

	extraReducers: {
		[fetchUsers.pending]: (state, action) => {
			state.status = 'loading'
		},
		[fetchUsers.fulfilled]: (state, action) => {
			state.status = 'successed'
			state.users = state.users.concat(action.payload)
		},
		[fetchUsers.rejected]: (state, action) => {
			state.status = 'failed'
		}
	}
})

export default usersSlice.reducer
