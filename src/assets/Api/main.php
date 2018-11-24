<?php
  require_once "User.php";
  require_once "Group.php";
  require_once "RightGroupPage.php";
  require_once "Page.php";
  require_once "Setting.php";

  header('Access-Control-Allow-Headers: Content-Type, Authorization');
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
  header('Content-type: application/json; charset=utf-8');

  $header = apache_request_headers();
  if(isset($header['Authorization'])) {
    $token = Auth_Api($header['Authorization']);

  } else
    $token = null;

  $api = false;
  $auth = false;
  $ErrorMsg = null;

  $server = $_SERVER;
  if(isset($server['HTTP_ORIGIN']))
    $origin = $server['HTTP_ORIGIN'];
  else
    $origin = null;

  header('Access-Control-Allow-Origin: ' . $origin);

  if (in_array($origin, ['https://projet.kevin-c.fr', 'http://localhost:4200']) && $token !== null) {
    $request_method=$_SERVER["REQUEST_METHOD"];

    $api = true;
    $auth = true;
    $ErrorMsg = null;

    switch($_GET['page']) {
      case 'User':
        switch($request_method) {
          case 'GET':
            if(!empty($_GET["param1"]))
            {
              if(empty($_GET['param2']) && empty($_GET['param3']))
                returnJson($api, $auth, $ErrorMsg, User::getUserById($_GET["param1"]));
              if($_GET["param1"] === "Auth") {
                $result = User::Auth($_GET['param2'], $_GET['param3']);
                returnJson($api, $auth, $result[1], $result[0]);
              }
            } else
              returnJson($api, $auth, $ErrorMsg, User::getUserList());
            break;
          case 'PUT':
            $json = json_decode(file_get_contents("php://input"), true);
            if(!empty($_GET["param1"]))
            {
              if(empty($_GET['param2']) && empty($_GET['param3']))
                returnJson($api, $auth, $ErrorMsg, User::putUser($_GET["param1"], $json));
            }
            break;
          case "DELETE":
            if(!empty($_GET["param1"])) {
              if(empty($_GET['param2']) && empty($_GET['param3']))
                returnJson($api, $auth, $ErrorMsg, User::deleteUser($_GET["param1"]));
            }
            break;
          case 'POST':
            $json = json_decode(file_get_contents("php://input"), true);
            if(empty($_GET["param1"]))
              returnJson($api, $auth, $ErrorMsg, User::postUser($json));
            break;
        }
        break;
      case 'Group':
        switch($request_method) {
      		case 'GET':
      			if(!empty($_GET["param1"]))
      			{
              if(empty($_GET['param2']) && empty($_GET['param3']))
                returnJson($api, $auth, $ErrorMsg, Group::getGroupById($_GET["param1"]));
      			} else
              returnJson($api, $auth, $ErrorMsg, Group::getGroupList());
      			break;
      		case 'PUT':
            $json = json_decode(file_get_contents("php://input"), true);
      			if(!empty($_GET["param1"]))
      			{
              if(empty($_GET['param2']) && empty($_GET['param3']))
                returnJson($api, $auth, $ErrorMsg, Group::putGroup($_GET["param1"], $json));
      			}
      			break;
          case "DELETE":
            if(!empty($_GET["param1"])) {
              if(empty($_GET['param2']) && empty($_GET['param3']))
                returnJson($api, $auth, $ErrorMsg, Group::deleteGroup($_GET["param1"]));
            }
            break;
          case 'POST':
            $json = json_decode(file_get_contents("php://input"), true);
            if(empty($_GET["param1"]))
              returnJson($api, $auth, $ErrorMsg, Group::postGroup($json));
            break;
      	}
        break;
      case "RightGroupPage":
        switch($request_method) {
          case 'GET':
            if(!empty($_GET["param1"]))
            {
              if(empty($_GET['param2']) && empty($_GET['param3']))
                returnJson($api, $auth, $ErrorMsg, RightGroupPage::getRightGroupPageById($_GET["param1"]));
            }
            else
              returnJson($api, $auth, $ErrorMsg, RightGroupPage::getRightGroupPageList());
            break;
          case 'PUT':
            $json = json_decode(file_get_contents("php://input"), true);
            if(!empty($_GET["param1"]))
            {
              if(empty($_GET['param2']) && empty($_GET['param3']))
                returnJson($api, $auth, $ErrorMsg, RightGroupPage::putRightGroupPage($_GET["param1"], $json));
            }
            break;
          case "DELETE":
            if(!empty($_GET["param1"])) {
              if(empty($_GET['param2']) && empty($_GET['param3']))
                returnJson($api, $auth, $ErrorMsg, RightGroupPage::deleteRightGroupPage($_GET["param1"]));
            }
            break;
          case 'POST':
            $json = json_decode(file_get_contents("php://input"), true);
            if(empty($_GET["param1"]))
              returnJson($api, $auth, $ErrorMsg, RightGroupPage::postRightGroupPage($json));
            break;
        }
        break;
      case 'Page':
        switch($request_method) {
          case 'GET':
            if(!empty($_GET["param1"]))
            {
              if(empty($_GET['param2']) && empty($_GET['param3']))
                returnJson($api, $auth, $ErrorMsg, Page::getPageById($_GET["param1"]));
              if($_GET["param1"] === "Route") {
                if($_GET['param2'] === "*")
                  returnJson($api, $auth, $ErrorMsg, Page::getPageByRoute("/"));
                else
                  returnJson($api, $auth, $ErrorMsg, Page::getPageByRoute("/".$_GET['param2']));
              }
            } else
              returnJson($api, $auth, $ErrorMsg, Page::getPageList());
            break;
          case 'PUT':
            $json = json_decode(file_get_contents("php://input"), true);
            if(!empty($_GET["param1"]))
            {
              if(empty($_GET['param2']) && empty($_GET['param3']))
                returnJson($api, $auth, $ErrorMsg, Page::putPage($_GET["param1"], $json));
            }
            break;
          case "DELETE":
            if(!empty($_GET["param1"])) {
              if(empty($_GET['param2']) && empty($_GET['param3']))
                returnJson($api, $auth, $ErrorMsg, Page::deletePage($_GET["param1"]));
            }
            break;
          case 'POST':
            $json = json_decode(file_get_contents("php://input"), true);
            if(empty($_GET["param1"]))
              returnJson($api, $auth, $ErrorMsg, Page::postPage($json));
            break;
        }
        break;
      case 'Setting':
        switch($request_method) {
          case 'GET':
            if(!empty($_GET["param1"]))
            {
              if(empty($_GET['param2']) && empty($_GET['param3']))
                returnJson($api, $auth, $ErrorMsg, Setting::getSettingByName($_GET["param1"]));
            } else
              returnJson($api, $auth, $ErrorMsg, Setting::getSetting());
            break;
          case 'PUT':
            $json = json_decode(file_get_contents("php://input"), true);
            if(!empty($_GET["param1"]))
            {
              if(empty($_GET['param2']) && empty($_GET['param3']))
                returnJson($api, $auth, $ErrorMsg, Setting::putSetting($_GET["param1"], $json));
            }
            break;
          case "DELETE":
            if(!empty($_GET["param1"])) {
              if(empty($_GET['param2']) && empty($_GET['param3']))
                returnJson($api, $auth, $ErrorMsg, Setting::deleteSetting($_GET["param1"]));
            }
            break;
          case 'POST':
            $json = json_decode(file_get_contents("php://input"), true);
            if(empty($_GET["param1"]))
              returnJson($api, $auth, $ErrorMsg, Setting::postSetting($json));
            break;
        }
        break;
      case 'Test':
        switch($request_method) {
          case 'GET':
            returnJson($api, $auth, $ErrorMsg, "ok");
            break;
        }
        break;
    }
  } else
    returnJson($api, $auth, $ErrorMsg, "Access Denied !");

  function Auth_Api($token) {
    require_once "connection.php";
    $connection = dbObj::getConnstring();
    $rs = $connection->query("SELECT * from `User` WHERE `token`='$token'")->fetchAll(PDO::FETCH_CLASS, "User");
    if($rs) {
      $rs = $rs[0];
      $rs->group = Group::getGroupById($rs->group);
    } else
      $rs = null;
    return $rs;
  }

  function returnJson($api, $auth, $ErrorMsg, $data) {
    echo json_encode(array('api' => $api, 'auth' => $auth, 'ErrorMsg' => $ErrorMsg, 'data' => $data));
  }
?>
