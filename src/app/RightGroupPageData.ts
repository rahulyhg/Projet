import { RightGroupPage } from './Class/RightGroupPage';

export const RIGHTGROUPPAGE: RightGroupPage[] = [
    { 
        id: 1, 
        access_Main: true, 
        access_Accueil: true, 
        access_Login: true, 
        access_MonCompte: false, 
        access_Main_EditBar: false, 
        access_SelectedUserManagement: false, 
        access_UserManagement: false, 
        access_Main_EditBar_Dev: false, 
        access_Main_EditBar_Edit: false
    },
    { 
        id: 2, 
        access_Main: true, 
        access_Accueil: true, 
        access_Login: true, 
        access_MonCompte: true, 
        access_Main_EditBar: true, 
        access_SelectedUserManagement: true, 
        access_UserManagement: true, 
        access_Main_EditBar_Dev: true, 
        access_Main_EditBar_Edit: true
    }
];