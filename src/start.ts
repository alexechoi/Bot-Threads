import { ThreadsAPI } from 'threads-api';
import * as dotenv from 'dotenv';

dotenv.config();

export const threadsAPI = new ThreadsAPI({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});