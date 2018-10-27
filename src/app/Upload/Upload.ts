import { User } from '../User/User';
 
export class Upload {
  public id: number;
  public name: string;
  public path: string;
  public uploadDate: string;
  public fileOwner: User;
  public size: number;
  public extention: string;

  constructor(value: any) {
    if(value === null) { value = "" }

    this.id = value.id;
    if(value.id === null || value.id === undefined || value === "")
        this.id = 1;

    this.name = value.name;
    if(value.name === null || value.name === undefined || value === "")
        this.name = "default.default";

    this.path = value.path;
    if(value.path === null || value.path === undefined || value === "")
        this.path = "default/defaultdefault.default";

    this.uploadDate = value.uploadDate;
    if(value.uploadDate === null || value.uploadDate === undefined || value === "")
        this.uploadDate = "2000-01-01";

    this.fileOwner = value.fileOwner;
    if(value.fileOwner === null || value.fileOwner === undefined || value === "")
        this.fileOwner = new User(null);

    this.size = value.size;
    if(value.size === null || value.size === undefined || value === "")
        this.size = 0;

    this.extention = value.extention;
    if(value.extention === null || value.extention === undefined || value === "")
        this.extention = ".default";
  }
}