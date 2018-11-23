<?php
  require_once "connection.php";
  $connection = dbObj::getConnstring();

  class Setting
  {
    public static function getSettingById($id) {
  		global $connection;
  		return $connection->query("SELECT * from `Setting` WHERE `id`='$id'")->fetchAll(PDO::FETCH_CLASS, "Setting")[0];
    }

    public static function getSettingList() {
      global $connection;
      return $connection->query("SELECT * from `Setting`")->fetchAll(PDO::FETCH_CLASS, "Setting");
    }

    // public static function putSetting($id, $json) {
    //   $ret = null;
    //   global $connection;
    //
    //   if($json['id'] === 1) {
    //     $ret = $json['group'];
    //     Group::putGroup(1, $json['group']);
    //   } else {
    //     $setting = Setting::getSettingById($json['id']);
    //
    //     if($json['group']['id'] == $setting->group->id) {
    //       Group::putGroup($json['group']['id'], $json['group']);
    //     } else {
    //       if(count(explode("_", $setting->group->name)) !== 1) {
    //         Group::deleteGroup($setting->group->id);
    //       }
    //       if($json['group']['id'] === 0) {
    //         $json['group']['id'] = Group::postGroup($json['group']);
    //       }
    //     }
    //   }
    //
    //   $login = $json['login'];
    //   $password = $json['password'];
    //   $profile = $json['profile'];
    //   $statut = $json['statut'];
    //   $date_time_signIn = $json['date_time_signIn'];
    //   $date_time_logIn = $json['date_time_logIn'];
    //   $group = $json['group']['id'];
    //   $gameTag = $json['gameTag'];
    //   $name = $json['name'];
    //   $firstName = $json['firstName'];
    //   $birthDate = $json['birthDate'];
    //
    //   $req = "UPDATE `Setting` SET `statut`='$statut', `login`='$login', `password`='$password', `statut`='$statut', `date_time_signIn`='$date_time_signIn', `date_time_logIn`='$date_time_logIn', `group`='$group', `profile`='$profile', `gameTag`='$gameTag', `name`='$name', `firstName`='$firstName', `birthDate`='$birthDate' WHERE `id`='$id'";
    //
    //   $connection->query($req);
    //
    //   return $ret;
    // }

    public static function deleteSetting($id) {
      global $connection;
      $connection->query("DELETE FROM `Setting` WHERE `id`='$id'");

      return null;
    }

    // public static function postSetting($json) {
    //   global $connection;
    //
    //   $login = $json['login'];
    //   $password = $json['password'];
    //   $profile = $json['profile'];
    //   $date_time_signIn = $json['date_time_signIn'];
    //   $date_time_logIn = $json['date_time_logIn'];
    //   $group = $json['group']['id'];
    //   $gameTag = $json['gameTag'];
    //   $name = $json['name'];
    //   $firstName = $json['firstName'];
    //   $birthDate = $json['birthDate'];
    //
    //   $connection->query("INSERT INTO `Setting` (`login`, `password`, `profile`, `date_time_signIn`, `date_time_logIn`, `group`, `gameTag`, `name`, `firstName`, `birthDate`) VALUES ('$login', '$password', '$profile', '$date_time_signIn', '$date_time_logIn', '$group', '$gameTag', '$name', '$firstName', '$birthDate')");
    //
    //   if($json['id'] === 0) {
    //     $id = $connection->query("SELECT `id` FROM `Setting` ORDER BY `id` DESC LIMIT 1")->fetchAll()[0]['id'];
    //     $json['group']['name'] = "_setting_".$id;
    //     $id_group = Group::postGroup($json['group']);
    //     $connection->query("UPDATE `Setting` SET `group`='$id_group' WHERE `id`='$id'");
    //   }
    //
    //   return null;
    // }
  }
 ?>
