// filepath: /sunoapi-js-sdk/examples/get-music.ts

import SunoAPI from '../src/client';
import { GetMusicResponse } from '../src/client/types';

const suno = new SunoAPI({
  apiKey: 'your_api_key', // Replace with your API key
  baseUrl: 'https://api.musicapi.ai', // Default base URL
});

async function getMusicExample(taskId: string) {
  try {
    const response: GetMusicResponse = await suno.getMusic(taskId);
    console.log(response);
  } catch (error) {
    console.error('Error fetching music:', error);
  }
}

// Example usage
const taskId = '468d0e42-f7a6-40ce-9a4c-37db56b13b99'; // Replace with a valid task ID
getMusicExample(taskId);