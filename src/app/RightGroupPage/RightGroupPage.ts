export class RightGroupPage {
    public id: number;
    public name: string;
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

      this.id = value.id;
      if(value.id !== null || value.id !== undefined || value === "")
        this.id = 1;

      this.name = value.name;
      if(value.name !== null || value.name !== undefined || value === "")
        this.name = "default";

      if(value.access_Main || !value.access_Main) 
        this.access_Main = value.access_Main;
      if(value.access_Main === "0")
        this.access_Main = false;
      if(value.access_Main === "1")
        this.access_Main = true;
      if(value.access_Main === null || value.access_Main === undefined || value === "")
        this.access_Main = true;

      if(value.access_Accueil || !value.access_Accueil) 
        this.access_Accueil = value.access_Accueil;
      if(value.access_Accueil === "0")
        this.access_Accueil = false;
      if(value.access_Accueil === "1")
        this.access_Accueil = true;
      if(value.access_Accueil === null || value.access_Accueil === undefined || value === "")
        this.access_Accueil = true;

      if(value.access_Login || !value.access_Login) 
        this.access_Login = value.access_Login;
      if(value.access_Login === "0")
        this.access_Login = false;
      if(value.access_Login === "1")
        this.access_Login = true;
      if(value.access_Login === null || value.access_Login === undefined || value === "")
        this.access_Login = true;

      if(value.access_MonCompte || !value.access_MonCompte) 
        this.access_MonCompte = value.access_MonCompte;
      if(value.access_MonCompte === "0")
        this.access_MonCompte = false;
      if(value.access_MonCompte === "1")
        this.access_MonCompte = true;
      if(value.access_MonCompte === null || value.access_MonCompte === undefined || value === "")
        this.access_MonCompte = false;

      if(value.access_Main_EditBar || !value.access_Main_EditBar) 
        this.access_Main_EditBar = value.access_Main_EditBar;
      if(value.access_Main_EditBar === "0")
        this.access_Main_EditBar = false;
      if(value.access_Main_EditBar === "1")
        this.access_Main_EditBar = true;
      if(value.access_Main_EditBar === null || value.access_Main_EditBar === undefined || value === "")
        this.access_Main_EditBar = false;

      if(value.access_SelectedUserManagement || !value.access_SelectedUserManagement) 
        this.access_SelectedUserManagement = value.access_SelectedUserManagement;
      if(value.access_SelectedUserManagement === "0")
        this.access_SelectedUserManagement = false;
      if(value.access_SelectedUserManagement === "1")
        this.access_SelectedUserManagement = true;
      if(value.access_SelectedUserManagement === null || value.access_SelectedUserManagement === undefined || value === "")
        this.access_SelectedUserManagement = false;

      if(value.access_UserManagement || !value.access_UserManagement) 
        this.access_UserManagement = value.access_UserManagement;
      if(value.access_UserManagement === "0")
        this.access_UserManagement = false;
      if(value.access_UserManagement === "1")
        this.access_UserManagement = true;
      if(value.access_UserManagement === null || value.access_UserManagement === undefined || value === "")
        this.access_UserManagement = false;
        
      if(value.access_Main_EditBar_Edit || !value.access_Main_EditBar_Edit) 
        this.access_Main_EditBar_Edit = value.access_Main_EditBar_Edit;
      if(value.access_Main_EditBar_Edit === "0")
        this.access_Main_EditBar_Edit = false;
      if(value.access_Main_EditBar_Edit === "1")
        this.access_Main_EditBar_Edit = true;
      if(value.access_Main_EditBar_Edit === null || value.access_Main_EditBar_Edit === undefined || value === "")
        this.access_Main_EditBar_Edit = false;

      if(value.access_Main_EditBar_Dev || !value.access_Main_EditBar_Dev) 
        this.access_Main_EditBar_Dev = value.access_Main_EditBar_Dev;
      if(value.access_Main_EditBar_Dev === "0")
        this.access_Main_EditBar_Dev = false;
      if(value.access_Main_EditBar_Dev === "1")
        this.access_Main_EditBar_Dev = true;
      if(value.access_Main_EditBar_Dev === null || value.access_Main_EditBar_Dev === undefined || value === "")
        this.access_Main_EditBar_Dev = false;
    }
  }