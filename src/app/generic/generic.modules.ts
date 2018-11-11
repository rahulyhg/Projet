import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Md5 } from 'ts-md5/dist/md5';
import { DatePipe } from '@angular/common';

import { RightGroupPage } from '../Class/RightGroupPage';

@NgModule({ 
  imports: [CommonModule ] 
})
export class GenericModule { 

  constructor(private date: DatePipe) { }

  public setRightSelected(form: any, element: any, rgp: RightGroupPage): RightGroupPage {  
      var rightGroupPage: RightGroupPage = new RightGroupPage(rgp);

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
          rightGroupPage = this.setRightSelected(rightGroupPage, "SelectedGroupManagement_Access", rightGroupPage);

          rightGroupPage.SelectedUserManagement_Access = true;
          rightGroupPage = this.setRightSelected(rightGroupPage, "SelectedUserManagement_Access", rightGroupPage);

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
          rightGroupPage = this.setRightSelected(rightGroupPage, "SelectedPageManagement_Access", rightGroupPage);
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
    var d_t = tab[0].split('-');
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
}