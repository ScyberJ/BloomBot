import { createSlice } from "@reduxjs/toolkit";

const { chatLog, ...rest } = JSON.parse(localStorage.getItem('state'))

const initialState = {
    chats: chatLog.chats || []
}

export const chatLogSlice = createSlice({
    name: 'chatLog',
    initialState,
    reducers: {
        addChatLog: (state, action) => {
            state.chats.push(action.payload)
        },
        removeChatLog: (state, action) => {
            state.chats = state.chats.slice(0, action.payload).concat(state.chats.slice(action.payload + 1))
        },
        updateChatLog: (state, action) => {
            state.chats = state.chats.map(chatlog => {
                if (chatlog.id === action.payload.id)
                    return action.payload
                else return chatlog
            })
        },
        clearChatLogs: (state) => {
            state.chats = []
        }
    }
})

export const { addChatLog, removeChatLog, updateChatLog, clearChatLogs } = chatLogSlice.actions

export default chatLogSlice.reducer