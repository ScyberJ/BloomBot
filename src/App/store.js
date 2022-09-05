import { configureStore } from "@reduxjs/toolkit";
import chatReducer from '../Features/chat/chatSlice'
import chatLogReducer from '../Features/chatLog/chatLogSlice'

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        chatLog: chatLogReducer,
    },
})