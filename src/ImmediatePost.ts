import { Message } from "./AutoPost";
import { generateTweet } from "./generateThreads";
import * as dotenv from 'dotenv';

dotenv.config();

const immediatePost = async (text: string, image?: string) => {
    console.log("Starting immediate post...");

    if (image) {
        console.log(`Posting message with image: ${text}`);
    } else {
        console.log(`Posting message: ${text}`);
    }

    await Message(text, image);
    console.log("Immediate post completed successfully!");
}

// Load themes from environment variable
const themes = process.env.THEMES?.split(',') || [];
const randomTheme = themes[Math.floor(Math.random() * themes.length)];
const imageUrl = ""; // Optional: provide an image URL if needed

// Generate the tweet using OpenAI
generateTweet(randomTheme).then(generatedText => {
    immediatePost(generatedText, imageUrl);
}).catch(error => {
    console.error("Error generating tweet:", error);
});