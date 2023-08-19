import { Module } from '@nestjs/common';
import { VideoService } from './service/video.service';



@Module({
  providers: [VideoService],
  exports: []
})
export class VideoModule {}
