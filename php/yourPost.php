<?php

// header("Access-Control-Allow-Origin:http://localhost:3000");

    include './config.php';
    $dbCon = new mysqli($dbServerName,$dbUserName,$dbPass,$dbName);
    if($dbCon->connect_error){
      die('connection error');
    }else{
      if($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['sid'])){
        session_id($_POST['sid']);
        session_start();
        $user = $_SESSION['user'];
        $email = $user['email'];
        $logCmd = "SELECT * FROM user_tb WHERE email='$email'";
        $useresult = $dbCon->query($logCmd);
          if($useresult->num_rows > 0){
            $user = $useresult->fetch_assoc();
           }
        $postArray = [];
        $userid = $user['user_id'];
        $postCmd = "SELECT * FROM post_tb WHERE user_id = '$userid'";
        $result = $dbCon->query($postCmd);
        while($row = $result->fetch_assoc()){
          array_push($postArray,$row);
        }
        echo json_encode($postArray);
        $dbCon->close();
    }else{
      $dbCon->close();
      header("status-Text: You haven't logged in",true,401);
      echo "You haven't logged in";
    }
  }
?>