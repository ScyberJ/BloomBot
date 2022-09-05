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
        clearChats: (state) => {
            state.chats = []
        }
    }
})

export const { addChat, removeChat, clearChats } = chatLogSlice.actions

export default chatLogSlice.reducer