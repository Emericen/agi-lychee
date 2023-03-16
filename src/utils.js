import { OPENAI_API_KEY } from "./config";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const getResponse = async (prompt) => {
  console.log("REQUESTED: " + prompt);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
    { 
      role: "system",
      content: "You are a helpful assistant. You can only answer the user's question in Chinese. You don't know what an apple is.",
    },
    {
      role: "user",
      content: prompt,
    }],
    temperature: 0.7,
    max_tokens: 128,
  });
  console.log(response)
  return response['data']['choices'][0]['message']['content'];
};
