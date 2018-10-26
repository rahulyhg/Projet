import { RightGroupPage } from './RightGroupPage';

export const RIGHTGROUPPAGE: RightGroupPage[] = [
    { 
        id: 1, 
        name: "default",
        Main_Access: true, 
        Accueil_Access: true, 
        Login_Access: true, 
        MonCompte_Access: false, 
        EditBar_Access: false, 
        SelectedUserManagement_Access: false, 
        SelectedUserManagement_ViewPassword: false,
        SelectedUserManagement_ShowPasswordButton: false,
        SelectedUserManagement_EditRightGroupPageUser: false,
        SelectedUserManagement_DeleteUser: false,
        SelectedUserManagement_EditUser: false,
        UserManagement_Access: false, 
        UserManagement_AddUser: false,
        UserManagement_EditDefaultUser: false,
        GroupManagement_Access: false,
        GroupManagement_AddGroup: false,
        GroupManagement_EditDefaultGroup: false,
        SelectedGroupManagement_Access: false,
        SelectedGroupManagement_EditGroup: false,
        SelectedGroupManagement_DeleteGroup: false,
        SelectedGroupManagement_EditRightPage: false,
        EditBar_Dev: false, 
        EditBar_Edit: false
    },
    { 
        id: 2, 
        name : "Développement",
        Main_Access: true, 
        Accueil_Access: true, 
        Login_Access: true, 
        MonCompte_Access: true, 
        EditBar_Access: true, 
        SelectedUserManagement_Access: true, 
        SelectedUserManagement_ViewPassword: true,
        SelectedUserManagement_ShowPasswordButton: true,
        SelectedUserManagement_EditRightGroupPageUser: true,
        SelectedUserManagement_DeleteUser: true,
        SelectedUserManagement_EditUser: true,
        UserManagement_Access: true, 
        UserManagement_AddUser: true,
        UserManagement_EditDefaultUser: true,
        GroupManagement_Access: true,
        GroupManagement_AddGroup: true,
        GroupManagement_EditDefaultGroup: true,
        SelectedGroupManagement_Access: true,
        SelectedGroupManagement_EditGroup: true,
        SelectedGroupManagement_DeleteGroup: true,
        SelectedGroupManagement_EditRightPage: true,
        EditBar_Dev: true, 
        EditBar_Edit: true
    },
    { 
        id: 3, 
        name: "_user_3",
        Main_Access: true, 
        Accueil_Access: true, 
        Login_Access: true, 
        MonCompte_Access: true, 
        EditBar_Access: false, 
        SelectedUserManagement_Access: false, 
        SelectedUserManagement_ViewPassword: false,
        SelectedUserManagement_ShowPasswordButton: false,
        SelectedUserManagement_EditRightGroupPageUser: false,
        SelectedUserManagement_DeleteUser: false,
        SelectedUserManagement_EditUser: false,
        UserManagement_Access: false, 
        UserManagement_AddUser: false,
        UserManagement_EditDefaultUser: false,
        GroupManagement_Access: false,
        GroupManagement_AddGroup: false,
        GroupManagement_EditDefaultGroup: false,
        SelectedGroupManagement_Access: false,
        SelectedGroupManagement_EditGroup: false,
        SelectedGroupManagement_DeleteGroup: false,
        SelectedGroupManagement_EditRightPage: false,
        EditBar_Dev: false, 
        EditBar_Edit: false
    }
];