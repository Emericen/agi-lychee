import React, { useEffect } from "react";
import Terminal from "./components/Terminal";
import { useSelector, useDispatch } from "react-redux";
import { initiate, onUserEnter } from "./store";

const App = () => {
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initiate());
  }, [messages]);

  const onEnter = (msg) => {
    dispatch(onUserEnter(msg));
  };

  return <Terminal onEnter={onEnter} />;
};

export default App;
