export class RightGroupPage {
    public id: number;
    public name: string;
    public Main_Access: boolean;
    public Accueil_Access: boolean;
    public Login_Access: boolean;
    public MonCompte_Access: boolean;
    public EditBar_Access: boolean;

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

    public EditBar_Edit: boolean;
    public EditBar_Dev: boolean;
    

    constructor(value: any) {
      if(value === null) { value = "" }

      this.id = value.id;
      if(value.id !== null || value.id !== undefined || value === "")
        this.id = 1;

      this.name = value.name;
      if(value.name !== null || value.name !== undefined || value === "")
        this.name = "default";

      if(value.Main_Access || !value.Main_Access) 
        this.Main_Access = value.Main_Access;
      if(value.Main_Access === "0")
        this.Main_Access = false;
      if(value.Main_Access === "1")
        this.Main_Access = true;
      if(value.Main_Access === null || value.Main_Access === undefined || value === "")
        this.Main_Access = true;

      if(value.Accueil_Access || !value.Accueil_Access) 
        this.Accueil_Access = value.Accueil_Access;
      if(value.Accueil_Access === "0")
        this.Accueil_Access = false;
      if(value.Accueil_Access === "1")
        this.Accueil_Access = true;
      if(value.Accueil_Access === null || value.Accueil_Access === undefined || value === "")
        this.Accueil_Access = true;

      if(value.Login_Access || !value.Login_Access) 
        this.Login_Access = value.Login_Access;
      if(value.Login_Access === "0")
        this.Login_Access = false;
      if(value.Login_Access === "1")
        this.Login_Access = true;
      if(value.Login_Access === null || value.Login_Access === undefined || value === "")
        this.Login_Access = true;

      if(value.MonCompte_Access || !value.MonCompte_Access) 
        this.MonCompte_Access = value.MonCompte_Access;
      if(value.MonCompte_Access === "0")
        this.MonCompte_Access = false;
      if(value.MonCompte_Access === "1")
        this.MonCompte_Access = true;
      if(value.MonCompte_Access === null || value.MonCompte_Access === undefined || value === "")
        this.MonCompte_Access = false;

      if(value.EditBar_Access || !value.EditBar_Access) 
        this.EditBar_Access = value.EditBar_Access;
      if(value.EditBar_Access === "0")
        this.EditBar_Access = false;
      if(value.EditBar_Access === "1")
        this.EditBar_Access = true;
      if(value.EditBar_Access === null || value.EditBar_Access === undefined || value === "")
        this.EditBar_Access = false;

        

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


      
      if(value.SelectedGroupManagement_Access || !value.SelectedGroupManagement_Access) 
        this.SelectedGroupManagement_Access = value.SelectedGroupManagement_Access;
      if(value.SelectedGroupManagement_Access === "0")
        this.SelectedGroupManagement_Access = false;
      if(value.SelectedGroupManagement_Access === "1")
        this.SelectedGroupManagement_Access = true;
      if(value.SelectedGroupManagement_Access === null || value.SelectedGroupManagement_Access === undefined || value === "")
        this.SelectedGroupManagement_Access = false;

      if(value.SelectedGroupManagement_EditGroup || !value.SelectedGroupManagement_EditGroup) 
        this.SelectedGroupManagement_EditGroup = value.SelectedGroupManagement_EditGroup;
      if(value.SelectedGroupManagement_EditGroup === "0")
        this.SelectedGroupManagement_EditGroup = false;
      if(value.SelectedGroupManagement_EditGroup === "1")
        this.SelectedGroupManagement_EditGroup = true;
      if(value.SelectedGroupManagement_EditGroup === null || value.SelectedGroupManagement_EditGroup === undefined || value === "")
        this.SelectedGroupManagement_EditGroup = false;

      if(value.SelectedGroupManagement_DeleteGroup || !value.SelectedGroupManagement_DeleteGroup) 
        this.SelectedGroupManagement_DeleteGroup = value.SelectedGroupManagement_DeleteGroup;
      if(value.SelectedGroupManagement_DeleteGroup === "0")
        this.SelectedGroupManagement_DeleteGroup = false;
      if(value.SelectedGroupManagement_DeleteGroup === "1")
        this.SelectedGroupManagement_DeleteGroup = true;
      if(value.SelectedGroupManagement_DeleteGroup === null || value.SelectedGroupManagement_DeleteGroup === undefined || value === "")
        this.SelectedGroupManagement_DeleteGroup = false;

      if(value.SelectedGroupManagement_EditRightPage || !value.SelectedGroupManagement_EditRightPage) 
        this.SelectedGroupManagement_EditRightPage = value.SelectedGroupManagement_EditRightPage;
      if(value.SelectedGroupManagement_EditRightPage === "0")
        this.SelectedGroupManagement_EditRightPage = false;
      if(value.SelectedGroupManagement_EditRightPage === "1")
        this.SelectedGroupManagement_EditRightPage = true;
      if(value.SelectedGroupManagement_EditRightPage === null || value.SelectedGroupManagement_EditRightPage === undefined || value === "")
        this.SelectedGroupManagement_EditRightPage = false;


        
      if(value.EditBar_Edit || !value.EditBar_Edit) 
        this.EditBar_Edit = value.EditBar_Edit;
      if(value.EditBar_Edit === "0")
        this.EditBar_Edit = false;
      if(value.EditBar_Edit === "1")
        this.EditBar_Edit = true;
      if(value.EditBar_Edit === null || value.EditBar_Edit === undefined || value === "")
        this.EditBar_Edit = false;

      if(value.EditBar_Dev || !value.EditBar_Dev) 
        this.EditBar_Dev = value.EditBar_Dev;
      if(value.EditBar_Dev === "0")
        this.EditBar_Dev = false;
      if(value.EditBar_Dev === "1")
        this.EditBar_Dev = true;
      if(value.EditBar_Dev === null || value.EditBar_Dev === undefined || value === "")
        this.EditBar_Dev = false;

      
    }
  }