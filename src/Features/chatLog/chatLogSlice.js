import { createSlice } from "@reduxjs/toolkit";

const { chatLog, ...rest } = JSON.parse(localStorage.getItem('state'))

const initialState = {
    chats: chatLog.chats || [],
    isChatLogsVisible: chatLog.isChatLogsVisible || false
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
        setChatLog: (state, action) => {
            state.chats = state.chats.map(chatlog => {
                if (chatlog.id === action.payload.id)
                    return action.payload
                else return chatlog
            })
        },
        clearChatLogs: (state) => {
            state.chats = []
        },
        setIsChatLogsVisible: (state, action) => {
            if (action.payload) state.isChatLogsVisible = action.payload
            else state.isChatLogsVisible = !state.isChatLogsVisible
        }
    }
})

export const { addChatLog, removeChatLog, setChatLog, clearChatLogs, setIsChatLogsVisible } = chatLogSlice.actions

export default chatLogSlice.reducer