import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './code/service/prisma.service';
import { CodeModule } from './code/code.module';
import { KafkaProducerService } from './code/service/kafka-producer.service';
import { ImageService } from './image/service/image.service';
import { ConversationController } from './conversation/controller/conversation.controller';
import { ConversationService } from './conversation/service/conversation.service';
import { CodesController } from './code/controller/code.controller';
import { CodesService } from './code/service/code.service';
import { MusicService } from './music/service/music.service';
import { PayService } from './pay/service/pay.service';
import { VideoService } from './video/service/video.service';
import { ImageController } from './image/controller/image.controller';
import { MusicController } from './music/controller/music.controller';
//import { PayController } from './pay/controller/pay.controller';
import { VideoController } from './video/controller/video.controller';
import { ConversationModule } from './conversation/conversation.module';
import { ImageModule } from './image/image.module';
import { MusicModule } from './music/music.module';
import { PayModule } from './pay/pay.module';
import { VideoModule } from './video/video.module';
import { KafkaService } from './music/service/kafka.service';

@Module({
  imports: [CodeModule, ConversationModule, ImageModule, MusicModule, PayModule, VideoModule],
  controllers: [AppController, ConversationController, CodesController, ImageController, MusicController],
  providers: [AppService, PrismaService, KafkaProducerService, KafkaService, ImageService, CodesService, ConversationService, 
    MusicService, PayService, VideoService],
})
export class AppModule {}


