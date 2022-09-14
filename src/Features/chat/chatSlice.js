import { createSlice } from "@reduxjs/toolkit";

const { chat, ...rest } = JSON.parse(localStorage.getItem('state'))

const initialState = {
    id: chat.id || null,
    username: chat.username || '',
    botname: chat.botname || '',
    messages: chat.messages || [],
}



export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChat: (state, action) => {
            for (let prop in state) {
                state[prop] = action.payload[prop]
            }
        },
        setId: (state, action) => {
            state.id = action.payload
        },
        useFuncOnCurrentId: (state, action) => {
            action.payload(state.id)
        },
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
            state.userMessages = []
        }
    }
})

export const { setChat, setId, setUsername, setBotname, setMessages, clearMessages } = chatSlice.actions

export default chatSlice.reducer