// src/client/index.ts

import axios from 'axios';
import { CreateMusicOptions, ExtendMusicOptions, GetMusicResponse, CreateLyricsOptions, CreateLyricsResponse, ConcatMusicOptions, CoverMusicOptions } from '../types/music';
import { APIError } from '../errors';
import { API_BASE_URL } from '../constants';

export class SunoAPI {
    private apiKey: string;
    private baseUrl: string;

    constructor(config: { apiKey: string; baseUrl?: string }) {
        this.apiKey = config.apiKey;
        this.baseUrl = config.baseUrl || API_BASE_URL;
    }

    private validateExtendMusicOptions(options: ExtendMusicOptions) {
        const requiredFields = ['custom_mode', 'prompt', 'continue_clip_id', 'continue_at', 'mv'] as const;
        for (const field of requiredFields) {
            if (!options[field as keyof ExtendMusicOptions]) {
                throw new APIError(`Missing required field for extend music: ${field}`);
            }
        }
    }

    private validateCoverMusicOptions(options: CoverMusicOptions) {
        const requiredFields = ['task_type', 'custom_mode', 'continue_clip_id', 'prompt', 'mv'] as const;
        for (const field of requiredFields) {
            if (!options[field]) {
                throw new APIError(`Missing required field for cover music: ${field}`);
            }
        }
    }

    async createMusic(options: CreateMusicOptions): Promise<GetMusicResponse> {
        try {
            if (options.task_type === 'extend_music') {
                this.validateExtendMusicOptions(options as ExtendMusicOptions);
            }

            const response = await axios.post(`${this.baseUrl}/api/v1/sonic/create`, options, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                throw new APIError(error.response.data.message);
            }
            throw new APIError('Error creating music');
        }
    }

    async getMusic(taskId: string): Promise<GetMusicResponse> {
        try {
            const response = await axios.get(`${this.baseUrl}/get_music/${taskId}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                throw new APIError(error.response.data.message);
            }
            throw new APIError('Error retrieving music');
        }
    }

    async createLyrics(options: CreateLyricsOptions): Promise<CreateLyricsResponse> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/v1/sonic/lyrics`, options, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                throw new APIError(error.response.data.message);
            }
            throw new APIError('Error creating lyrics');
        }
    }

    async concatMusic(continue_clip_id: string): Promise<GetMusicResponse> {
        try {
            const options: ConcatMusicOptions = {
                task_type: 'concat_music',
                continue_clip_id
            };

            const response = await axios.post(`${this.baseUrl}/api/v1/sonic/create`, options, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                throw new APIError(error.response.data.message);
            }
            throw new APIError('Error concatenating music');
        }
    }

    async coverMusic(options: CoverMusicOptions): Promise<GetMusicResponse> {
        try {
            this.validateCoverMusicOptions(options);
            
            const response = await axios.post(`${this.baseUrl}/api/v1/sonic/create`, options, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                throw new APIError(error.response.data.message);
            }
            throw new APIError('Error creating cover music');
        }
    }
}
