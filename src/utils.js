import axios from "axios";

const FLASK_BACKEND_URL = "/api/openai";

export const getResponse = async (messages) => {
  const response = await axios.post(FLASK_BACKEND_URL, {
    messages: messages,
  });

  console.log(response.data);

  return response.data["content"];
}

