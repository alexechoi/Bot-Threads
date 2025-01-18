import { threadsAPI } from "./start"

let data = new Date();

export const Message = async (message: string, image?: string) => {
    console.log("Preparing to publish message...");

    if (image?.trim() !== '') {
        console.log(`Publishing message with image: ${message}`);
        await threadsAPI.publish({
            text: message,
            image: image,
        });
        console.log("Message with image published successfully!");
    } else {
        console.log(`Publishing message: ${message}`);
        await threadsAPI.publish({
            text: message,
        });
        console.log("Message published successfully!");
    }
}



