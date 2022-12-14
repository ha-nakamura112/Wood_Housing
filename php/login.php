<?php
header("Access-Control-Allow-Origin:http://localhost:3000");

include './config.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        session_start();
        $username = $_POST['uName'];
        $pass = $_POST['pass'];
        $IP = $_POST['gip'];
        $username = filter_var($username,FILTER_SANITIZE_EMAIL);
            if(!filter_var($username,FILTER_VALIDATE_EMAIL)){
                echo "Invalid Email";
            }
            else{
                $dbcon = new mysqli($dbServerName, $dbUserName, $dbPass, $dbName);
                if($dbcon -> connect_error){
                    die("Error connection");
                }else{
                    $selectCmd = "SELECT * FROM user_tb WHERE email='$username';";
                    $result = $dbcon->query($selectCmd);
                    if($result-> num_rows > 0){
                        $user = $result -> fetch_assoc();
                        if(password_verify($pass,$user['pass'])){
                            $date = date("Y-m-d h:m:s");
                            $updateCmd = "UPDATE user_tb SET loginIP = '$IP', loginDate='$date' WHERE email='$username'";
                            $resultUpdate = $dbcon-> query($updateCmd);
                            $dbcon->close();
                            // echo "Login Sucess";
                            $user['git'] = $IP;
                            $_SESSION['user'] = $user;
                            $user['sid'] = session_id();
                            echo json_encode($user);
                            exit();
                        }
                        else{
                            header("status-Text: username/password is wrong",true,401);
                            echo "username/password is wrong";
                        }
                    }
                    else{
                        $dbcon->close();
                        header("status-Text: username/password is wrong",true,401);
                        echo "username/password is wrong";
                    }
                }
            }
        header("status-Text: bad request",true,400);
    }
?>