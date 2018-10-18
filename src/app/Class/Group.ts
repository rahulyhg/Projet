import { RightGroupPage } from './RightGroupPage';

export class Group {
  public id: number;
  public name: string;
  public rightGroupPage: RightGroupPage;

  constructor(value: any) {
    if(value === null) { value = "" }

    this.id = this.IsEmpty(value.id, 1),
    this.name = this.IsEmpty(value.name, "default"), 
    this.rightGroupPage = this.IsEmpty(value.rightGroupPage, new RightGroupPage(null))
  }

  private IsEmpty(value: any, default_value: any): any {
    if(value !== null && value !== undefined)
      return value;
    else
      return default_value;
  }
}