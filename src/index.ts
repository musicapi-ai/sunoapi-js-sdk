import { SunoAPI as SunoAPIClient } from './client';
import { SunoAPIConfig } from './types/config';
import { CreateMusicOptions, MusicResponse, GetMusicResponse } from './types/music';

export class SunoAPI {
  private client: SunoAPIClient;

  constructor(config: SunoAPIConfig) {
    this.client = new SunoAPIClient(config);
  }

  /**
   * 创建音乐
   * @param options 创建音乐的选项
   */
  public async createMusic(options: CreateMusicOptions): Promise<GetMusicResponse> {
    return this.client.createMusic(options);
  }

  /**
   * 获取音乐生成结果
   * @param taskId 任务ID
   */
  public async getMusic(taskId: string): Promise<GetMusicResponse> {
    return this.client.getMusic(taskId);
  }
}

// 导出类型定义
export * from './types/music';
export * from './types/config';
