<?php
    include './config.php';
    header("Access-Control-Allow-Methods: PUT, GET, POST");
    function chk_file($directory){
        if(file_exists($directory)){
            return true;
        }
        return false;
    }
    function chk_file_size($fileSize,$sizeLimit){
        if($fileSize<$sizeLimit){
            return true;
        }
        return false;
    }
    function chk_file_extension($fileType,$typeRange){
        foreach($typeRange as $type){
            if($fileType!=$type){
                continue;
            }
            return true;
        }
        return false;
    }
    function Error_res($status,$error,$errorMsg){
        $response = array(
            "status"=> $status,
            "error"=>$error,
            "message"=>$errorMsg
        );
        header("statusText: $status",true,406);
        return $response;
    }
    function upload_file($tmpAddress,$destAddress){
        if(move_uploaded_file($tmpAddress,$destAddress)){
            return Error_res("success",false,"the file ".basename($destAddress)." has been uploaded.");
        }else{
            return Error_res("error",true,"Sorry, problem when uploading your file. Try again!");
        }
    }
        if($_SERVER["REQUEST_METHOD"]=="POST"){
            //$username = $_POST['username'];
            $username = "test";
            $dest_dir = "./uploads/";
            $userdir = $username."_images";
            $response = array();
            if(!file_exists($dest_dir.$userdir)){
                mkdir($dest_dir.$userdir."/",0777);
            }
            $upload_target = $dest_dir.$userdir."/".strtolower(basename($_FILES['upload']['name']));
            $check = getimagesize($_FILES['upload']['tmp_name']);
            if($check!==false){ 
                if(chk_file($upload_target)){
                    $response = Error_res("error",true,"Sorry, same file has been uploaded. Try another!");
                }elseif(chk_file_size($_FILES['upload']['size'],500000)){
                    $fileType = basename($check['mime']);
                    if(chk_file_extension($fileType,["png","gif","jpg","jpeg"])){
                        $response = upload_file($_FILES['upload']['tmp_name'],$upload_target);
                    }else{
                        $response = Error_res("error",true,"file type is not correct. Try again!");        
                    }
                }else{
                    $response = Error_res("error",true,"file size is bigger than 500KB. Try again!");
                }
            }else{
                $response = Error_res("error",true,"file is not an image. Try again!");
            }
        }
        echo json_encode($response);
    ?>