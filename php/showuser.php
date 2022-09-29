<?php
  include './config.php';

$dbCon = new mysqli($dbServerName,$dbUserName,$dbPass,$dbName);
  if($dbCon->connect_error){
    die('connection error');
  }else{
    if($_SERVER['REQUEST_METHOD'] == "POST"){
      $id = $_POST['user_id'];
      $postCmd = "SELECT * FROM user_tb WHERE user_id = '$id'";
      $result = $dbCon->query($postCmd);
      if($result->num_rows > 0){
        $userData = $result->fetch_assoc();
        echo json_encode($userData);
      }
    }
  }

?>

