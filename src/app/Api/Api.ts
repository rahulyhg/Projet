import { Group } from '../Class/Group'; 
import { User } from '../Class/User'; 
import { RightGroupPage } from '../Class/RightGroupPage'; 
import { Page } from '../Class/Page';
import { Upload } from '../Class/Upload';

import { USER, GROUP, RIGHTGROUPPAGE, PAGE, UPLOAD } from './Bdd';

interface Api {
  api: boolean;
  auth: boolean;
  ErrorMsg: string;
  data: Object[];
}
export class Data {
  private user: User[];
  private group: Group[];
  private rightGroupPage: RightGroupPage[];
  private page: Page[]
  private upload: Upload[];

  constructor() {
    this.rightGroupPage = RIGHTGROUPPAGE;
    this.group = GROUP;
    this.user = USER;
    this.page = PAGE;
    this.upload = UPLOAD;
  }

  // --------------------- USER ---------------------
  // ------- GET ---------

  public getUserById(id: number): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      var index: number = this.user.findIndex(d => d.id === id);
      var user_return: User = new User(null);

      if(index !== -1) {
        user_return = this.user[index];
        user_return.group = this.group[this.group.findIndex(d => d.id === user_return.group.id)];
        user_return.group.rightGroupPage = this.rightGroupPage[this.rightGroupPage.findIndex(d => d.id === user_return.group.rightGroupPage.id)];
      } else
        ErrorMsg = "Index non valide";
    } else
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: [ user_return ]
    }
    return JSON.stringify(api);
  }

  public getUser(): string {
    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: null,
      data: this.user
    }
    return JSON.stringify(api);
  }

  // ------- PUT ---------

  public putUser(id: number, user: User): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      if(user !== null && user !== undefined) {
        var index: number = this.user.findIndex(d => d.id === id);
        if(index !== -1) {
          this.user[index] = user;

          if(this.user[index] !== user)
            ErrorMsg = "Impossible de mettre à jour l'utilisateur";
        }
        else 
          ErrorMsg = "Index non valide";
      } else 
      ErrorMsg = "User non valide";
    } else 
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: [ null ]
    }
    return JSON.stringify(api);
  }

  // ------- POST ---------

  public postUser(user: User): string {
    var ErrorMsg: string = null;

    if(user !== null && user !== undefined) {
      user.id = this.user.length + 1;
      if(user.group.id === 0) {
        user.group.id = this.group.length + 1;
        user.group.name = "_user_" + user.id;
        user.group.rightGroupPage.id = this.rightGroupPage.length + 1;
        user.group.rightGroupPage.name = "_user_" + user.id;
        this.group.push(user.group);
        this.rightGroupPage.push(user.group.rightGroupPage)
      }
      console.log(user);
      this.user.push(user);
    }

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  // ------- DELETE ---------

  public deleteUser(id: number): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      var t: number = this.user.length;
      if(t !== null && t !== undefined && t !== 0) {
        var index: number = this.user.findIndex(d => d.id === id);

        if(index !== null && index !== undefined && index !== -1) {
          this.user.splice(index, 1);

          if(t === this.user.length)
            ErrorMsg = "Impossible de supprimer l'utilisateur";
        } else 
          ErrorMsg = "Index non valide";
      } else 
        ErrorMsg = "Index non valide";
    } else
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  // --------------------- GROUP ---------------------
  // ------- GET ---------

  public getGroupById(id: number): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      var index: number = this.group.findIndex(d => d.id === id);
      var group_return: Group = new Group(null);

      if(index !== -1) {
        group_return = this.group[index];
        group_return.rightGroupPage = this.rightGroupPage[this.rightGroupPage.findIndex(d => d.id === group_return.rightGroupPage.id)];
      }
        
      else
        ErrorMsg = "Index non valide";
    } else
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: [ group_return ]
    }
    return JSON.stringify(api);
  }

  public getGroup(): string {
    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: null,
      data: this.group
    }
    return JSON.stringify(api);
  }

  // ------- PUT ---------

  public putGroup(id: number, group: Group): string {
    var ErrorMsg: string = null;
    
    if(id !== null && id !== undefined && id !== 0) {
      if(group !== null && group !== undefined) {
        var index: number = this.group.findIndex(d => d.id === id);
        if(index !== -1) {
          this.group[index] = group;

          if(this.group[index] !== group)
            ErrorMsg = "Impossible de mettre à jour le groupe";
        }
        else 
          ErrorMsg = "Index non valide";
      } else 
      ErrorMsg = "Group non valide";
    } else 
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: [ null ]
    }
    return JSON.stringify(api);
  }

  // ------- POST ---------

  public postGroup(group: Group): string {
    var ErrorMsg: string = null;

    if(group !== null && group !== undefined) {
      if(group.id === 0) {
        var _rightGroupPage: RightGroupPage = new RightGroupPage(group.rightGroupPage);
        var _group: Group = new Group(group);

        _rightGroupPage.id = this.rightGroupPage.length + 1;
        _group.id = this.group.length + 1;
        _group.rightGroupPage = _rightGroupPage;

        this.group.push(_group);
        this.rightGroupPage.push(_rightGroupPage)
      }
    }

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  // ------- DELETE ---------

  public deleteGroup(id: number): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      var t: number = this.group.length;
      if(t !== null && t !== undefined && t !== 0) {
        var index: number = this.group.findIndex(d => d.id === id);
        var indexRightGroupPage: number = this.rightGroupPage.findIndex(d => d.id === this.group[index].id);
        
        for(var i: number = 0; i < this.user.length; i++) {
          if(this.user[i].group.id === id) { this.user[i].group = new Group(null) }
        }

        if(indexRightGroupPage !== null && indexRightGroupPage !== undefined && indexRightGroupPage !== -1)
          this.rightGroupPage.splice(indexRightGroupPage);

        if(index !== null && index !== undefined && index !== -1) {
          this.group.splice(index, 1);

          if(t === this.group.length)
            ErrorMsg = "Impossible de supprimer le groupe";
        } else 
          ErrorMsg = "Index non valide";
      } else 
        ErrorMsg = "Index non valide";
    } else
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  // --------------------- RIGHTGROUPPAGE ---------------------
  // ------- GET ---------

  public getRightGroupPageById(id: number): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      var index: number = this.rightGroupPage.findIndex(d => d.id === id);
      var rightGroupPage_return: RightGroupPage = new RightGroupPage(null);

      if(index !== -1)
        rightGroupPage_return = this.rightGroupPage[index];
      else
        ErrorMsg = "Index non valide";
    } else
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: [ rightGroupPage_return ]
    }
    return JSON.stringify(api);
  }

  public getRightGroupPage(): string {
    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: null,
      data: this.rightGroupPage
    }
    return JSON.stringify(api);
  }

  // ------- PUT ---------

  public putRightGroupPage(id: number, rightGroupPage: RightGroupPage): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      if(rightGroupPage !== null && rightGroupPage !== undefined) {
        var index: number = this.group.findIndex(d => d.id === id);
        if(index !== -1) {
          this.rightGroupPage[index] = rightGroupPage;

          if(this.rightGroupPage[index] !== rightGroupPage)
            ErrorMsg = "Impossible de mettre à jour le rightGroupPage";
        }
        else 
          ErrorMsg = "Index non valide";
      } else 
      ErrorMsg = "RightGroupPage non valide";
    } else 
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: [ null ]
    }
    return JSON.stringify(api);
  }

  // ------- POST ---------

  public postRightGroupPage(rightGroupPage: RightGroupPage): string {
    var ErrorMsg: string = null;

    if(rightGroupPage !== null && rightGroupPage !== undefined) {
      var l: number = this.rightGroupPage.length;
      rightGroupPage.id = l + 1;
      this.rightGroupPage.push(rightGroupPage);

    }

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  // ------- DELETE ---------

  public deleteRightGroupPage(id: number): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      var t: number = this.rightGroupPage.length;
      if(t !== null && t !== undefined && t !== 0) {
        var index: number = this.rightGroupPage.findIndex(d => d.id === id);

        if(index !== null && index !== undefined && index !== -1) {
          this.rightGroupPage.splice(index, 1);

          if(t === this.rightGroupPage.length)
            ErrorMsg = "Impossible de supprimer le rightGroupPages";
        } else 
          ErrorMsg = "Index non valide";
      } else 
        ErrorMsg = "Index non valide";
    } else
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  // --------------------- PAGE ---------------------
  // ------- GET ---------

  public getPageById(id: number): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      var index: number = this.page.findIndex(d => d.id === id);
      var page_return: Page = new Page(null);

      if(index !== -1)
        page_return = this.page[index];
      else
        ErrorMsg = "Index non valide";
    } else
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: [ page_return ]
    }
    return JSON.stringify(api);
  }

  public getPageByRoute(route: string): string {
    var ErrorMsg: string = null;

    if(route !== null && route !== undefined && route !== "") {
      var index: number = this.page.findIndex(d => d.route === route);
      var page_return: Page = new Page(null);

      if(index !== -1)
        page_return = this.page[index];
      else
        ErrorMsg = "Index non valide";
    } else
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: [ page_return ]
    }
    return JSON.stringify(api);
  }

  public getPage(): string {
    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: null,
      data: this.page
    }
    return JSON.stringify(api);
  }

  // ------- PUT ---------

  public putPage(id: number, page: Page): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      if(page !== null && page !== undefined) {
        var index: number = this.group.findIndex(d => d.id === id);
        if(index !== -1) {
          this.page[index] = page;

          if(this.page[index] !== page)
            ErrorMsg = "Impossible de mettre à jour le page";
        }
        else 
          ErrorMsg = "Index non valide";
      } else 
      ErrorMsg = "Page non valide";
    } else 
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: [ null ]
    }
    return JSON.stringify(api);
  }

  // ------- POST ---------

  public postPage(page: Page): string {
    var ErrorMsg: string = null;

    if(page !== null && page !== undefined) {
      var l: number = this.page.length;
      page.id = l + 1;
      this.page.push(page);

    }

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  // ------- DELETE ---------

  public deletePage(id: number): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      var t: number = this.page.length;
      if(t !== null && t !== undefined && t !== 0) {
        var index: number = this.page.findIndex(d => d.id === id);

        if(index !== null && index !== undefined && index !== -1) {
          this.page.splice(index, 1);

          if(t === this.page.length)
            ErrorMsg = "Impossible de supprimer le pages";
        } else 
          ErrorMsg = "Index non valide";
      } else 
        ErrorMsg = "Index non valide";
    } else
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }
  // --------------------- UPLOAD ---------------------
  // ------- GET ---------

  public getUploadById(id: number): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      var index: number = this.upload.findIndex(d => d.id === id);
      var upload_return: Upload = new Upload(null);

      if(index !== -1)
        upload_return = this.upload[index];
      else
        ErrorMsg = "Index non valide";
    } else
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: [ upload_return ]
    }
    return JSON.stringify(api);
  }

  public getUpload(): string {
    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: null,
      data: this.upload
    }
    return JSON.stringify(api);
  }

  // ------- PUT ---------

  public putUpload(id: number, upload: Upload): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      if(upload !== null && upload !== undefined) {
        var index: number = this.upload.findIndex(d => d.id === id);
        if(index !== -1) {
          this.upload[index] = upload;

          if(this.upload[index] !== upload)
            ErrorMsg = "Impossible de mettre à jour l'utilisateur";
        }
        else 
          ErrorMsg = "Index non valide";
      } else 
      ErrorMsg = "Upload non valide";
    } else 
      ErrorMsg = "Id non valide";
    


    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: [ null ]
    }
    return JSON.stringify(api);
  }

  // ------- POST ---------

  public postUpload(upload: Upload): string {
    var ErrorMsg: string = null;

    if(upload !== null && upload !== undefined) {
      var l: number = this.upload.length;
      upload.id = l + 1;
      this.upload.push(upload);
    }

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  // ------- DELETE ---------

  public deleteUpload(id: number): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      var t: number = this.upload.length;
      if(t !== null && t !== undefined && t !== 0) {
        var index: number = this.upload.findIndex(d => d.id === id);

        if(index !== null && index !== undefined && index !== -1) {
          this.upload.splice(index, 1);

          if(t === this.upload.length)
            ErrorMsg = "Impossible de supprimer l'utilisateur";
        } else 
          ErrorMsg = "Index non valide";
      } else 
        ErrorMsg = "Index non valide";
    } else
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  // ------ AUTRE ---------
  // ------ AUTH ---------

  public AuthUser(login: string, password: string): string {
    var ErrorMsg: string = null;
    var user_return: any = new User(null);

    if(login !== null && login !== undefined && login !== "") {
      if(password !== null && password !== undefined && password !== "") {
        var index: number = this.user.findIndex(d => d.login === login);

        if(index !== null && index !== undefined && index !== -1) {
          if(this.user[index].password === password) {
            this.user[index].statut = true;
            user_return = this.user[index];
          } else 
            ErrorMsg = "Le password ne correspond pas au password de ce login";
        } else 
          ErrorMsg = "Aucun utilisateur associé a ce login";
      } else  
        ErrorMsg = "Password invalide";
    } else 
      ErrorMsg = "Login Invalide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: user_return
    }
    return JSON.stringify(api);
  }
}