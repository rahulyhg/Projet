import { Group } from '../Class/Group';
import { Page } from '../Class/Page';
import { User } from '../Class/User';
import { RightGroupPage } from '../Class/RightGroupPage';
import { Upload } from '../Class/Upload';

// ---------- PAGE ----------

const Page1: Page = new Page(null);
Page1.id = 1;
Page1.title = "default";
Page1.favicon = "assets/uploads/favicon/favicon.ico";
Page1.refresh = 10000;
Page1.route = "/";
Page1.needLogIn = false;

const Page2: Page = new Page(null);
Page2.id = 2;
Page2.title = "Accueil";
Page2.favicon = "assets/uploads/favicon/Accueil.ico";
Page2.refresh = 10000;
Page2.route = "/Accueil";
Page2.needLogIn = false;

const Page3: Page = new Page(null);
Page3.id = 3;
Page3.title = "Login";
Page3.favicon = "assets/uploads/favicon/favicon.ico";
Page3.refresh = 10000;
Page3.route = "/Login";
Page3.needLogIn = false;

const Page4: Page = new Page(null);
Page4.id = 4;
Page4.title = "Mon Compte";
Page4.favicon = "assets/uploads/favicon/MonCompte.ico";
Page4.refresh = 10000;
Page4.route = "/MonCompte";
Page4.needLogIn = true;

const Page5: Page = new Page(null);
Page5.id = 5;
Page5.title = "Gestion des utilisateurs";
Page5.favicon = "assets/uploads/favicon/favicon.ico";
Page5.refresh = 10000;
Page5.route = "/UserManagement";
Page5.needLogIn = true;

const Page6: Page = new Page(null);
Page6.id = 6;
Page6.title = "Gestion des groupes";
Page6.favicon = "assets/uploads/favicon/favicon.ico";
Page6.refresh = 10000;
Page6.route = "/GroupManagement";
Page6.needLogIn = true;

const Page7: Page = new Page(null);
Page7.id = 7;
Page7.title = "Gestion des pages";
Page7.favicon = "assets/uploads/favicon/favicon.ico";
Page7.refresh = 10000;
Page7.route = "/PageManagement";
Page7.needLogIn = true;

// ---------- RIGHTGROUPPAGE ----------

const RightGroupPage1: RightGroupPage = new RightGroupPage(null);
RightGroupPage1.id = 1;
RightGroupPage1.name = "default";
RightGroupPage1.Main_Access = true; 
RightGroupPage1.Accueil_Access = true; 
RightGroupPage1.Login_Access = true; 
RightGroupPage1.MonCompte_Access = false; 
RightGroupPage1.EditBar_Access = false; 
RightGroupPage1.SelectedUserManagement_Access = false; 
RightGroupPage1.SelectedUserManagement_ViewPassword = false;
RightGroupPage1.SelectedUserManagement_ShowPasswordButton = false;
RightGroupPage1.SelectedUserManagement_EditRightGroupPageUser = false;
RightGroupPage1.SelectedUserManagement_DeleteUser = false;
RightGroupPage1.SelectedUserManagement_EditUser = false;
RightGroupPage1.UserManagement_Access = false; 
RightGroupPage1.UserManagement_AddUser = false;
RightGroupPage1.UserManagement_EditDefaultUser = false;
RightGroupPage1.GroupManagement_Access = false;
RightGroupPage1.GroupManagement_AddGroup = false;
RightGroupPage1.GroupManagement_EditDefaultGroup = false;
RightGroupPage1.SelectedGroupManagement_Access = false;
RightGroupPage1.SelectedGroupManagement_EditGroup = false;
RightGroupPage1.SelectedGroupManagement_DeleteGroup = false;
RightGroupPage1.SelectedGroupManagement_EditRightPage = false;
RightGroupPage1.EditBar_Dev = false; 
RightGroupPage1.EditBar_Edit = false;

const RightGroupPage2: RightGroupPage = new RightGroupPage(null);
RightGroupPage2.id = 2;
RightGroupPage2.name = "Développement";
RightGroupPage2.Main_Access = true; 
RightGroupPage2.Accueil_Access = true; 
RightGroupPage2.Login_Access = true; 
RightGroupPage2.MonCompte_Access = true;
RightGroupPage2.EditBar_Access = true;
RightGroupPage2.SelectedUserManagement_Access = true;
RightGroupPage2.SelectedUserManagement_ViewPassword = true;
RightGroupPage2.SelectedUserManagement_ShowPasswordButton = true;
RightGroupPage2.SelectedUserManagement_EditRightGroupPageUser = true;
RightGroupPage2.SelectedUserManagement_DeleteUser = true;
RightGroupPage2.SelectedUserManagement_EditUser = true;
RightGroupPage2.UserManagement_Access = true;
RightGroupPage2.UserManagement_AddUser = true;
RightGroupPage2.UserManagement_EditDefaultUser = true;
RightGroupPage2.GroupManagement_Access = true;
RightGroupPage2.GroupManagement_AddGroup = true;
RightGroupPage2.GroupManagement_EditDefaultGroup = true;
RightGroupPage2.SelectedGroupManagement_Access = true;
RightGroupPage2.SelectedGroupManagement_EditGroup = true;
RightGroupPage2.SelectedGroupManagement_DeleteGroup = true;
RightGroupPage2.SelectedGroupManagement_EditRightPage = true;
RightGroupPage2.EditBar_Dev = true;
RightGroupPage2.EditBar_Edit = true;

const RightGroupPage3: RightGroupPage = new RightGroupPage(null);
RightGroupPage3.id = 3;
RightGroupPage3.name = "_user_3";
RightGroupPage3.Main_Access = true; 
RightGroupPage3.Accueil_Access = true; 
RightGroupPage3.Login_Access = true; 
RightGroupPage3.MonCompte_Access = true; 
RightGroupPage3.EditBar_Access = false; 
RightGroupPage3.SelectedUserManagement_Access = false; 
RightGroupPage3.SelectedUserManagement_ViewPassword = false;
RightGroupPage3.SelectedUserManagement_ShowPasswordButton = false;
RightGroupPage3.SelectedUserManagement_EditRightGroupPageUser = false;
RightGroupPage3.SelectedUserManagement_DeleteUser = false;
RightGroupPage3.SelectedUserManagement_EditUser = false;
RightGroupPage3.UserManagement_Access = false; 
RightGroupPage3.UserManagement_AddUser = false;
RightGroupPage3.UserManagement_EditDefaultUser = false;
RightGroupPage3.GroupManagement_Access = false;
RightGroupPage3.GroupManagement_AddGroup = false;
RightGroupPage3.GroupManagement_EditDefaultGroup = false;
RightGroupPage3.SelectedGroupManagement_Access = false;
RightGroupPage3.SelectedGroupManagement_EditGroup = false;
RightGroupPage3.SelectedGroupManagement_DeleteGroup = false;
RightGroupPage3.SelectedGroupManagement_EditRightPage = false;
RightGroupPage3.EditBar_Dev = false; 
RightGroupPage3.EditBar_Edit = false;

// ---------- GROUP ----------

const Group1: Group = new Group(null);
Group1.id = 1;
Group1.name = "default";
Group1.rightGroupPage = RightGroupPage1;

const Group2: Group = new Group(null);
Group2.id = 2;
Group2.name = "Développement";
Group2.rightGroupPage = RightGroupPage2;

const Group3: Group = new Group(null);
Group3.id = 3;
Group3.name = "_user_3";
Group3.rightGroupPage = RightGroupPage3;

// ---------- USER ----------

const User1: User = new User(null);
User1.id = 1;
User1.login = "default";
User1.password = "c21f969b5f03d33d43e04f8f136e7682";
User1.group = Group1;
User1.profile = "assets/uploads/images/default.jpg";
User1.statut = false;
User1.date_time_logIn = "2000-01-01 01:01:01";
User1.date_time_signIn = "2000-01-01 01:01:01";
User1.gameTag = "@default";
User1.name = "default";
User1.firstName = "default";
User1.birthDate = "2000-01-01";

const User2: User = new User(null);
User2.id = 2;
User2.login = "dev";
User2.password = "b22f2a7814d6e43374cea98ff1e824be";
User2.group = Group2;
User2.profile = "assets/uploads/images/dev1.jpg";
User2.statut = true;
User2.date_time_logIn = "2018-10-18 11:49:48";
User2.date_time_signIn = "2018-10-15 18:38:01";
User2.gameTag = "@dov118";
User2.name = "Kévin";
User2.firstName = "Carlier";
User2.birthDate = "1997-11-17";

const User3: User = new User(null);
User3.id = 3;
User3.login = "lucas";
User3.password = "c21f969b5f03d33d43e04f8f136e7682";
User3.group = Group3;
User3.profile = "assets/uploads/images/lucas.jpg";
User3.statut = false;
User3.date_time_logIn = "2018-10-18 11:49:48";
User3.date_time_signIn = "2018-10-15 18:38:01";
User3.gameTag = "@lucas";
User3.name = "lucas";
User3.firstName = "default";
User3.birthDate = "2000-01-01";

const User4: User = new User(null);
User4.id = 4;
User4.login = "test";
User4.password = "c21f969b5f03d33d43e04f8f136e7682";
User4.group = Group1;
User4.profile = "assets/uploads/images/dev1.jpg";
User4.statut = false;
User4.date_time_logIn = "2018-10-18 11:49:48";
User4.date_time_signIn = "2018-10-15 18:38:01";
User4.gameTag = "@default";
User4.name = "default";
User4.firstName = "default";
User4.birthDate = "2000-01-01";

// ---------- UPLOAD ----------

const Upload1: Upload = new Upload(null);
Upload1.id = 1;
Upload1.name = "default.default";
Upload1.path = "default/defaultdefault.default";
Upload1.uploadDate = "2000-01-01";
Upload1.fileOwner = new User(null);
Upload1.size = 0;
Upload1.extention = ".default";

// ---------- LISTE ----------

export const PAGE: Page[] = [ Page1, Page2, Page3, Page4, Page5, Page6, Page7 ];
export const RIGHTGROUPPAGE: RightGroupPage[] = [ RightGroupPage1, RightGroupPage2, RightGroupPage3 ];
export const GROUP: Group[] = [ Group1, Group2, Group3 ];
export const USER: User[] = [ User1, User2, User3, User4 ];
export const UPLOAD: Upload[] = [ Upload1 ];