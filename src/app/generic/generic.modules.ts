import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Md5 } from 'ts-md5/dist/md5';

import { RightGroupPage } from '../Class/RightGroupPage';
import { Group } from '../Class/Group';
import { User } from '../Class/User';
import { Page } from '../Class/Page';
import { Setting } from '../Class/Setting';

@NgModule({ 
  imports: [CommonModule] 
})
export class GenericModule { 

  constructor(private date: DatePipe) { }

  public setRightSelected(element: any, rightGroupPage: RightGroupPage): RightGroupPage {  
    // Accueil Page
    if(element === "Accueil_Access")
      rightGroupPage.Accueil_Access = !(rightGroupPage.Accueil_Access);

    // Login Page
    if(element === "Login_Access")
      rightGroupPage.Login_Access = !(rightGroupPage.Login_Access);

    // User Page
    if(element === "User_Access")
      rightGroupPage.User_Access = !(rightGroupPage.User_Access);

    // SelectedUserManagement Page
    if(element === "SelectedUserManagement_Access") {
      if(rightGroupPage.SelectedUserManagement_Access) {
        rightGroupPage.SelectedUserManagement_DeleteUser = false;
        rightGroupPage.SelectedUserManagement_EditRightGroupPageUser = false;
        rightGroupPage.SelectedUserManagement_EditUser = false;
        rightGroupPage.SelectedUserManagement_ShowPasswordButton = false;
        rightGroupPage.SelectedUserManagement_ViewPassword = false;
        rightGroupPage.UserManagement_AddUser = false;
        rightGroupPage.UserManagement_EditDefaultUser = false;
        rightGroupPage.GroupManagement_EditDefaultGroup = false;
      }
      rightGroupPage.SelectedUserManagement_Access = !(rightGroupPage.SelectedUserManagement_Access);
    } else if(element === "SelectedUserManagement_ViewPassword") {
      if(rightGroupPage.SelectedUserManagement_ViewPassword)
        rightGroupPage.SelectedUserManagement_ShowPasswordButton = false;
      rightGroupPage.SelectedUserManagement_ViewPassword = !(rightGroupPage.SelectedUserManagement_ViewPassword);
    } else if(element === "SelectedUserManagement_ShowPasswordButton") {
      if(!rightGroupPage.SelectedUserManagement_ShowPasswordButton)
        rightGroupPage.SelectedUserManagement_ViewPassword = true;
      rightGroupPage.SelectedUserManagement_ShowPasswordButton = !(rightGroupPage.SelectedUserManagement_ShowPasswordButton);
    } else if(element === "SelectedUserManagement_EditRightGroupPageUser") {
      if(!rightGroupPage.SelectedUserManagement_EditRightGroupPageUser)
        rightGroupPage.SelectedUserManagement_EditUser = true;
      rightGroupPage.SelectedUserManagement_EditRightGroupPageUser = !(rightGroupPage.SelectedUserManagement_EditRightGroupPageUser);
    } else if(element === "SelectedUserManagement_EditUser") {
      if(rightGroupPage.SelectedUserManagement_EditUser) {
        rightGroupPage.SelectedUserManagement_EditRightGroupPageUser = false;
        rightGroupPage.UserManagement_AddUser = false;
        rightGroupPage.UserManagement_EditDefaultUser = false;
        rightGroupPage.GroupManagement_EditDefaultGroup = false;
      }
      rightGroupPage.SelectedUserManagement_EditUser = !(rightGroupPage.SelectedUserManagement_EditUser);
    } else if(element === "SelectedUserManagement_DeleteUser")
      rightGroupPage.SelectedUserManagement_DeleteUser = !(rightGroupPage.SelectedUserManagement_DeleteUser);
    if(rightGroupPage.SelectedUserManagement_ViewPassword || rightGroupPage.SelectedUserManagement_ShowPasswordButton || 
      rightGroupPage.SelectedUserManagement_EditRightGroupPageUser || rightGroupPage.SelectedUserManagement_DeleteUser || 
      rightGroupPage.SelectedUserManagement_EditUser) {
        rightGroupPage.SelectedUserManagement_Access = true;
      }
    
    // UserManagement Page
    if(element === "UserManagement_Access") {
      if(rightGroupPage.UserManagement_Access) {
        rightGroupPage.UserManagement_AddUser = false;
        rightGroupPage.UserManagement_EditDefaultUser = false;
        rightGroupPage.GroupManagement_EditDefaultGroup = false;
      }
      rightGroupPage.UserManagement_Access = !(rightGroupPage.UserManagement_Access);
    } else if(element === "UserManagement_AddUser") {
      if(!rightGroupPage.UserManagement_AddUser) {
        rightGroupPage.SelectedUserManagement_Access = true;
        rightGroupPage.SelectedUserManagement_EditUser = true;
      }
      rightGroupPage.UserManagement_AddUser = !(rightGroupPage.UserManagement_AddUser);
    } else if(element === "UserManagement_EditDefaultUser") {
      if(!rightGroupPage.UserManagement_EditDefaultUser){
        rightGroupPage.SelectedUserManagement_Access = true;
        rightGroupPage.SelectedUserManagement_EditUser = true;
        rightGroupPage.SelectedGroupManagement_Access = true;
        rightGroupPage.GroupManagement_EditDefaultGroup = true;
        rightGroupPage.SelectedGroupManagement_EditGroup = true;
      } else
        rightGroupPage.GroupManagement_EditDefaultGroup = false;
      rightGroupPage.UserManagement_EditDefaultUser = !(rightGroupPage.UserManagement_EditDefaultUser);
    }
    if(rightGroupPage.UserManagement_AddUser || rightGroupPage.UserManagement_EditDefaultUser)
      rightGroupPage.UserManagement_Access = true;

    // SelectedGroupManagement Page
    if(element === "SelectedGroupManagement_Access"){
      if(rightGroupPage.SelectedGroupManagement_Access) {
        rightGroupPage.SelectedGroupManagement_EditGroup = false;
        rightGroupPage.SelectedGroupManagement_DeleteGroup = false;
        rightGroupPage.SelectedGroupManagement_EditRightPage = false;
        rightGroupPage.GroupManagement_AddGroup = false;
        rightGroupPage.GroupManagement_EditDefaultGroup = false;
        rightGroupPage.UserManagement_EditDefaultUser = false;
      }
      rightGroupPage.SelectedGroupManagement_Access = !(rightGroupPage.SelectedGroupManagement_Access);
    } else if(element === "SelectedGroupManagement_EditGroup") {
      if(rightGroupPage.SelectedGroupManagement_EditGroup) {
        rightGroupPage.SelectedGroupManagement_EditRightPage = false;
        rightGroupPage.GroupManagement_AddGroup = false;
        rightGroupPage.GroupManagement_EditDefaultGroup = false;
        rightGroupPage.UserManagement_EditDefaultUser = false;
      }
      rightGroupPage.SelectedGroupManagement_EditGroup = !(rightGroupPage.SelectedGroupManagement_EditGroup);
    } else if(element === "SelectedGroupManagement_DeleteGroup")
      rightGroupPage.SelectedGroupManagement_DeleteGroup = !(rightGroupPage.SelectedGroupManagement_DeleteGroup);
    else if(element === "SelectedGroupManagement_EditRightPage") {
      if(!rightGroupPage.SelectedGroupManagement_EditRightPage)
        rightGroupPage.SelectedGroupManagement_EditGroup = true;
      rightGroupPage.SelectedGroupManagement_EditRightPage = !(rightGroupPage.SelectedGroupManagement_EditRightPage);
    }
    if(rightGroupPage.SelectedGroupManagement_DeleteGroup || rightGroupPage.SelectedGroupManagement_EditGroup ||
      rightGroupPage.SelectedGroupManagement_EditRightPage)
      rightGroupPage.SelectedGroupManagement_Access = true;
    
    // GroupManagement Page
    if(element === "GroupManagement_Access") {
      if(rightGroupPage.GroupManagement_Access) {
        rightGroupPage.GroupManagement_AddGroup = false;
        rightGroupPage.GroupManagement_EditDefaultGroup = false;
        rightGroupPage.UserManagement_EditDefaultUser = false;
      }
      rightGroupPage.GroupManagement_Access = !(rightGroupPage.GroupManagement_Access);
    } else if(element === "GroupManagement_AddGroup") {
      if(!rightGroupPage.GroupManagement_AddGroup) {
        rightGroupPage.SelectedGroupManagement_Access = true;
        rightGroupPage.SelectedGroupManagement_EditGroup = true;
      }
      rightGroupPage.GroupManagement_AddGroup = !(rightGroupPage.GroupManagement_AddGroup);
    } else if(element === "GroupManagement_EditDefaultGroup") {
      if(!rightGroupPage.GroupManagement_EditDefaultGroup) {
        rightGroupPage.SelectedGroupManagement_Access = true;
        rightGroupPage.SelectedGroupManagement_EditGroup = true;
        rightGroupPage.UserManagement_Access = true;
        rightGroupPage.UserManagement_EditDefaultUser = true;
        rightGroupPage.SelectedUserManagement_Access = true;
        rightGroupPage.SelectedUserManagement_EditUser = true;
      } else
        rightGroupPage.UserManagement_EditDefaultUser = false;
      rightGroupPage.GroupManagement_EditDefaultGroup = !(rightGroupPage.GroupManagement_EditDefaultGroup);
    }
    if(rightGroupPage.GroupManagement_AddGroup || rightGroupPage.GroupManagement_EditDefaultGroup)
      rightGroupPage.GroupManagement_Access = true;

    // SelectedPageManagement Page
    if(element === "SelectedPageManagement_Access") {
      if(!rightGroupPage.SelectedPageManagement_Access) {
        rightGroupPage.SelectedPageManagement_EditPage = true;
      } else {
        rightGroupPage.SelectedPageManagement_EditPage = false;
        rightGroupPage.SelectedPageManagement_EditRefresh = false;
        rightGroupPage.SelectedPageManagement_EditRoute = false;
        rightGroupPage.SelectedPageManagement_EditNeedLogIn = false;
      }
      rightGroupPage.SelectedPageManagement_Access = !(rightGroupPage.SelectedPageManagement_Access);
    }
    else if(element === "SelectedPageManagement_EditPage") {
      if(!rightGroupPage.SelectedPageManagement_EditPage) {
        rightGroupPage.SelectedPageManagement_Access = true;
      } else {
        rightGroupPage.SelectedPageManagement_EditRefresh = false;
        rightGroupPage.SelectedPageManagement_EditRoute = false;
        rightGroupPage.SelectedPageManagement_EditNeedLogIn = false;
      }
      rightGroupPage.SelectedPageManagement_EditPage = !(rightGroupPage.SelectedPageManagement_EditPage);
    }
    else if(element === "SelectedPageManagement_EditRefresh") {
      if(!rightGroupPage.SelectedPageManagement_EditRefresh) {
        rightGroupPage.SelectedPageManagement_Access = true;
        rightGroupPage.SelectedPageManagement_EditPage = true;
      }
      rightGroupPage.SelectedPageManagement_EditRefresh = !(rightGroupPage.SelectedPageManagement_EditRefresh);
    }
    else if(element === "SelectedPageManagement_EditRoute") {
      if(!rightGroupPage.SelectedPageManagement_EditRoute) {
        rightGroupPage.SelectedPageManagement_Access = true;
        rightGroupPage.SelectedPageManagement_EditPage = true;
      }
      rightGroupPage.SelectedPageManagement_EditRoute = !(rightGroupPage.SelectedPageManagement_EditRoute);
    }
    else if(element === "SelectedPageManagement_EditNeedLogIn") {
      if(!rightGroupPage.SelectedPageManagement_EditNeedLogIn) {
        rightGroupPage.SelectedPageManagement_Access = true;
        rightGroupPage.SelectedPageManagement_EditPage = true;
      }
      rightGroupPage.SelectedPageManagement_EditNeedLogIn = !(rightGroupPage.SelectedPageManagement_EditNeedLogIn);
    }
    if(rightGroupPage.SelectedPageManagement_EditPage || rightGroupPage.SelectedPageManagement_EditRefresh ||
      rightGroupPage.SelectedPageManagement_EditRoute || rightGroupPage.SelectedPageManagement_EditNeedLogIn)
      rightGroupPage.SelectedPageManagement_Access = true;
    if(!rightGroupPage.SelectedPageManagement_EditPage && !rightGroupPage.SelectedPageManagement_EditRefresh &&
      !rightGroupPage.SelectedPageManagement_EditRoute && !rightGroupPage.SelectedPageManagement_EditNeedLogIn)
      rightGroupPage.SelectedPageManagement_Access = false;

    // EditBar
    if(element === "EditBar_Dev")
      rightGroupPage.EditBar_Dev = !(rightGroupPage.EditBar_Dev);
    if(element === "Settings_Access") {
      if(rightGroupPage.Settings_Access) {
        rightGroupPage.SelectedGroupManagement_Access = true;
        rightGroupPage = this.setRightSelected("SelectedGroupManagement_Access", rightGroupPage);

        rightGroupPage.SelectedUserManagement_Access = true;
        rightGroupPage = this.setRightSelected("SelectedUserManagement_Access", rightGroupPage);

        rightGroupPage.GroupManagement_Access = false;
        rightGroupPage.UserManagement_Access = false;
      } else {
        rightGroupPage.SelectedGroupManagement_Access = true;
        rightGroupPage.SelectedUserManagement_Access = true;
        rightGroupPage.GroupManagement_Access = true;
        rightGroupPage.UserManagement_Access = true;
      }
      rightGroupPage.Settings_Access = !(rightGroupPage.Settings_Access);
    }
    if(element === "EditBar_Edit") {
      if(rightGroupPage.EditBar_Edit) {
        rightGroupPage.SelectedPageManagement_Access = true;
        rightGroupPage = this.setRightSelected("SelectedPageManagement_Access", rightGroupPage);
      } else {
        rightGroupPage.SelectedPageManagement_Access = true;
        rightGroupPage.SelectedPageManagement_EditPage = true;
      }
      rightGroupPage.EditBar_Edit = !(rightGroupPage.EditBar_Edit);
    }

    if(rightGroupPage.SelectedGroupManagement_Access || rightGroupPage.SelectedUserManagement_Access ||
      rightGroupPage.UserManagement_Access || rightGroupPage.GroupManagement_Access)
      rightGroupPage.Settings_Access = true;
    if(!rightGroupPage.SelectedGroupManagement_Access && !rightGroupPage.SelectedUserManagement_Access &&
      !rightGroupPage.UserManagement_Access && !rightGroupPage.GroupManagement_Access)
      rightGroupPage.Settings_Access = false;

    if(rightGroupPage.EditBar_Dev || rightGroupPage.Settings_Access || rightGroupPage.SelectedPageManagement_Access)
      rightGroupPage.EditBar_Access = true;
    if(!rightGroupPage.EditBar_Dev && !rightGroupPage.Settings_Access && !rightGroupPage.SelectedPageManagement_Access)
      rightGroupPage.EditBar_Access = false;

    // Main Page
    if(rightGroupPage.Accueil_Access || rightGroupPage.Login_Access || rightGroupPage.User_Access || 
      rightGroupPage.EditBar_Access || rightGroupPage.SelectedUserManagement_Access || rightGroupPage.UserManagement_Access ||
      rightGroupPage.SelectedGroupManagement_Access || rightGroupPage.GroupManagement_Access || 
      rightGroupPage.SelectedPageManagement_Access || rightGroupPage.Settings_Access)
      rightGroupPage.Main_Access = true;
    if(!rightGroupPage.Accueil_Access && !rightGroupPage.Login_Access && !rightGroupPage.User_Access && 
      !rightGroupPage.EditBar_Access && !rightGroupPage.SelectedUserManagement_Access && !rightGroupPage.UserManagement_Access &&
      !rightGroupPage.SelectedGroupManagement_Access && !rightGroupPage.GroupManagement_Access && 
      !rightGroupPage.SelectedPageManagement_Access && !rightGroupPage.Settings_Access)
      rightGroupPage.Main_Access = false;

    return rightGroupPage;
  }

  public create_md5(attrib: string): string | Int32Array {
    const md5 = new Md5();
    return md5.appendStr(attrib).end();
  }

  public changeDateTimeFormatFromBdd(date: string): string {
    var ret: string = null;
    var tab: string[] = date.split(' ');
    var d_t: string[] = tab[0].split('-');
    ret = d_t[0] + "-" + d_t[2] + "-" + d_t[1];

    if(tab.length !== 1)
      ret += " " + tab[1];

    return ret;
  }

  public changeDateTimeFormatForBdd(dat: string, time: string): string {
    if(time === null)
      return this.date.transform(dat, 'yyyy-dd-MM');
    else 
      return this.date.transform(dat, 'yyyy-dd-MM') + " " + time;
  }

  public createGroup(data: any): Group {
    data = new Group(data)
    data.rightGroupPage = Object(new RightGroupPage(data.rightGroupPage))
    return data;
  }

  public createRightGroupPageList(data: any): RightGroupPage[] {
    for(var i: number = 0; i < Number(data.length); i++) {
      data[i] = new RightGroupPage(data[i])
    }
    return data;
  }

  public createUser(data: any): User {
    data = new User(data)
    data.group = Object(new Group(data.group))
    data.group.rightGroupPage = Object(new RightGroupPage(data.group.rightGroupPage))
    return data;
  }

  public createPage(data: any): Page {
    return new Page(data)
  }

  public createSetting(data: any): Setting {
    return new Setting(data)
  }

  public createUserList(data: any): User[] {
    for(var i: number = 0; i < Number(data.length); i++) {
      data[i] = new User(data[i])
      data[i].group = Object(new Group(data[i].group))
      data[i].group.rightGroupPage = Object(new RightGroupPage(data[i].group.rightGroupPage))
    }
    return data
  }

  public createGroupList(data: any): Group[] {
    for(var i: number = 0; i < Number(data.length); i++) {
      data[i] = new Group(data[i])
      data[i].rightGroupPage = Object(new RightGroupPage(data[i].rightGroupPage))
    }
    return data
  }

  public startUploadAnimation(element: string): void {
    var content: Element = document.getElementsByTagName('file-drop')[0].getElementsByTagName('div')[0].getElementsByTagName('div')[0];
    var image = content.getElementsByTagName('img')[0];
    image.style.transition = "0s";
    image.style.boxShadow = "none";
    image.style.height = String(image.offsetWidth + "px");

    var progress: HTMLElement = document.createElement( "div" );
    progress.setAttribute( "id", "progress" );
    progress.setAttribute( "style", "position: absolute; opacity: 1; cursor: pointer; text-align: center; " + 
    "border: 2px solid transparent; background-color: rgb(100, 100, 100, 0.8); height: " + String(image.offsetHeight - 4) + "px; " +
    "margin-top: -" + String(image.offsetHeight + 6) + "px;");
    content.appendChild( progress );

    if(getComputedStyle(image,null).getPropertyValue('border-radius') !== "0px") {
      var backgroundColor: string = window.getComputedStyle( document.getElementById("page_header") ,null).getPropertyValue('background-color');
      var cache_load: HTMLElement = document.createElement( "div" );
      cache_load.setAttribute( "id", "cache_load" );
      cache_load.setAttribute( "style", "background: radial-gradient(ellipse 50% 50%, transparent 0, transparent 100%, " + backgroundColor + " 100%); " +
      "z-index: 2; position: absolute; cursor: pointer; height: " + String(image.offsetHeight) + "px; " + 
      "width: " + String(image.offsetWidth) + "px; margin-top: -" + String(image.offsetHeight + 6) + "px;");
      content.appendChild( cache_load ); 
    }

    var drop_content: Element = document.getElementById('drop_content');
    if (drop_content) { content.removeChild(drop_content) }

    var upload_content: HTMLElement = document.createElement( "span" );
    upload_content.setAttribute( "id", "upload" );
    upload_content.textContent = "Envoie du fichier ...";
    content.appendChild( upload_content ); 
  }

  public startTritementUpload(): void {
    var content: Element = document.getElementsByTagName('file-drop')[0].getElementsByTagName('div')[0].getElementsByTagName('div')[0];

    var traitement_content: HTMLElement = document.createElement( "span" );
    traitement_content.setAttribute( "id", "traitement" );
    traitement_content.setAttribute("style", "float: left; width: 100%;");
    traitement_content.textContent = "Traitement ...";
    content.appendChild( traitement_content ); 
  }

  public updateLoadUploade(value: number, element: string): void {
    var content: Element = document.getElementsByTagName('file-drop')[0].getElementsByTagName('div')[0].getElementsByTagName('div')[0];
    var width: number = content.getElementsByTagName('img')[0].offsetWidth - 4;

    document.getElementById('progress').style.width = String((value / 100) * width + "px");
    document.getElementById("upload").innerHTML = "Envoie du fichier ... (" + String(value).split('.')[0] + "%)";
  }

  public stopUploadAnimation(element: string): void {
    var content: Element = document.getElementsByTagName('file-drop')[0].getElementsByTagName('div')[0].getElementsByTagName('div')[0];
    var traitement: Element = document.getElementById('traitement');
    var cache_load: Element = document.getElementById('cache_load');
    var progress: Element = document.getElementById('progress');
    var image: HTMLElement = document.getElementById(element);
    var upload: Element = document.getElementById('upload');

    if (traitement) { content.removeChild(traitement) }
    if (cache_load) { content.removeChild(cache_load) }
    if (progress) { content.removeChild(progress) }
    if (upload) { content.removeChild(upload) }

    var drop_content: HTMLElement = document.createElement( "span" );
    drop_content.setAttribute( "id", "drop_content" );
    drop_content.textContent = "Cliquez ou glicer un fichier";
    content.appendChild( drop_content ); 

    image.style.transition = "";
    image.style.boxShadow = "";
  }
}