# SunoAPI JS SDK

[![npm version](https://img.shields.io/npm/v/@musicapi/sunoapi.svg)](https://www.npmjs.com/package/@musicapi/sunoapi)
[![npm downloads](https://img.shields.io/npm/dm/@musicapi/sunoapi.svg)](https://www.npmjs.com/package/@musicapi/sunoapi)
[![GitHub license](https://img.shields.io/github/license/musicapi-ai/sunoapi-js-sdk)](https://github.com/musicapi-ai/sunoapi-js-sdk/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/musicapi-ai/sunoapi-js-sdk)](https://github.com/musicapi-ai/sunoapi-js-sdk/issues)
[![GitHub stars](https://img.shields.io/github/stars/musicapi-ai/sunoapi-js-sdk)](https://github.com/musicapi-ai/sunoapi-js-sdk/stargazers)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)

The `sunoapi` is a Node.js SDK for interacting with the SunoAPI to create and manage music.

## Features

- Create custom music with lyrics, titles, and styles.
- Generate instrumental-only music.
- Extend or concatenate existing music.
- Use personas to generate music with specific characteristics.

## Installation

Install the SDK using npm:

```bash
npm install @musicapi/sunoapi
```

## Usage

### Importing the SDK

```typescript
import SunoAPI from '@musicapi/sunoapi';
```

### Initializing the SDK

```typescript
const suno = new SunoAPI({
  apiKey: 'your_api_key', // Replace with your API key
  baseUrl: 'https://api.musicapi.ai', // Default base URL
});
```

### Creating Music

#### Custom Mode Example

```typescript
interface CreateMusicResponse {
  message: string;
  task_id: string;
}

const response: CreateMusicResponse = await suno.createMusic({
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
});

console.log(response);
```

#### Non-Custom Mode Example

```typescript
const response: CreateMusicResponse = await suno.createMusic({
  custom_mode: false,
  gpt_description_prompt: 'A calm and relaxing instrumental track.',
  mv: 'sonic-v4',
  make_instrumental: true,
});

console.log(response);
```

### Extending Uploaded Music

```typescript
const response: CreateMusicResponse = await suno.createMusic({
  task_type: 'extend_upload_music',
  mv: 'sonic-v4',
  custom_mode: false,
  gpt_description_prompt: 'Extend the uploaded track with a similar style.',
});

console.log(response);
```

### Using Personas

```typescript
const response: CreateMusicResponse = await suno.createMusic({
  task_type: 'persona_music',
  persona_id: 'your_persona_id',
  mv: 'sonic-v3-5',
  custom_mode: true,
  prompt: 'Lyrics for a persona-based song.',
});

console.log(response);
```

### Extending Existing Music

```typescript
const response: CreateMusicResponse = await suno.createMusic({
  task_type: 'extend_music',
  custom_mode: true,
  prompt: `[Verse]
Stars they shine above me
Moonlight softly glows`,
  title: 'Stars Extended',
  tags: 'pop',
  continue_clip_id: 'a533515b-56c9-4eb2-8cb8-7f3dfa165eb8',
  continue_at: 30,
  mv: 'sonic-v3-5'
});

console.log(response);
```

#### Parameters for Extending Music

- **`task_type`** (string): Must be set to `'extend_music'`
- **`custom_mode`** (boolean): Whether to use custom mode
- **`prompt`** (string): New lyrics content
- **`continue_clip_id`** (string): ID of the original music clip to extend
- **`continue_at`** (number): The time (in seconds) from the original music to start extension
- **`title`** (string): New song title (optional)
- **`tags`** (string): Music style tags (optional)
- **`mv`** (string): Music model version

## API Reference

### `createMusic(options)`

Creates music based on the provided options.

#### Parameters

- **`custom_mode`** (boolean): Enables custom mode for controlling song title, style, and lyrics.
- **`prompt`** (string): Song lyrics (required if `custom_mode` is true).
- **`title`** (string): Song title (optional).
- **`tags`** (string): Song style or genre (optional).
- **`make_instrumental`** (boolean): Generate instrumental-only music (optional).
- **`mv`** (string): Music model version (`sonic-v3-5` or `sonic-v4`).
- **`gpt_description_prompt`** (string): Description of the song (required if `custom_mode` is false).
- **`task_type`** (string): Task type (`create_music`, `extend_music`, `concat_music`, `cover_music`, `cover_upload_music`, `extend_upload_music`, `persona_music`).
- **`persona_id`** (string): Persona ID for persona-based music (optional).

#### Example Response

```json
{
  "message": "success",
  "task_id": "468d0e42-f7a6-40ce-9a4c-37db56b13b99"
}
```

### `getMusic(taskId)`

Retrieve music generation results for a specified task ID.

#### Parameters

- **`taskId`** (string): Task ID returned when creating music.

#### Example Response

```json
{
  "code": 200,
  "data": [{
    "clip_id": "26c9c592-0566-46cf-bb71-91ac1deaa7b5",
    "state": "succeeded",
    "title": "Stars",
    "tags": "pop",
    "lyrics": "...",
    "image_url": "https://cdn2.sonic.ai/image_26c9c592-0566-46cf-bb71-91ac1deaa7b5.jpeg",
    "audio_url": "https://cdn1.sonic.ai/26c9c592-0566-46cf-bb71-91ac1deaa7b5.mp3",
    "video_url": "https://cdn1.sonic.ai/26c9c592-0566-46cf-bb71-91ac1deaa7b5.mp4",
    "created_at": "2024-11-27T10:26:46.552Z",
    "mv": "sonic-v3-5",
    "duration": 179
  }],
  "message": "success"
}
```

#### Usage Example

```typescript
const taskId: string = "468d0e42-f7a6-40ce-9a4c-37db56b13b99";
const result = await suno.getMusic(taskId);
console.log(result);
```

### `createLyrics(options)`

Generate song lyrics content.

#### Parameters

- **`description`** (string): Lyrics description, used to guide the theme and style of the generated lyrics.。

#### Example Response

```json
{
  "code": 200,
  "results": [
    {
      "title": "Whisper of Shadows",
      "lyrics": "[Verse]\nIn the alley dark as night\nLonely whispers out of sight\n..."
    }
  ],
  "message": "success"
}
```

#### Usage Example

```typescript
interface CreateLyricsOptions {
  description: string;
}

const response = await suno.createLyrics({
  description: "a song about sky"
} as CreateLyricsOptions);
console.log(response);
```

## Notes

- When extending uploaded music, use the `extend_upload_music` task type.
- Ensure that the `mv` field is set to a valid model version (`sonic-v3-5` or `sonic-v4`).
- For more details, please refer to [API Documentation](https://docs.musicapi.ai/)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
