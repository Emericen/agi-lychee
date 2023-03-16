export const getResponse = async (prompt) => {
  console.log("REQUESTED: " + prompt);

  const responses = [
    "好的，以下是一个简单的10分钟冥想练习说明，希望对您的妈妈有所帮助：\n找一个安静、舒适的地方坐下来，尽量不受干扰。\n关上眼睛，放松身体，呼吸自然。\n注意到自己的呼吸，专注于每一次呼吸的进出，不要去想其他事情。\n如果您的思绪开始漫游，不要担心，只需回到呼吸上。\n10分钟后，慢慢地睁开眼睛，留意您的呼吸和感觉。",
    "Yes, it's perfectly normal to find meditation to require effort, especially if you are new to it. Meditation is a practice that requires focus, discipline, and patience, and it's not always easy to quiet your mind and sit still for an extended period.",
    "GAN is a type of deep learning architecture that involves two neural networks working together: a generator network and a discriminator network. The generator network creates new data samples, while the discriminator network evaluates the samples and tries to distinguish them from real data. The two networks are trained together in a process known as adversarial training, with the goal of improving the generator network's ability to create realistic data samples. GANs are commonly used for tasks such as image and video generation, and have been applied to a wide range of other applications as well.",
    "RLHF, on the other hand, is a type of reinforcement learning that involves learning a hierarchy of policies to control an agent in an environment. In RLHF, the agent learns to perform tasks by breaking them down into sub-tasks or actions, with each level of the hierarchy representing a different level of abstraction. RLHF has been applied to tasks such as robotics, navigation, and game playing, and has shown promising results in these domains.",
  ];

  const delay = Math.floor(Math.random() * 10000); // Random delay between 0 and 10 seconds
  await new Promise((resolve) => setTimeout(resolve, delay)); // Wait for the delay
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};
