import { Injectable } from '@nestjs/common';
import { Music } from '../model/music.model';

@Injectable()
export class MusicService {
  private musicDatabase: Music[] = [];

  generateMusic(prompt: string): Music {
    
    const title = `Generated Music ${this.musicDatabase.length + 1}`;
    const artist = 'Generated Artist';
    const duration = Math.floor(Math.random() * 300) + 120; // Duração hipotética em segundos
    const createdAt = Date.now();
    
    const generatedMusic: Music = {
      id: this.generateUniqueId(),
      title,
      artist,
      duration,
      likes: 0, // Inicializa com zero curtidas
      dislikes: 0, // Inicializa com zero descurtidas
      createdAt,

    };

    this.musicDatabase.push(generatedMusic);
    return generatedMusic;
  }

  getMusic(id: string): Music {
    const music = this.musicDatabase.find(item => item.id === id);
    return music;
  }

  getAllMusic(): Music[] {
    return this.musicDatabase;
  }

  searchMusic(query: string): Music[] {
    const foundMusic = this.musicDatabase.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    return foundMusic;
  }

  likeMusic(id: string): Music {
    const music = this.getMusic(id);
    if (music) {
      music.likes = (music.likes || 0) + 1;
    }
    return music;
  }

  dislikeMusic(id: string): Music {
    const music = this.getMusic(id);
    if (music) {
      music.dislikes = (music.dislikes || 0) + 1;
    }
    return music;
  }
// Gera um ID único simples
  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
