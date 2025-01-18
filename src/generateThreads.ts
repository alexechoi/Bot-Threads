import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateTweet = async (prompt: string): Promise<string> => {
  /** Generate a tweet using OpenAI's GPT model. */
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a social media expert who writes engaging tweets." },
      { role: "user", content: prompt }
    ],
    max_tokens: 280, // Limit the response to a maximum of 280 tokens
  });

  // Extract the actual tweet content
  const tweetText = response.choices[0]?.message?.content?.trim() ?? "Default tweet content";

  console.log(`Generated Tweet: ${tweetText}`);

  // Ensure the tweet is within the 280-character limit
  return tweetText.length > 280 ? tweetText.slice(0, 277) + "..." : tweetText;
};