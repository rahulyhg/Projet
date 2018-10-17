import { RightGroupPage } from './RightGroupPage';

export class Group {
    id: number;
    name: string;
    rightGroupPage: RightGroupPage;

    constructor() {
      this.id = 1,
      this.name = "default",
      this.rightGroupPage = new RightGroupPage();
    }
  }