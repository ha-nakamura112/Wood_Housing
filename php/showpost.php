<?php
  include './config.php';
  // header("Access-Control-Allow-Origin:http://localhost:3000");

  // if($_SESSION['timeout'] < time()){
  //   header("Location: http://localhost/fproject/pages/loginCon.php");
  // }

  $dbCon = new mysqli($dbServerName,$dbUserName,$dbPass,$dbName);
  if($dbCon->connect_error){
    die('connection error');
  }else{
      $postArray = [];
      $postCmd = "SELECT * FROM post_tb";
      $result = $dbCon->query($postCmd);
      if($result->num_rows > 0){
        $postData = $result->fetch_assoc();
        while($row = $result->fetch_assoc()){
          array_push($postArray,$row);
        }

        echo json_encode($postArray);
      }
  }

?>

