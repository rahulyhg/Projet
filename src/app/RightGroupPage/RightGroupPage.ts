export class RightGroupPage {
    public id: number;
    public name: string;
    public access_Main: boolean;
    public access_Accueil: boolean;
    public access_Login: boolean;
    public access_MonCompte: boolean;
    public access_Main_EditBar: boolean;

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

        

      if(value.SelectedUserManagement_Access || !value.SelectedUserManagement_Access) 
        this.SelectedUserManagement_Access = value.SelectedUserManagement_Access;
      if(value.SelectedUserManagement_Access === "0")
        this.SelectedUserManagement_Access = false;
      if(value.SelectedUserManagement_Access === "1")
        this.SelectedUserManagement_Access = true;
      if(value.SelectedUserManagement_Access === null || value.SelectedUserManagement_Access === undefined || value === "")
        this.SelectedUserManagement_Access = false;

      if(value.SelectedUserManagement_ViewPassword || !value.SelectedUserManagement_ViewPassword) 
        this.SelectedUserManagement_ViewPassword = value.SelectedUserManagement_ViewPassword;
      if(value.SelectedUserManagement_ViewPassword === "0")
        this.SelectedUserManagement_ViewPassword = false;
      if(value.SelectedUserManagement_ViewPassword === "1")
        this.SelectedUserManagement_ViewPassword = true;
      if(value.SelectedUserManagement_ViewPassword === null || value.SelectedUserManagement_ViewPassword === undefined || value === "")
        this.SelectedUserManagement_ViewPassword = false;

      if(value.SelectedUserManagement_ShowPasswordButton || !value.SelectedUserManagement_ShowPasswordButton) 
        this.SelectedUserManagement_ShowPasswordButton = value.SelectedUserManagement_ShowPasswordButton;
      if(value.SelectedUserManagement_ShowPasswordButton === "0")
        this.SelectedUserManagement_ShowPasswordButton = false;
      if(value.SelectedUserManagement_ShowPasswordButton === "1")
        this.SelectedUserManagement_ShowPasswordButton = true;
      if(value.SelectedUserManagement_ShowPasswordButton === null || value.SelectedUserManagement_ShowPasswordButton === undefined || value === "")
        this.SelectedUserManagement_ShowPasswordButton = false;

      if(value.SelectedUserManagement_EditRightGroupPageUser || !value.SelectedUserManagement_EditRightGroupPageUser) 
        this.SelectedUserManagement_EditRightGroupPageUser = value.SelectedUserManagement_EditRightGroupPageUser;
      if(value.SelectedUserManagement_EditRightGroupPageUser === "0")
        this.SelectedUserManagement_EditRightGroupPageUser = false;
      if(value.SelectedUserManagement_EditRightGroupPageUser === "1")
        this.SelectedUserManagement_EditRightGroupPageUser = true;
      if(value.SelectedUserManagement_EditRightGroupPageUser === null || value.SelectedUserManagement_EditRightGroupPageUser === undefined || value === "")
        this.SelectedUserManagement_EditRightGroupPageUser = false;

      if(value.SelectedUserManagement_DeleteUser || !value.SelectedUserManagement_DeleteUser) 
        this.SelectedUserManagement_DeleteUser = value.SelectedUserManagement_DeleteUser;
      if(value.SelectedUserManagement_DeleteUser === "0")
        this.SelectedUserManagement_DeleteUser = false;
      if(value.SelectedUserManagement_DeleteUser === "1")
        this.SelectedUserManagement_DeleteUser = true;
      if(value.SelectedUserManagement_DeleteUser === null || value.SelectedUserManagement_DeleteUser === undefined || value === "")
        this.SelectedUserManagement_DeleteUser = false;

      if(value.SelectedUserManagement_EditUser || !value.SelectedUserManagement_EditUser) 
        this.SelectedUserManagement_EditUser = value.SelectedUserManagement_EditUser;
      if(value.SelectedUserManagement_EditUser === "0")
        this.SelectedUserManagement_EditUser = false;
      if(value.SelectedUserManagement_EditUser === "1")
        this.SelectedUserManagement_EditUser = true;
      if(value.SelectedUserManagement_EditUser === null || value.SelectedUserManagement_EditUser === undefined || value === "")
        this.SelectedUserManagement_EditUser = false;



      if(value.UserManagement_Access || !value.UserManagement_Access) 
        this.UserManagement_Access = value.UserManagement_Access;
      if(value.UserManagement_Access === "0")
        this.UserManagement_Access = false;
      if(value.UserManagement_Access === "1")
        this.UserManagement_Access = true;
      if(value.UserManagement_Access === null || value.UserManagement_Access === undefined || value === "")
        this.UserManagement_Access = false;

      if(value.UserManagement_AddUser || !value.UserManagement_AddUser) 
        this.UserManagement_AddUser = value.UserManagement_AddUser;
      if(value.UserManagement_AddUser === "0")
        this.UserManagement_AddUser = false;
      if(value.UserManagement_AddUser === "1")
        this.UserManagement_AddUser = true;
      if(value.UserManagement_AddUser === null || value.UserManagement_AddUser === undefined || value === "")
        this.UserManagement_AddUser = false;

      if(value.UserManagement_EditDefaultUser || !value.UserManagement_EditDefaultUser) 
        this.UserManagement_EditDefaultUser = value.UserManagement_EditDefaultUser;
      if(value.UserManagement_EditDefaultUser === "0")
        this.UserManagement_EditDefaultUser = false;
      if(value.UserManagement_EditDefaultUser === "1")
        this.UserManagement_EditDefaultUser = true;
      if(value.UserManagement_EditDefaultUser === null || value.UserManagement_EditDefaultUser === undefined || value === "")
        this.UserManagement_EditDefaultUser = false;



      if(value.GroupManagement_Access || !value.GroupManagement_Access) 
        this.GroupManagement_Access = value.GroupManagement_Access;
      if(value.GroupManagement_Access === "0")
        this.GroupManagement_Access = false;
      if(value.GroupManagement_Access === "1")
        this.GroupManagement_Access = true;
      if(value.GroupManagement_Access === null || value.GroupManagement_Access === undefined || value === "")
        this.GroupManagement_Access = false;

      if(value.GroupManagement_AddGroup || !value.GroupManagement_AddGroup) 
        this.GroupManagement_AddGroup = value.GroupManagement_AddGroup;
      if(value.GroupManagement_AddGroup === "0")
        this.GroupManagement_AddGroup = false;
      if(value.GroupManagement_AddGroup === "1")
        this.GroupManagement_AddGroup = true;
      if(value.GroupManagement_AddGroup === null || value.GroupManagement_AddGroup === undefined || value === "")
        this.GroupManagement_AddGroup = false;

      if(value.GroupManagement_EditDefaultGroup || !value.GroupManagement_EditDefaultGroup) 
        this.GroupManagement_EditDefaultGroup = value.GroupManagement_EditDefaultGroup;
      if(value.GroupManagement_EditDefaultGroup === "0")
        this.GroupManagement_EditDefaultGroup = false;
      if(value.GroupManagement_EditDefaultGroup === "1")
        this.GroupManagement_EditDefaultGroup = true;
      if(value.GroupManagement_EditDefaultGroup === null || value.GroupManagement_EditDefaultGroup === undefined || value === "")
        this.GroupManagement_EditDefaultGroup = false;



        
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