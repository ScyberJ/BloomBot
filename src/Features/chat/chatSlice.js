import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 0,
    username: 'Guest',
    botname: 'BloomBot',
    messages: [],
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

export const { setChat, setId, setUsername, setBotname, setMessages, clearMessages } = chatSlice.actions

export default chatSlice.reducer