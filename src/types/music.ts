export type MusicVersion = 'sonic-v3-5' | 'sonic-v4';
export type TaskType = 'create_music' | 'extend_music' | 'concat_music' | 'cover_music' | 'cover_upload_music' | 'extend_upload_music' | 'persona_music';

export interface MusicOptions {
    /** 音乐标题 */
    title?: string;
    /** 音乐标签/风格 */
    tags?: string;
    /** 是否生成纯音乐 */
    makeInstrumental?: boolean;
    /** 使用的音乐模型版本 */
    mv: MusicVersion;
    /** 是否使用自定义模式 */
    customMode?: boolean;
    /** 歌词内容（自定义模式必填） */
    prompt?: string;
    /** GPT 描述提示词（非自定义模式必填） */
    gptDescriptionPrompt?: string;
    /** 任务类型 */
    taskType?: TaskType;
    /** 角色 ID */
    personaId?: string;
}

export interface ExtendMusicOptions {
  task_type: 'extend_music';
  custom_mode: boolean;
  prompt: string;
  title?: string;
  tags?: string;
  continue_clip_id: string;
  continue_at: number;
  mv: string;
}

export type CreateMusicOptions = {
  task_type?: TaskType;
  custom_mode: boolean;
  prompt?: string;
  title?: string;
  tags?: string;
  mv: string;
  make_instrumental?: boolean;
  gpt_description_prompt?: string;
  persona_id?: string;
} & Partial<ExtendMusicOptions>;

export class Music {
    title: string;
    tags: string;
    makeInstrumental: boolean;
    mv: string;

    constructor(options: Partial<MusicOptions>) {
        this.title = options.title || '';
        this.tags = options.tags || '';
        this.makeInstrumental = options.makeInstrumental || false;
        this.mv = options.mv || 'sonic-v3-5';
    }
}

export interface MusicResponse {
  message: string;
  task_id: string;
}

export interface MusicResult {
    /** 状态码 */
    code: number;
    /** 音乐数据数组 */
    data: MusicData[];
    /** 响应消息 */
    message: string;
}

export interface MusicData {
    /** 音乐片段 ID */
    clipId: string;
    /** 生成状态 */
    state: string;
    /** 音乐标题 */
    title: string;
    /** 音乐标签 */
    tags: string;
    /** 歌词内容 */
    lyrics?: string;
    /** 封面图片 URL */
    imageUrl: string;
    /** 音频文件 URL */
    audioUrl: string;
    /** 视频文件 URL */
    videoUrl: string;
    /** 创建时间 */
    createdAt: string;
    /** 使用的模型版本 */
    mv: string;
    /** 音乐时长（秒） */
    duration: number;
}

export interface GetMusicResponse {
  code: number;
  data: Array<{
    clip_id: string;
    state: string;
    title: string;
    tags: string;
    lyrics: string;
    image_url: string;
    audio_url: string;
    video_url: string;
    created_at: string;
    mv: string;
    duration: number;
  }>;
  message: string;
}
