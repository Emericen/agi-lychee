import { configureStore, createSlice } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import messageData from "./texts/messages.json";
import { getResponse } from "./utils";

const initialState = {
  initialized: false,
  messages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    initiate: (state) => {
      if (state.initialized) return;
      state.messages.push({
        role: "helper",
        content: messageData.welcome_text,
      });
      state.messages.push({ role: "input", content: messageData.input_text });
      state.initialized = true;
    },

    push: (state, action) => {
      state.messages.push(action.payload);
    },

    pop: (state) => {
      state.messages.pop();
    },
  },
});

export const { initiate } = messagesSlice.actions;

const store = configureStore({
  reducer: messagesSlice.reducer,
  middleware: [thunk],
});

export default store;

export const onUserEnter = (userText) => async (dispatch, getState) => {
  const push = (role, content) => {
    dispatch(messagesSlice.actions.push({ role: role, content: content }));
  };

  const pop = () => {
    dispatch(messagesSlice.actions.pop());
  };

  pop();
  push("user", userText);
  push("loading", "");

  let lastTen = getState().messages.slice(-10); // Get last 10 messages
  lastTen = lastTen.filter(
    (msg) =>
      msg.role === "user" || msg.role === "assistant"
  ); // Remove input text box

  console.log("lastTen:");
  console.log(lastTen);

  try {
    const response = await getResponse(lastTen);
    pop();
    push("assistant", response);
  } catch (error) {
    pop();
    push("error", error.toString());
  } finally {
    push("input", messageData.prompt_hint);
  }
};
