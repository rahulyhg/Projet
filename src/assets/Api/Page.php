<?php
  require_once "connection.php";
  $connection = dbObj::getConnstring();

  class Page
  {
    public static function getPageById($id) {
      global $connection;
      $rs = $connection->query("SELECT * from `Page` WHERE `id`='$id'")->fetchAll(PDO::FETCH_CLASS, "Page");
      if($rs) {
        $rs = $rs[0];
      } else {
        $rs = null;
      }
      return $rs;
    }

    public static function getPageByRoute($route) {
      global $connection;
      return $connection->query("SELECT * from `Page` WHERE `route`='$route'")->fetchAll(PDO::FETCH_CLASS, "Page")[0];
    }

    public static function getPageList() {
      global $connection;
      return $connection->query("SELECT * from `Page`")->fetchAll(PDO::FETCH_CLASS, "Page");
    }

    public static function putPage($id, $json) {
      $title = $json['title'];
      $favicon = $json['favicon'];
      $refresh = $json['refresh'];
      $route = $json['route'];
      $needLogIn = $json['needLogIn'];

      global $connection;
      $connection->query("UPDATE `Page` SET `title`='$title', `favicon`='$favicon', `refresh`='$refresh', `route`='$route', `needLogIn`='$needLogIn' WHERE `id`='$id'");

      return null;
    }

    public static function deletePage($id) {
      global $connection;
      $connection->query("DELETE FROM `Page` WHERE `id`='$id'");

      return null;
    }

    public static function postPage($json) {
      $title = $json['title'];
      $favicon = $json['favicon'];
      $refresh = $json['refresh'];
      $route = $json['route'];
      $needLogIn = $json['needLogIn'];

      global $connection;
      $connection->query("INSERT INTO `Page` (`title`, `favicon`, `refresh`, `route`, `needLogIn`) VALUES ('$title', '$favicon', '$refresh', '$route', '$needLogIn')");

      return null;
    }
  }
 ?>
