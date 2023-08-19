import { Controller, Post, Body, Get, NotFoundException, Param } from '@nestjs/common';
import { Music } from '../model/music.model';
import { MusicService } from '../service/music.service';
import { KafkaService } from '../service/kafka.service';

@Controller('music')
export class MusicController {
  constructor(
    private readonly musicService: MusicService,
    private readonly kafkaService: KafkaService, // Injete o serviço Kafka
  ) {}

  @Post('generate')
  async generateMusic(@Body() data: any): Promise<Music> {
    const { prompt } = data;
    const generatedMusic = await this.musicService.generateMusic(prompt);
    
    // Envie uma mensagem para o Kafka quando uma nova música for gerada
    await this.kafkaService.sendNewMusicMessage(generatedMusic);
    
    return generatedMusic;
  }

  @Get(':id')
  async getMusic(@Param('id') id: string): Promise<Music> {
    const music = await this.musicService.getMusic(id);
    if (!music) {
      throw new NotFoundException(`Music with ID ${id} not found`);
    }
    return music;
  }

  @Get()
  async getAllMusic(): Promise<Music[]> {
    const allMusic = await this.musicService.getAllMusic();
    return allMusic;
  }

  @Get('search/:query')
  async searchMusic(@Param('query') query: string): Promise<Music[]> {
    const foundMusic = await this.musicService.searchMusic(query);
    return foundMusic;
  }

  @Get(':id/play')
  async playMusic(@Param('id') id: string): Promise<string> {
    const music = await this.musicService.getMusic(id);
    if (!music) {
      throw new NotFoundException(`Music with ID ${id} not found`);
    }
    // Implemente a lógica para tocar a música.
    return `Now playing: ${music.title} by ${music.artist}`;
  }

  @Get(':id/like')
  async likeMusic(@Param('id') id: string): Promise<Music> {
    const likedMusic = await this.musicService.likeMusic(id);
    if (!likedMusic) {
      throw new NotFoundException(`Music with ID ${id} not found`);
    }
    return likedMusic;
  }

  @Get(':id/dislike')
  async dislikeMusic(@Param('id') id: string): Promise<Music> {
    const dislikedMusic = await this.musicService.dislikeMusic(id);
    if (!dislikedMusic) {
      throw new NotFoundException(`Music with ID ${id} not found`);
    }
    return dislikedMusic;
  }
}

