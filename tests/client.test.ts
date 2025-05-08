import { SunoAPI } from '../src/client/index';
import { CreateMusicOptions } from '../src/types/music';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SunoAPI', () => {
    let suno: SunoAPI;

    beforeEach(() => {
        suno = new SunoAPI({
            apiKey: 'test_api_key',
            baseUrl: 'https://api.musicapi.ai',
        });
        // Reset all mocks
        jest.clearAllMocks();
    });

    describe('createMusic', () => {
        it('should create music successfully', async () => {
            // Mock successful response
            mockedAxios.post.mockResolvedValueOnce({
                data: {
                    message: 'success',
                    task_id: 'test-task-id'
                }
            });

            const options: CreateMusicOptions = {
                custom_mode: true,
                prompt: 'Test lyrics',
                title: 'Test Title',
                tags: 'test',
                mv: 'sonic-v3-5',
                make_instrumental: false,
            };

            const response = await suno.createMusic(options);
            expect(response).toHaveProperty('message', 'success');
            expect(response).toHaveProperty('task_id');
        });

        it('should throw an error for invalid options', async () => {
            // Mock failed response
            mockedAxios.post.mockRejectedValueOnce(new Error('Invalid options'));

            const options: CreateMusicOptions = {
                custom_mode: false,
                gpt_description_prompt: '',
                mv: 'sonic-v4',
                make_instrumental: true,
            };

            await expect(suno.createMusic(options)).rejects.toThrow();
        });
    });

    describe('getMusic', () => {
        it('should retrieve music by task ID', async () => {
            // Mock successful response
            mockedAxios.get.mockResolvedValueOnce({
                data: {
                    code: 200,
                    data: []
                }
            });

            const taskId = '468d0e42-f7a6-40ce-9a4c-37db56b13b99';
            const response = await suno.getMusic(taskId);
            expect(response).toHaveProperty('code', 200);
            expect(response.data).toBeInstanceOf(Array);
        });

        it('should throw an error for invalid task ID', async () => {
            // Mock failed response
            mockedAxios.get.mockRejectedValueOnce(new Error('Invalid task ID'));

            const invalidTaskId = 'invalid-task-id';
            await expect(suno.getMusic(invalidTaskId)).rejects.toThrow();
        });
    });
});