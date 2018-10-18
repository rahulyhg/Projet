export class RightGroupPage {
    public id: number;
    public access_Main: boolean;
    public access_Accueil: boolean;
    public access_Login: boolean;
    public access_MonCompte: boolean;
    public access_Main_EditBar: boolean;
    public access_SelectedUserManagement: boolean;
    public access_UserManagement: boolean;
    public access_Main_EditBar_Edit: boolean;
    public access_Main_EditBar_Dev: boolean;

    constructor(value: any) {
      if(value === null) { value = "" }

      this.id = this.IsEmpty(value.id, 1),
      this.access_Main = this.IsEmptyBoolean(value.access_Main, true),
      this.access_Accueil = this.IsEmptyBoolean(value.access_Accueil, true),
      this.access_Login = this.IsEmptyBoolean(value.access_Login, true),
      this.access_MonCompte = this.IsEmptyBoolean(value.access_MonCompte, false),
      this.access_Main_EditBar = this.IsEmptyBoolean(value.access_Main_EditBar, false),
      this.access_SelectedUserManagement = this.IsEmptyBoolean(value.access_SelectedUserManagement, false),
      this.access_UserManagement = this.IsEmptyBoolean(value.access_UserManagement, false),
      this.access_Main_EditBar_Edit = this.IsEmptyBoolean(value.access_Main_EditBar_Edit, false),
      this.access_Main_EditBar_Dev = this.IsEmptyBoolean(value.access_Main_EditBar_Dev, false)
    }

    private IsEmpty(value: any, default_value: any): any {
      if(value !== null && value !== undefined)
        return value;
      else
        return default_value;
    }
  
    private IsEmptyBoolean(value: any, default_value: boolean): boolean {
      if(value !== null && value !== undefined) {
        if(value || !value) 
          return value;
        if(value === "0")
          return false;
        if(value === "1")
          return true;
      } else
        return default_value;
    }
  }