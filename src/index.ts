import { SunoAPI as SunoAPIClient } from './client';
import { SunoAPIConfig } from './types/config';
import { CreateMusicOptions, GetMusicResponse, CreateLyricsOptions, CreateLyricsResponse, ConcatMusicOptions, CoverMusicOptions } from './types/music';

export class SunoAPI {
  private client: SunoAPIClient;

  constructor(config: SunoAPIConfig) {
    this.client = new SunoAPIClient(config);
  }

  /**
   * Create or extend music
   * @param options Options for creating/extending music
   */
  public async createMusic(options: CreateMusicOptions): Promise<GetMusicResponse> {
    return this.client.createMusic(options);
  }

  /**
   * Get music generation result
   * @param taskId Task ID
   */
  public async getMusic(taskId: string): Promise<GetMusicResponse> {
    return this.client.getMusic(taskId);
  }

  /**
   * Generate lyrics content
   * @param options Options for generating lyrics
   */
  public async createLyrics(options: CreateLyricsOptions): Promise<CreateLyricsResponse> {
    return this.client.createLyrics(options);
  }

  /**
   * Connect music segments
   * @param continue_clip_id ID of the music clip to connect
   */
  public async concatMusic(continue_clip_id: string): Promise<GetMusicResponse> {
    return this.client.concatMusic(continue_clip_id);
  }

  /**
   * Create song cover
   * @param options Cover options
   */
  public async coverMusic(options: CoverMusicOptions): Promise<GetMusicResponse> {
    // Ensure the correct task_type is set
    options.task_type = 'cover_music';
    return this.client.coverMusic(options);
  }
}

// 导出类型定义
export * from './types/music';
export * from './types/config';
