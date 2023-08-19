import { Module } from '@nestjs/common';
import { ConversationController } from './controller/conversation.controller';
import { ConversationService } from './service/conversation.service';

@Module({
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {}
