import { Group } from '../Class/Group';
import { Page } from '../Class/Page';
import { User } from '../Class/User';
import { RightGroupPage } from '../Class/RightGroupPage';
import { Upload } from '../Class/Upload';

export const PAGE: Page[] = [
    { 
        id: 1,
        title: "default",
        favicon: "assets/uploads/favicon/favicon.ico",
        refresh: 10000,
        route: "/"
    },
    { 
        id: 2,
        title: "Accueil",
        favicon: "assets/uploads/favicon/Accueil.ico",
        refresh: 10000,
        route: "/Accueil"
    },
    { 
        id: 3,
        title: "Login",
        favicon: "assets/uploads/favicon/favicon.ico",
        refresh: 10000,
        route: "/Login"
    },
    { 
        id: 4,
        title: "Mon Compte",
        favicon: "assets/uploads/favicon/MonCompte.ico",
        refresh: 10000,
        route: "/MonCompte"
    },
    { 
        id: 5,
        title: "Gestion des utilisateurs",
        favicon: "assets/uploads/favicon/favicon.ico",
        refresh: 10000,
        route: "/UserManagement"
    },
    { 
        id: 6,
        title: "Gestion des groupes",
        favicon: "assets/uploads/favicon/favicon.ico",
        refresh: 10000,
        route: "/GroupManagement"
    },
    { 
        id: 7,
        title: "Gestion des pages",
        favicon: "assets/uploads/favicon/favicon.ico",
        refresh: 10000,
        route: "/PageManagement"
    }
];

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

export const GROUP: Group[] = [
    { 
        id: 1, 
        name: "default", 
        rightGroupPage: RIGHTGROUPPAGE[0] 
    },
    { 
        id: 2, 
        name: "Développement", 
        rightGroupPage: RIGHTGROUPPAGE[1] 
    },
    { 
        id: 3, 
        name: "_user_3", 
        rightGroupPage: RIGHTGROUPPAGE[2] 
    }
    
];

export const USER: User[] = [
    {
        id: 1,
        login: "default",
        password: "c21f969b5f03d33d43e04f8f136e7682",
        group: GROUP[0], 
        profile: "assets/uploads/images/default.jpg",
        statut: false, 
        date_time_logIn: "2000-01-01 01:01:01", 
        date_time_signIn: "2000-01-01 01:01:01",
        gameTag: "@default", 
        name: "default", 
        firstName: "default", 
        birthDate: "2000-01-01"
    },
    { 
        id: 2,
        login: "dev",
        password: "b22f2a7814d6e43374cea98ff1e824be",
        group: GROUP[1], 
        profile: "assets/uploads/images/dev1.jpg",
        statut: true, 
        date_time_logIn: "2018-10-18 11:49:48", 
        date_time_signIn: "2018-10-15 18:38:01",
        gameTag: "@dov118", 
        name: "Kévin", 
        firstName: "Carlier", 
        birthDate: "1997-11-17"
    },
    { 
        id: 3,
        login: "lucas",
        password: "c21f969b5f03d33d43e04f8f136e7682",
        group: GROUP[2], 
        profile: "assets/uploads/images/lucas.jpg",
        statut: false,
        date_time_logIn: "2018-10-18 11:49:48", 
        date_time_signIn: "2018-10-15 18:38:01",
        gameTag: "@lucas", 
        name: "lucas", 
        firstName: "default", 
        birthDate: "2000-01-01"
    },
    { 
        id: 4,
        login: "test",
        password: "c21f969b5f03d33d43e04f8f136e7682",
        group: GROUP[1], 
        profile: "assets/uploads/images/dev1.jpg",
        statut: false, 
        date_time_logIn: "2018-10-18 11:49:48", 
        date_time_signIn: "2018-10-15 18:38:01",
        gameTag: "@default", 
        name: "default", 
        firstName: "default", 
        birthDate: "2000-01-01"
    },
];

export const UPLOAD: Upload[] = [
    {
        id: 1,
        name: "default.default",
        path: "default/defaultdefault.default",
        uploadDate: "2000-01-01",
        fileOwner: new User(null),
        size: 0,
        extention: ".default"
    }
];