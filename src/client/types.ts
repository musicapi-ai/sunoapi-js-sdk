// src/client/types.ts

export interface CreateMusicOptions {
    custom_mode: boolean;
    prompt?: string;
    title?: string;
    tags?: string;
    make_instrumental?: boolean;
    mv: string;
    gpt_description_prompt?: string;
    task_type?: string;
    persona_id?: string;
}

export interface GetMusicResponse {
    message: string;
    task_id: string;
    code?: number;
    data?: Array<{
        clip_id: string;
        state: string;
        title: string;
        tags: string;
        lyrics: string;
        audio_url: string;
        video_url: string;
        created_at: string;
        mv: string;
        duration: number;
    }>;
}