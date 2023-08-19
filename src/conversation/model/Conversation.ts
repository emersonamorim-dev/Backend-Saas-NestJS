export class Conversation {
    id: string;
    prompts: string[];
    responses: string[];
  
    constructor(id: string, prompts: string[], responses: string[]) {
      this.id = id;
      this.prompts = prompts;
      this.responses = responses;
    }
  }
  