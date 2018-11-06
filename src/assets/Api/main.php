<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
  header('Content-type: application/json; charset=utf-8');

  require_once "User.php";
  require_once "Group.php";
  require_once "RightGroupPage.php";
  require_once "Page.php";

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
            if($_GET["param1"] === "Auth")
              returnJson($api, $auth, $ErrorMsg, User::Auth($_GET['param2'], $_GET['param3']));
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
  }

  function returnJson($api, $auth, $ErrorMsg, $data) {
    echo json_encode(array('api' => $api, 'auth' => $auth, 'ErrorMsg' => $ErrorMsg, 'data' => $data));
  }
?>
