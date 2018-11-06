<?php
  require_once "connection.php";
  $connection = dbObj::getConnstring();

  class Group
  {
    public static function getGroupById($id) {
  		global $connection;
  		$rs = $connection->query("SELECT * from `Group` WHERE `id`='$id'")->fetchAll(PDO::FETCH_CLASS, "Group")[0];
      $rs->rightGroupPage = RightGroupPage::getRightGroupPageById($rs->rightGroupPage);

      return $rs;
    }

    public static function getGroupList() {
      global $connection;
      $rs = $connection->query("SELECT * from `Group`")->fetchAll(PDO::FETCH_CLASS, "Group");
      for($i = 0; $i < count($rs); $i++) {
        $rs[$i]->rightGroupPage = RightGroupPage::getRightGroupPageById($rs[$i]->rightGroupPage);
      }
      return $rs;
    }

    public static function putGroup($id, $json) {
      $ret = null;

      $name = $json['name'];
      $rightGroupPage = $json['rightGroupPage']['id'];

      RightGroupPage::putRightGroupPage($json['rightGroupPage']['id'], $json['rightGroupPage']);

      global $connection;
      $connection->query("UPDATE `Group` SET `name`='$name', `rightGroupPage`='$rightGroupPage' WHERE `id`='$id'");

      return $json;
    }

    public static function deleteGroup($id) {
      global $connection;

      RightGroupPage::deleteRightGroupPage(Group::getGroupById($id)->rightGroupPage->id);
      $connection->query("DELETE FROM `Group` WHERE `id`='$id'");
      $connection->query("UPDATE `User` SET `group`='1' WHERE `group`='$id'");

      return null;
    }

    public static function postGroup($json) {
      $ret = null;
      global $connection;

      if($json['id'] === 0) {
        $json['rightGroupPage']['name'] = $json['name'];
        $json['rightGroupPage']['id'] = RightGroupPage::postRightGroupPage($json['rightGroupPage']);
      }

      $id = $json['id'];
      $name = $json['name'];
      $rightGroupPage = $json['rightGroupPage']['id'];

      $connection->query("INSERT INTO `Group` (`name`, `rightGroupPage`) VALUES ('$name', '$rightGroupPage')");

      if($json['id'] === 0) {
        $ret = $connection->query("SELECT `id` FROM `Group` ORDER BY `id` DESC LIMIT 1")->fetchAll()[0]['id'];
      }

      return $ret;
    }
  }
 ?>
