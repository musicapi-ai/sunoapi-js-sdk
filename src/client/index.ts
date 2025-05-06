// src/client/index.ts

import axios from 'axios';
import { CreateMusicOptions, GetMusicResponse } from '../types/music';
import { APIError } from '../errors';
import { API_BASE_URL } from '../constants';

export class SunoAPI {
    private apiKey: string;
    private baseUrl: string;

    constructor(config: { apiKey: string; baseUrl?: string }) {
        this.apiKey = config.apiKey;
        this.baseUrl = config.baseUrl || API_BASE_URL;
    }

    async createMusic(options: CreateMusicOptions): Promise<GetMusicResponse> {
        try {
            const response = await axios.post(`${this.baseUrl}/create_music`, options, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
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
}
