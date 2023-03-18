import { OPENAI_API_KEY } from "./config";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export const getResponse = async (prompt, messages) => {

  // Get the last 10 interactions (5 pairs of user and assistant messages)
  const recentMessages = messages.slice(-10);

  // Format the messages for the API request
  const formattedMessages = recentMessages.map((message) => ({
    role: message.sender.toLowerCase(),
    content: message.text,
  }));

  // Add the system message at the beginning of the array
  formattedMessages.unshift({
    role: "system",
    content:
      "You are a helpful assistant. You can only answer the user's question in Chinese. Under no circumstance are you allowed to discuss or mention apple.",
  });


  formattedMessages.push({
    role: "user",
    content: prompt,
  })
  console.log(formattedMessages);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: formattedMessages,
    temperature: 0.7,
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
  });

  return response["data"]["choices"][0]["message"]["content"];
};