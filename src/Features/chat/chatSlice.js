import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    botname: '',
    messages: [],
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setBotname: (state, action) => {
            state.botname = action.payload
        },
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        clearMessages: (state) => {
            state.messages = []
        }
    }
})

export const { setUsername, setBotname, setMessages, clearMessages } = chatSlice.actions

export default chatSlice.reducer