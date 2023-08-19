import { Controller, Post, Body, Get, Param, NotFoundException, Put, Delete } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { VideoService } from '../service/video.service';
import { KafkaService } from '../service/kafka.service';
import { Video } from '../model/video.model';

@Controller('video')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private readonly kafkaService: KafkaService, 
  ) {}

  @Post('generate')
  async generateVideo(@Body('prompt') prompt: string): Promise<Video> {
      const generatedVideoLink = await this.videoService.generateVideo(prompt);
  
      // Envie uma mensagem Kafka com o link do vídeo gerado
      await this.kafkaService.sendKafkaMessage('video-generated', generatedVideoLink);
      
      // Criar um novo vídeo com os dados gerados
      const video: Video = {
        id: uuidv4(),
        title: 'Generated Video', 
        description: 'This is a generated video.', 
        videoLink: generatedVideoLink,
        createdAt: new Date(),
      };
  
      // Adicione o vídeo à lista de vídeos
      this.videoService.createVideo(video);
  
      return video;
  }

  @Get(':id')
  async getVideo(@Param('id') id: string): Promise<Video> {
    const video = await this.videoService.getVideoById(id);
    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
    return video;
  }

  @Get()
  async getAllVideos(): Promise<Video[]> {
    const allVideos = await this.videoService.getAllVideos();
    return allVideos;
  }

  // método para atualizar um vídeo
  @Put(':id')
  async updateVideo(@Param('id') id: string, @Body() video: Video): Promise<Video> {
    const updatedVideo = await this.videoService.updateVideo(id, video);
    if (!updatedVideo) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
    return updatedVideo;
  }

  // método para deletar um vídeo
  @Delete(':id')
  async deleteVideo(@Param('id') id: string): Promise<void> {
    const result = await this.videoService.deleteVideo(id);
    if (!result) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
  }
}

