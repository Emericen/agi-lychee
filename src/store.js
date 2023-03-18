import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeMessage: (state, action) => {
      state.messages = state.messages.filter(
        (msg) => msg.id !== action.payload
      );
    },
  },
});

export const { addMessage, removeMessage } = messagesSlice.actions;

const store = configureStore({
  reducer: messagesSlice.reducer,
});

export default store;
