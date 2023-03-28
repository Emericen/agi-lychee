import axios from "axios";
const FLASK_BACKEND_URL = "http://18.116.50.27/openai";
const BACKEND_API_KEY = process.env.REACT_APP_BACKEND_API_KEY;

export const getResponse = async (messages) => {
  console.log(BACKEND_API_KEY);
  const headers = {
    Authorization: BACKEND_API_KEY,
  };

  const response = await axios.post(
    FLASK_BACKEND_URL,
    {
      messages: messages,
    },
    { headers }
  );

  console.log(response.data);

  return response.data["content"];
};
