export class Page {
  public id: number;
  public title: string;
  public favicon: string;
  public refresh: number;
  public route: string;

  constructor(value: any) {
    if(value === null) { value = "" }

    this.id = value.id;
    if(value.id === null || value.id === undefined || value === "")
      this.id = 1;

    this.title = value.title;
    if(value.title === null || value.title === undefined || value === "")
      this.title = "default";

    this.favicon = value.favicon;
    if(value.favicon === null || value.favicon === undefined || value === "")
      this.favicon = "assets/uploads/favicon/favicon.ico";

    this.refresh = value.refresh;
    if(value.refresh === null || value.refresh === undefined || value === "")
      this.refresh = 1;

    this.route = value.route;
    if(value.route === null || value.route === undefined || value === "")
      this.route = "default";

  }
}