<?php
  require_once "connection.php";
  $connection = dbObj::getConnstring();

  class User
  {
    public static function getUserById($id) {
  		global $connection;
  		$rs = $connection->query("SELECT * from `User` WHERE `id`='$id'")->fetchAll(PDO::FETCH_CLASS, "User");
      if($rs) {
        $rs = $rs[0];
        $rs->group = Group::getGroupById($rs->group);
      } else {
        $rs = null;
      }
      return $rs;
    }

    public static function Auth($login, $password) {
      global $connection;
      $rs[0] = $connection->query("SELECT * from `User` WHERE `login`='$login' AND `password`='$password'")->fetchAll(PDO::FETCH_CLASS, "User");
      if($rs[0]) {
        $result[0] = $rs[0][0];
        $result[0]->group = Group::getGroupById($result[0]->group);
        User::logIn($result[0]->id);
        $result[1] = null;
      } else {
        $login_ok = "0";
        $password_ok = "0";

        $rs = $connection->query("SELECT * from `User` WHERE `login`='$login'")->fetchAll(PDO::FETCH_CLASS, "User");
        if($rs) {
          $login_ok = "1";
        } else {
          $rs = $connection->query("SELECT * from `User` WHERE `password`='$password'")->fetchAll(PDO::FETCH_CLASS, "User");
          if($rs) {
            $password_ok = "1";
          }
        }

        $result[0] = null;

        if($login_ok == true && $password_ok == false) {
          $result[1] = 2;
        }
        if($login_ok == false && $password_ok == true) {
          $result[1] = 1;
        }
        if($login_ok == false && $password_ok == false) {
          $result[1] = 3;
        }
      }

      return $result;
    }

    public static function logIn($id) {
      global $connection;
      $connection->query("UPDATE `User` SET `statut`='1' WHERE `id`='$id'");
    }

    public static function getUserList() {
      global $connection;
      $rs = $connection->query("SELECT * from `User`")->fetchAll(PDO::FETCH_CLASS, "User");
      for($i = 0; $i < count($rs); $i++) {
        $rs[$i]->group = Group::getGroupById($rs[$i]->group);
      }
      return $rs;
    }

    public static function putUser($id, $json) {
      $ret = null;
      global $connection;

      if($json['id'] === 1) {
        $ret = $json['group'];
        Group::putGroup(1, $json['group']);
      } else {
        $user = User::getUserById($json['id']);

        if($json['group']['id'] == $user->group->id) {
          Group::putGroup($json['group']['id'], $json['group']);
        } else {
          if(count(explode("_", $user->group->name)) !== 1) {
            Group::deleteGroup($user->group->id);
          }
          if($json['group']['id'] === 0) {
            $json['group']['id'] = Group::postGroup($json['group']);
          }
        }
      }

      $login = $json['login'];
      $password = $json['password'];
      $profile = $json['profile'];
      $statut = $json['statut'];
      $date_time_signIn = $json['date_time_signIn'];
      $date_time_logIn = $json['date_time_logIn'];
      $group = $json['group']['id'];
      $gameTag = $json['gameTag'];
      $name = $json['name'];
      $firstName = $json['firstName'];
      $birthDate = $json['birthDate'];

      $req = "UPDATE `User` SET `statut`='$statut', `login`='$login', `password`='$password', `statut`='$statut', `date_time_signIn`='$date_time_signIn', `date_time_logIn`='$date_time_logIn', `group`='$group', `profile`='$profile', `gameTag`='$gameTag', `name`='$name', `firstName`='$firstName', `birthDate`='$birthDate' WHERE `id`='$id'";

      $connection->query($req);

      return $ret;
    }

    public static function deleteUser($id) {
      $ret = null;
      $user = User::getUserById($id);

      if(count(explode("_", $user->group->name)) > 1) {
        Group::deleteGroup($user->group->id);
      }

      global $connection;
      $connection->query("DELETE FROM `User` WHERE `id`='$id'");

      return $ret;
    }

    public static function postUser($json) {
      global $connection;

      $login = $json['login'];
      $password = $json['password'];
      $profile = $json['profile'];
      $statut = $json['statut'];
      $date_time_signIn = $json['date_time_signIn'];
      $date_time_logIn = $json['date_time_logIn'];
      $group = $json['group']['id'];
      $gameTag = $json['gameTag'];
      $name = $json['name'];
      $firstName = $json['firstName'];
      $birthDate = $json['birthDate'];
      $token = bin2hex(random_bytes(100));

      $connection->query("INSERT INTO `User` (`login`, `password`, `profile`, `statut`, `date_time_signIn`, `date_time_logIn`, `group`, `gameTag`, `name`, `firstName`, `birthDate`, `token`) VALUES ('$login', '$password', '$profile', '$statut', '$date_time_signIn', '$date_time_logIn', '$group', '$gameTag', '$name', '$firstName', '$birthDate', '$token')");

      if($json['group']['id'] === 0) {
        $id = $connection->query("SELECT `id` FROM `User` ORDER BY `id` DESC LIMIT 1")->fetchAll()[0]['id'];
        $json['group']['name'] = "_user_".$id;
        $id_group = Group::postGroup($json['group']);
        $connection->query("UPDATE `User` SET `group`='$id_group' WHERE `id`='$id'");
      }

      return null;
    }
  }
 ?>
