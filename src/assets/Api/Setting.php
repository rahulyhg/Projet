<?php
  require_once "connection.php";
  require_once "SettingClass.php";
  $connection = dbObj::getConnstring();

  class Setting
  {
    public static function getSetting() {
  		global $connection;
  		$res = $connection->query("SELECT * from `Settings`")->fetchAll(PDO::FETCH_CLASS, "Setting");
      $setting = new SettingClass();
      $setting->primary_background_color = $res[0]->value;
      $setting->secondary_background_color = $res[1]->value;
      $setting->primary_font_color = $res[2]->value;
      $setting->secondary_font_color = $res[3]->value;
      $setting->primary_border_color = $res[4]->value;
      $setting->secondary_border_color = $res[5]->value;
      $setting->primary_shadow_color = $res[6]->value;
      $setting->secondary_shadow_color = $res[7]->value;
      $setting->primary_action_color = $res[8]->value;
      $setting->secondary_action_color = $res[9]->value;
      $setting->primary_action_disabled_color = $res[10]->value;
      $setting->secondary_action_disabled_color = $res[11]->value;
      $setting->version = $res[12]->value;
      $setting->primary_load_color = $res[13]->value;
      $setting->secondary_load_color = $res[14]->value;
      $setting->minLengthLogin = $res[15]->value;
      $setting->maxLengthLogin = $res[16]->value;
      $setting->minLengthPassword = $res[17]->value;
      $setting->maxLengthPassword = $res[18]->value;
      $setting->minLengthGameTag = $res[19]->value;
      $setting->maxLengthGameTag = $res[20]->value;
      $setting->minLengthName = $res[21]->value;
      $setting->maxLengthName = $res[22]->value;
      $setting->minLengthFirstName = $res[23]->value;
      $setting->maxLengthFirstName = $res[24]->value;
      $setting->minLengthGroupName = $res[25]->value;
      $setting->maxLengthGroupName = $res[26]->value;
      $setting->minLengthTitle = $res[27]->value;
      $setting->maxLengthTitle = $res[28]->value;
      $setting->minLengthRoute = $res[29]->value;
      $setting->maxLengthRoute = $res[30]->value;
      return $setting;
    }

    // public static function getSettingList() {
    //   global $connection;
    //   return $connection->query("SELECT * from `Settings`")->fetchAll(PDO::FETCH_CLASS, "Setting");
    // }

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

    // public static function deleteSetting($id) {
    //   global $connection;
    //   $connection->query("DELETE FROM `Setting` WHERE `id`='$id'");
    //
    //   return null;
    // }

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
