import { Injectable } from '@nestjs/common';
import { Conversation } from '../model/Conversation';


@Injectable()
export class ConversationService {
  private conversations: Conversation[] = [];

  createConversation(prompts: string[]): Conversation {
    const id = this.generateUniqueId();
    const newConversation = new Conversation(id, prompts, []);
    this.conversations.push(newConversation);
    return newConversation;
  }

  addResponseToConversation(id: string, response: string): Conversation {
    const conversation = this.conversations.find((c) => c.id === id);
    if (conversation) {
      conversation.responses.push(response);
    }
    return conversation;
  }

  getConversationById(id: string): Conversation {
    return this.conversations.find((c) => c.id === id);
  }

  private generateUniqueId(): string {
    return Date.now().toString();
  }
}

