# SunoAPI JS SDK

The `sunoapi` is a Node.js SDK for interacting with the SunoAPI to create and manage music using the Sonic model.

## Features

- Create custom music with lyrics, titles, and styles.
- Generate instrumental-only music.
- Extend or concatenate existing music.
- Use personas to generate music with specific characteristics.

## Installation

Install the SDK using npm:

```bash
npm install sunoapi
```

## Usage

### Importing the SDK

```javascript
const SunoAPI = require('sunoapi');
```

### Initializing the SDK

```javascript
const suno = new SunoAPI({
  apiKey: 'your_api_key', // Replace with your API key
  baseUrl: 'https://api.musicapi.ai', // Default base URL
});
```

### Creating Music

#### Custom Mode Example

```javascript
const response = await suno.createMusic({
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

```javascript
const response = await suno.createMusic({
  custom_mode: false,
  gpt_description_prompt: 'A calm and relaxing instrumental track.',
  mv: 'sonic-v4',
  make_instrumental: true,
});

console.log(response);
```

### Extending Uploaded Music

```javascript
const response = await suno.createMusic({
  task_type: 'extend_upload_music',
  mv: 'sonic-v4',
  custom_mode: false,
  gpt_description_prompt: 'Extend the uploaded track with a similar style.',
});

console.log(response);
```

### Using Personas

```javascript
const response = await suno.createMusic({
  task_type: 'persona_music',
  persona_id: 'your_persona_id',
  mv: 'sonic-v3-5',
  custom_mode: true,
  prompt: 'Lyrics for a persona-based song.',
});

console.log(response);
```

### Extending Existing Music

```javascript
const response = await suno.createMusic({
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

### 扩展现有音乐

```javascript
const response = await suno.createMusic({
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

#### 扩展音乐的参数说明

- **`task_type`** (string): 必须设置为 `'extend_music'`
- **`custom_mode`** (boolean): 是否使用自定义模式
- **`prompt`** (string): 新的歌词内容
- **`continue_clip_id`** (string): 要扩展的原始音乐片段ID
- **`continue_at`** (number): 从原始音乐的第几秒开始扩展
- **`title`** (string): 新的歌曲标题（可选）
- **`tags`** (string): 音乐风格标签（可选）
- **`mv`** (string): 音乐模型版本

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

获取指定任务 ID 的音乐生成结果。

#### 参数

- **`taskId`** (string): 创建音乐时返回的任务 ID。

#### 返回示例

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

#### 使用示例

```javascript
const taskId = "468d0e42-f7a6-40ce-9a4c-37db56b13b99";
const result = await suno.getMusic(taskId);
console.log(result);
```

## Notes

- When extending uploaded music, use the `extend_upload_music` task type.
- Ensure that the `mv` field is set to a valid model version (`sonic-v3-5` or `sonic-v4`).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.