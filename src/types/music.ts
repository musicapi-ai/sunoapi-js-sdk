export type MusicVersion = 'sonic-v3-5' | 'sonic-v4';
export type TaskType = 'create_music' | 'extend_music' | 'concat_music' | 'cover_music' | 'cover_upload_music' | 'extend_upload_music' | 'persona_music';

export interface MusicOptions {
    /** Music title */
    title?: string;
    /** Music tags/style */
    tags?: string;
    /** Whether to generate instrumental music only */
    makeInstrumental?: boolean;
    /** Music model version to use */
    mv: MusicVersion;
    /** Whether to use custom mode */
    customMode?: boolean;
    /** Lyrics content (required for custom mode) */
    prompt?: string;
    /** GPT description prompt (required for non-custom mode) */
    gptDescriptionPrompt?: string;
    /** Task type */
    taskType?: TaskType;
    /** Persona ID */
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

export interface ConcatMusicOptions {
  task_type: 'concat_music';
  continue_clip_id: string;
}

export interface CoverMusicOptions {
  task_type: 'cover_music';
  custom_mode: boolean;
  continue_clip_id: string;
  prompt: string;
  title?: string;
  tags?: string;
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
    /** Status code */
    code: number;
    /** Music data array */
    data: MusicData[];
    /** Response message */
    message: string;
}

export interface MusicData {
    /** Music clip ID */
    clipId: string;
    /** Generation state */
    state: string;
    /** Music title */
    title: string;
    /** Music tags */
    tags: string;
    /** Lyrics content */
    lyrics?: string;
    /** Cover image URL */
    imageUrl: string;
    /** Audio file URL */
    audioUrl: string;
    /** Video file URL */
    videoUrl: string;
    /** Creation time */
    createdAt: string;
    /** Model version used */
    mv: string;
    /** Music duration (seconds) */
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

export interface CreateLyricsOptions {
  description: string;
}

export interface LyricsResult {
  title: string;
  lyrics: string;
}

export interface CreateLyricsResponse {
  code: number;
  results: LyricsResult[];
  message: string;
}
