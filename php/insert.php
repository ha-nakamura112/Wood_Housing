<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: PUT, GET, POST");
 include './config.php';
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $email = $_POST['email'];
        $pass = $_POST['pass'];
        $dbcon = new mysqli($dbServerName, $dbUserName, $dbPass, $dbName);
        if($dbcon -> connect_error){
            die("Error connection");
        }else{
            $pass = password_hash($_POST['pass'],PASSWORD_BCRYPT,["cost"=>5]); 
            $sql = "INSERT INTO user_tb(firstName,lastName,email,pass)values('$firstName','$lastName','$email','$pass')";
            $result = mysqli_query($dbcon,$sql);
            $resultCheck=mysqli_num_rows($result);
            $dbcon->close();
            if($result){
            $response['data']=array(
                'stuatus'=>'valid'
            );
            echo json_encode($response);
        }
    }}else{
        header("status-Text: bad request",true,400);
    
}
?>