import { RightGroupPage } from './RightGroupPage';

export class Group {
  public id: number;
  public name: string;
  public rightGroupPage: RightGroupPage;

  constructor(value: any) {
    if(value === null) { value = "" }

    this.id = value.id;
    if(value.id === null || value.id === undefined || value === "")
      this.id = 1;

    this.name = value.name;
    if(value.name === null || value.name === undefined || value === "")
      this.name = "default";

    this.rightGroupPage = value.rightGroupPage;
    if(value.rightGroupPage === null || value.rightGroupPage === undefined || value === "")
      this.rightGroupPage = new RightGroupPage(null);
  }
}