import { Module } from '@nestjs/common';
import { MusicService } from './service/music.service';


@Module({
  providers: [MusicService],
  exports: []
})
export class MusicModule {}
