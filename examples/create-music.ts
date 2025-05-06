import SunoAPI from '../src/client';
import { CreateMusicOptions } from '../src/client/types';

const suno = new SunoAPI({
  apiKey: 'your_api_key', // Replace with your API key
  baseUrl: 'https://api.musicapi.ai', // Default base URL
});

const createMusicExample = async () => {
  const options: CreateMusicOptions = {
    custom_mode: true,
    prompt: `[Verse]
Stars they shine above me
Moonlight softly glows
Whispers in the night sky
Dreams that only grow`,
    title: 'Stars',
    tags: 'pop',
    mv: 'sonic-v3-5',
    make_instrumental: false,
  };

  try {
    const response = await suno.createMusic(options);
    console.log(response);
  } catch (error) {
    console.error('Error creating music:', error);
  }
};

createMusicExample();