import { Message } from "./AutoPost";

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

// Example usage
const messageText = "This is an immediate post!";
const imageUrl = ""; // Optional: provide an image URL if needed

immediatePost(messageText, imageUrl);