import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chats: []
}

export const chatLogSlice = createSlice({
    name: 'chatLog',
    initialState,
    reducers: {
        addChat: (state, action) => {
            state.chats.push(action.payload)
        },
        removeChat: (state, action) => {
            state.chats = state.chats.slice(0, action.payload) + state.chats.slice(action.payload + 1)
        },
        updateChat: (state, action) => {
            state.chats = state.chats.map(chatlog => {
                if (chatlog.id === action.payload.id)
                    return action.payload
                else return chatlog
            })
        },
        clearChats: (state) => {
            state.chats = []
        }
    }
})

export const { addChat, removeChat, updateChat, clearChats } = chatLogSlice.actions

export default chatLogSlice.reducer