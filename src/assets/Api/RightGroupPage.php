<?php
  require_once "connection.php";
  $connection = dbObj::getConnstring();

  class RightGroupPage
  {
    public static function getRightGroupPageById($id) {
  		global $connection;
  		$rs = $connection->query("SELECT * from `RightGroupPage` WHERE `id`='$id'")->fetchAll(PDO::FETCH_CLASS, "RightGroupPage");
      return $rs[0];
    }

    public static function getRightGroupPageList() {
      global $connection;
      return $connection->query("SELECT * from `RightGroupPage`")->fetchAll(PDO::FETCH_CLASS, "RightGroupPage");
    }

    public static function putRightGroupPage($id, $json) {
      $ret = null;

      $id_rightGroupPage = $json['id'];
      $name = $json['name'];
      $Main_Access = $json['Main_Access'];
      $Accueil_Access = $json['Accueil_Access'];
      $Login_Access = $json['Login_Access'];
      $User_Access = $json['User_Access'];
      $EditBar_Access = $json['EditBar_Access'];
      $EditBar_Edit = $json['EditBar_Edit'];
      $EditBar_Dev = $json['EditBar_Dev'];
      $SelectedUserManagement_Access = $json['SelectedUserManagement_Access'];
      $SelectedUserManagement_ViewPassword = $json['SelectedUserManagement_ViewPassword'];
      $SelectedUserManagement_ShowPasswordButton = $json['SelectedUserManagement_ShowPasswordButton'];
      $SelectedUserManagement_EditRightGroupPageUser = $json['SelectedUserManagement_EditRightGroupPageUser'];
      $SelectedUserManagement_DeleteUser = $json['SelectedUserManagement_DeleteUser'];
      $SelectedUserManagement_EditUser = $json['SelectedUserManagement_EditUser'];
      $UserManagement_Access = $json['UserManagement_Access'];
      $UserManagement_AddUser = $json['UserManagement_AddUser'];
      $UserManagement_EditDefaultUser = $json['UserManagement_EditDefaultUser'];
      $GroupManagement_Access = $json['GroupManagement_Access'];
      $GroupManagement_AddGroup = $json['GroupManagement_AddGroup'];
      $GroupManagement_EditDefaultGroup = $json['GroupManagement_EditDefaultGroup'];
      $SelectedGroupManagement_Access = $json['SelectedGroupManagement_Access'];
      $SelectedGroupManagement_EditGroup = $json['SelectedGroupManagement_EditGroup'];
      $SelectedGroupManagement_DeleteGroup = $json['SelectedGroupManagement_DeleteGroup'];
      $SelectedGroupManagement_EditRightPage = $json['SelectedGroupManagement_EditRightPage'];
      $SelectedPageManagement_Access = $json['SelectedPageManagement_Access'];
      $SelectedPageManagement_EditPage = $json['SelectedPageManagement_EditPage'];
      $SelectedPageManagement_EditRefresh = $json['SelectedPageManagement_EditRefresh'];
      $SelectedPageManagement_EditRoute = $json['SelectedPageManagement_EditRoute'];
      $SelectedPageManagement_EditNeedLogIn = $json['SelectedPageManagement_EditNeedLogIn'];
      $Settings_Access = $json['Settings_Access'];

      $req = "UPDATE `RightGroupPage` SET `name`='$name', `Main_Access`='$Main_Access', `Accueil_Access`='$Accueil_Access', `Login_Access`='$Login_Access', `User_Access`='$User_Access', `EditBar_Access`='$EditBar_Access', `EditBar_Edit`='$EditBar_Edit', `EditBar_Dev`='$EditBar_Dev', `SelectedUserManagement_Access`='$SelectedUserManagement_Access', `SelectedUserManagement_ViewPassword`='$SelectedUserManagement_ViewPassword', `SelectedUserManagement_ShowPasswordButton`='$SelectedUserManagement_ShowPasswordButton', `SelectedUserManagement_EditRightGroupPageUser`='$SelectedUserManagement_EditRightGroupPageUser', `SelectedUserManagement_DeleteUser`='$SelectedUserManagement_DeleteUser', `SelectedUserManagement_EditUser`='$SelectedUserManagement_EditUser', `UserManagement_Access`='$UserManagement_Access', `UserManagement_AddUser`='$UserManagement_AddUser', `UserManagement_EditDefaultUser`='$UserManagement_EditDefaultUser', `GroupManagement_Access`='$GroupManagement_Access', `GroupManagement_AddGroup`='$GroupManagement_AddGroup', `GroupManagement_EditDefaultGroup`='$GroupManagement_EditDefaultGroup', `SelectedGroupManagement_Access`='$SelectedGroupManagement_Access', `SelectedGroupManagement_EditGroup`='$SelectedGroupManagement_EditGroup', `SelectedGroupManagement_DeleteGroup`='$SelectedGroupManagement_DeleteGroup', `SelectedGroupManagement_EditRightPage`='$SelectedGroupManagement_EditRightPage', `SelectedPageManagement_Access`='$SelectedPageManagement_Access', `SelectedPageManagement_EditPage`='$SelectedPageManagement_EditPage', `SelectedPageManagement_EditRefresh`='$SelectedPageManagement_EditRefresh', `SelectedPageManagement_EditRoute`='$SelectedPageManagement_EditRoute', `SelectedPageManagement_EditNeedLogIn`='$SelectedPageManagement_EditNeedLogIn', `Settings_Access`='$Settings_Access' WHERE `id`='$id'";

      global $connection;
      $connection->query($req);

      return $ret;
    }

    public static function deleteRightGroupPage($id) {
      global $connection;
      $connection->query("DELETE FROM `RightGroupPage` WHERE `id`='$id'");

      return null;
    }

    public static function postRightGroupPage($json) {
      $id = $json['id'];
      $name = $json['name'];
      $Main_Access = $json['Main_Access'];
      $Accueil_Access = $json['Accueil_Access'];
      $Login_Access = $json['Login_Access'];
      $User_Access = $json['User_Access'];
      $EditBar_Access = $json['EditBar_Access'];
      $EditBar_Edit = $json['EditBar_Edit'];
      $EditBar_Dev = $json['EditBar_Dev'];
      $SelectedUserManagement_Access = $json['SelectedUserManagement_Access'];
      $SelectedUserManagement_ViewPassword = $json['SelectedUserManagement_ViewPassword'];
      $SelectedUserManagement_ShowPasswordButton = $json['SelectedUserManagement_ShowPasswordButton'];
      $SelectedUserManagement_EditRightGroupPageUser = $json['SelectedUserManagement_EditRightGroupPageUser'];
      $SelectedUserManagement_DeleteUser = $json['SelectedUserManagement_DeleteUser'];
      $SelectedUserManagement_EditUser = $json['SelectedUserManagement_EditUser'];
      $UserManagement_Access = $json['UserManagement_Access'];
      $UserManagement_AddUser = $json['UserManagement_AddUser'];
      $UserManagement_EditDefaultUser = $json['UserManagement_EditDefaultUser'];
      $GroupManagement_Access = $json['GroupManagement_Access'];
      $GroupManagement_AddGroup = $json['GroupManagement_AddGroup'];
      $GroupManagement_EditDefaultGroup = $json['GroupManagement_EditDefaultGroup'];
      $SelectedGroupManagement_Access = $json['SelectedGroupManagement_Access'];
      $SelectedGroupManagement_EditGroup = $json['SelectedGroupManagement_EditGroup'];
      $SelectedGroupManagement_DeleteGroup = $json['SelectedGroupManagement_DeleteGroup'];
      $SelectedGroupManagement_EditRightPage = $json['SelectedGroupManagement_EditRightPage'];
      $SelectedPageManagement_Access = $json['SelectedPageManagement_Access'];
      $SelectedPageManagement_EditPage = $json['SelectedPageManagement_EditPage'];
      $SelectedPageManagement_EditRefresh = $json['SelectedPageManagement_EditRefresh'];
      $SelectedPageManagement_EditRoute = $json['SelectedPageManagement_EditRoute'];
      $SelectedPageManagement_EditNeedLogIn = $json['SelectedPageManagement_EditNeedLogIn'];
      $Settings_Access = $json['Settings_Access'];

      $ret = null;

      global $connection;
      $connection->query("INSERT INTO `RightGroupPage` (`name`, `Main_Access`, `Accueil_Access`, `Login_Access`, `User_Access`, `EditBar_Access`, `EditBar_Edit`, `EditBar_Dev`, `SelectedUserManagement_Access`, `SelectedUserManagement_ViewPassword`, `SelectedUserManagement_ShowPasswordButton`, `SelectedUserManagement_EditRightGroupPageUser`, `SelectedUserManagement_DeleteUser`, `SelectedUserManagement_EditUser`, `UserManagement_Access`, `UserManagement_AddUser`, `UserManagement_EditDefaultUser`, `GroupManagement_Access`, `GroupManagement_AddGroup`, `GroupManagement_EditDefaultGroup`, `SelectedGroupManagement_Access`, `SelectedGroupManagement_EditGroup`, `SelectedGroupManagement_DeleteGroup`, `SelectedGroupManagement_EditRightPage`, `SelectedPageManagement_Access`, `SelectedPageManagement_EditPage`, `SelectedPageManagement_EditRefresh`, `SelectedPageManagement_EditRoute`, `SelectedPageManagement_EditNeedLogIn`, `Settings_Access`) VALUES ('$name', '$Main_Access', '$Accueil_Access', '$Login_Access', '$User_Access', '$EditBar_Access', '$EditBar_Edit', '$EditBar_Dev', '$SelectedUserManagement_Access', '$SelectedUserManagement_ViewPassword', '$SelectedUserManagement_ShowPasswordButton', '$SelectedUserManagement_EditRightGroupPageUser', '$SelectedUserManagement_DeleteUser', '$SelectedUserManagement_EditUser', '$UserManagement_Access', '$UserManagement_AddUser', '$UserManagement_EditDefaultUser', '$GroupManagement_Access', '$GroupManagement_AddGroup', '$GroupManagement_EditDefaultGroup', '$SelectedGroupManagement_Access', '$SelectedGroupManagement_EditGroup', '$SelectedGroupManagement_DeleteGroup', '$SelectedGroupManagement_EditRightPage', '$SelectedPageManagement_Access', '$SelectedPageManagement_EditPage', '$SelectedPageManagement_EditRefresh', '$SelectedPageManagement_EditRoute', '$SelectedPageManagement_EditNeedLogIn', '$Settings_Access')");

      if($id === 0)
        $ret = $connection->query("SELECT `id` FROM `RightGroupPage` ORDER BY `id` DESC LIMIT 1")->fetchAll()[0]['id'];

      return $ret;
    }
  }
 ?>
