<?php
$dbUserName = "root";
$dbServerName = "localhost";
$dbPass = "";
$dbName = "final_db"; 

header("Access-Control-Allow-Origin:http://localhost:3000");
  // $dbCon = new mysqli($dbServername,$dbUsername,$dbPass,$dbname);
  // if($dbCon->connect_error){
  //   die('connection error');
  // }else{
  //     $postArray = [];
  //     $postCmd = "SELECT * FROM post_tb";
  //     $result = $dbCon->query($postCmd);
  //     if($result->num_rows > 0){
  //       $postData = $result->fetch_assoc();
  //       while($row = $result->fetch_assoc()){
  //         array_push($postArray,$row);
  //       }

  //       echo json_encode($postArray);
  //     }
  // }
?>


<?php

//&destDir should be like './files/img'
function uploadfile($destDir,$pName){
  $sourceFile = $_FILES[$pName];
  $sourceFileDetails = pathinfo($sourceFile['name']);
  $imgArray = ("_jpg,png,jpeg,gif,tiff,psd,pdf,eps");
  $extension = $sourceFileDetails['extension'];
  if(strpos($imgArray,$extension) !=0 && getimagesize($sourceFile['tmp_name'])){
    if($sourceFile['size']<400000000){
        if(move_uploaded_file($sourceFile['tmp_name'],$destDir.$sourceFile['name'])){
          return 'true';
        }else{
          echo 'Error';
        }
      }
    }
  }

?>
