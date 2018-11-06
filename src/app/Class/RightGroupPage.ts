import { isString, isNumber, isBoolean, isObject } from 'util';

export class RightGroupPage {
    public id: number;
    public name: string;

    public Main_Access: boolean;
    public Accueil_Access: boolean;
    public Login_Access: boolean;
    public User_Access: boolean;

    public EditBar_Access: boolean;
    public EditBar_Edit: boolean;
    public EditBar_Dev: boolean;

    public SelectedUserManagement_Access: boolean;
    public SelectedUserManagement_ViewPassword: boolean;
    public SelectedUserManagement_ShowPasswordButton: boolean;
    public SelectedUserManagement_EditRightGroupPageUser: boolean;
    public SelectedUserManagement_DeleteUser: boolean;
    public SelectedUserManagement_EditUser: boolean;

    public UserManagement_Access: boolean;
    public UserManagement_AddUser: boolean;
    public UserManagement_EditDefaultUser: boolean;

    public GroupManagement_Access: boolean;
    public GroupManagement_AddGroup: boolean;
    public GroupManagement_EditDefaultGroup: boolean;

    public SelectedGroupManagement_Access: boolean;
    public SelectedGroupManagement_EditGroup: boolean;
    public SelectedGroupManagement_DeleteGroup: boolean;
    public SelectedGroupManagement_EditRightPage: boolean;

    public SelectedPageManagement_Access: boolean;
    public SelectedPageManagement_EditPage: boolean;
    public SelectedPageManagement_EditRefresh: boolean;
    public SelectedPageManagement_EditRoute: boolean;
    public SelectedPageManagement_EditNeedLogIn: boolean;

    constructor(value: any) {
      if(value === null) { value = "" }

      this.id = this.setFormatNumber(value.id, value, 1);
      this.name = this.setFormatString(value.name, value, "default");

      this.Main_Access = this.setFormatBoolean(value.Main_Access, value, true);
      this.Accueil_Access = this.setFormatBoolean(value.Accueil_Access, value, true);
      this.Login_Access = this.setFormatBoolean(value.Login_Access, value, true);
      this.User_Access = this.setFormatBoolean(value.User_Access, value, false);

      this.EditBar_Access = this.setFormatBoolean(value.EditBar_Access, value, false);
      this.EditBar_Edit = this.setFormatBoolean(value.EditBar_Edit, value, false);
      this.EditBar_Dev = this.setFormatBoolean(value.EditBar_Dev, value, false);

      this.SelectedUserManagement_Access = this.setFormatBoolean(value.SelectedUserManagement_Access, value, false);
      this.SelectedUserManagement_ViewPassword = this.setFormatBoolean(value.SelectedUserManagement_ViewPassword, value, false);
      this.SelectedUserManagement_ShowPasswordButton = this.setFormatBoolean(value.SelectedUserManagement_ShowPasswordButton, value, false);
      this.SelectedUserManagement_EditRightGroupPageUser = this.setFormatBoolean(value.SelectedUserManagement_EditRightGroupPageUser, value, false);
      this.SelectedUserManagement_DeleteUser = this.setFormatBoolean(value.SelectedUserManagement_DeleteUser, value, false);
      this.SelectedUserManagement_EditUser = this.setFormatBoolean(value.SelectedUserManagement_EditUser, value, false);

      this.UserManagement_Access = this.setFormatBoolean(value.UserManagement_Access, value, false);
      this.UserManagement_AddUser = this.setFormatBoolean(value.UserManagement_AddUser, value, false);
      this.UserManagement_EditDefaultUser = this.setFormatBoolean(value.UserManagement_EditDefaultUser, value, false);

      this.GroupManagement_Access = this.setFormatBoolean(value.GroupManagement_Access, value, false);
      this.GroupManagement_AddGroup = this.setFormatBoolean(value.GroupManagement_AddGroup, value, false);
      this.GroupManagement_EditDefaultGroup = this.setFormatBoolean(value.GroupManagement_EditDefaultGroup, value, false);

      this.SelectedGroupManagement_Access = this.setFormatBoolean(value.SelectedGroupManagement_Access, value, false);
      this.SelectedGroupManagement_EditGroup = this.setFormatBoolean(value.SelectedGroupManagement_EditGroup, value, false);
      this.SelectedGroupManagement_DeleteGroup = this.setFormatBoolean(value.SelectedGroupManagement_DeleteGroup, value, false);
      this.SelectedGroupManagement_EditRightPage = this.setFormatBoolean(value.SelectedGroupManagement_EditRightPage, value, false);

      this.SelectedPageManagement_Access = this.setFormatBoolean(value.SelectedPageManagement_Access, value, false);
      this.SelectedPageManagement_EditPage = this.setFormatBoolean(value.SelectedPageManagement_EditPage, value, false);
      this.SelectedPageManagement_EditRefresh = this.setFormatBoolean(value.SelectedPageManagement_EditRefresh, value, false);
      this.SelectedPageManagement_EditRoute = this.setFormatBoolean(value.SelectedPageManagement_EditRoute, value, false);
      this.SelectedPageManagement_EditNeedLogIn = this.setFormatBoolean(value.SelectedPageManagement_EditNeedLogIn, value, false);
    }

    private setFormatNumber(attirb: any, value: any, defaut: any): number {
      var ret: number;
      if(isNumber(attirb))
        ret = attirb;
      else
        ret = Number(attirb);
      if(attirb === null || attirb === undefined || attirb === "" || attirb === " " || attirb < 0 || value === "") {
        if(isNumber(defaut))
          ret = defaut;
        else 
          ret = 1;
      }
      return ret;
    }
  
    private setFormatString(attirb: any, value: any, defaut: any): string {
      var ret: string;
      if(isString(attirb))
        ret = attirb;
      else
        ret = String(attirb);
      if(attirb === null || attirb === undefined || attirb === "" || attirb === " " || value === "") {
        if(isString(defaut))
          ret = defaut;
        else 
          ret = "default";
      }
      return ret;
    }
  
    private setFormatBoolean(attirb: any, value: any, defaut: any): boolean {
      var ret: boolean;
      if((attirb || !attirb) && isBoolean(attirb))  
        ret = attirb;
      else
        ret = Boolean(attirb);
      if(attirb === "0" || attirb === 0)
        ret = false;
      if(attirb === "1" || attirb === 1)
        ret = true;
      if(attirb === null || attirb === undefined || attirb === "" || attirb === " "  || value === "") {
        if(isBoolean(defaut))
          ret = defaut;
        else 
          ret = false;
      }
      return ret;
    }
  
    private setFormat(attirb: any, value: any, defaut: any): any {
      var ret: any = attirb;
      if(attirb === null || attirb === undefined || value === "" || !isObject(attirb))
        ret = defaut;
      return ret;
    }
  }