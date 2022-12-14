<?php
 include './config.php';

 $dbCon = new mysqli($dbServerName,$dbUserName,$dbPass,$dbName);
 if($dbCon->connect_error){
  die('connectioin error');
 }else{
   if($_SERVER['REQUEST_METHOD']=='POST' &&  isset($_POST['sid'])){

    session_id($_POST['sid']);
    session_start();
    $user = $_SESSION['user'];
    $postid = $_POST['postid'];
    $userid = $user['user_id'];
    $date = date("Y-m-d h:m:s");
    $comment = $_POST['comment'];

     $updCmd = "INSERT INTO `comments_tb`( `message`, `user_id`, `p_date`,`post_id`) VALUES ('$comment','$userid','$date','$postid')";
     if($dbCon->query($updCmd)){
      echo 'true';
     }else{
      // header("status-Text: failed",true,401);
      echo $dbCon->error;
     }
   }
 }

?>