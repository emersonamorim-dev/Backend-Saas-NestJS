import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Video } from '../model/video.model';

@Injectable()
export class VideoService {
  private readonly videoDirectory: string = 'videos'; // Diretório para armazenar vídeos gerados
  private videos: Video[] = [];

  constructor() {
    this.ensureVideoDirectoryExists();
  }

  createVideo(videoData: Partial<Video>): Video {
    const video: Video = {
      id: uuidv4(),
      title: '',
      description: '', 
      videoLink: '', 
      ...videoData,
      createdAt: new Date(),
    };

    this.videos.push(video);
    return video;
  }

  async generateVideo(prompt: string): Promise<string> {
    const generatedVideoBuffer = await this.simulateVideoGeneration(prompt);
    const videoFileName = `${uuidv4()}.mp4`;
    const videoFilePath = path.join(this.videoDirectory, videoFileName);
    fs.writeFileSync(videoFilePath, generatedVideoBuffer);
    return videoFilePath;
  }

  private async simulateVideoGeneration(prompt: string): Promise<Buffer> {
    const simulatedVideoContent = `Video generated from prompt: ${prompt}`;
    return Buffer.from(simulatedVideoContent);
  }

  private ensureVideoDirectoryExists() {
    const directoryPath = path.join(__dirname, '..', this.videoDirectory);
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }
  }

  async getVideoById(id: string): Promise<Video | null> {
    const video = this.videos.find((v) => v.id === id);
    if (!video) {
      return null;
    }
    return video;
  }

  async getAllVideos(): Promise<Video[]> {
    return this.videos;
  }

  // Método para atualizar um vídeo
  async updateVideo(id: string, videoData: Partial<Video>): Promise<Video | null> {
    const videoIndex = this.videos.findIndex((v) => v.id === id);
    if (videoIndex === -1) {
      return null;
    }
    this.videos[videoIndex] = { ...this.videos[videoIndex], ...videoData };
    return this.videos[videoIndex];
  }

  // Método para deletar um vídeo
  async deleteVideo(id: string): Promise<boolean> {
    const videoIndex = this.videos.findIndex((v) => v.id === id);
    if (videoIndex === -1) {
      return false;
    }
    this.videos.splice(videoIndex, 1);
    return true;
  }
}
