import * as readline from "readline";
import { Message } from "./AutoPost";
import { PostWithData } from './PostData'
import { generateTweet } from './generateThreads'
import * as dotenv from 'dotenv';
import * as cron from 'node-cron';

dotenv.config();

let messageData = { text: '', img: '' }

const CLI = async () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('O que deseja postar? (ou pressione Enter para gerar um post)', async (text: string) => {
        if (!text) {
            // Load themes from environment variable
            const themes = process.env.THEMES?.split(',') || [];
            const randomTheme = themes[Math.floor(Math.random() * themes.length)];
            text = await generateTweet(randomTheme); // Generate tweet based on random theme
        }

        rl.question('Deseja postar junto com uma imagem? (insira o link da img)', (img: string) => {
            messageData.text = text;
            messageData.img = img;

            rl.question('Qual dia da semana você deseja postar? (domingo, segunda, etc.) ', (dayOfWeek: string) => {
                rl.question('Qual vai ser o horario da postagem? em formato de 24 horas tipo 14:00', (hour: string) => {
                    const cronTime = PostWithData(dayOfWeek, hour);
                    console.log(`Scheduling post for ${dayOfWeek} at ${hour} with cron time: ${cronTime}`);

                    // Schedule the post immediately
                    cron.schedule(cronTime, () => {
                        if (img.trim() !== '') {
                            Message(messageData.text, messageData.img);
                        } else {
                            Message(messageData.text);
                        }
                        console.log('Postado com sucesso!');
                    });

                    rl.close();
                });
            });
        });
    });
}

CLI();