<?php
    include_once("db_connect.php");
    
    $postdata = file_get_contents("php://input");
    
    if(isset($postdata) && !empty($postdata))
    {
        $request = json_decode($postdata);
        $email = mysqli_real_escape_string($mysqli, trim($request->email));
        $senha = mysqli_real_escape_string($mysqli, trim($request->senha));

        $sql = "SELECT * FROM usuarios where email='$email' and senha='$senha'";
        $result = mysqli_query($mysqli, $sql);
        $numsUser = mysqli_num_rows($result);

        if($numsUser>0)
        {
            $data = array('message'=>'user success', 'email'=>$email);
            echo json_encode($data);
        }else{
            $sqla = "SELECT * FROM admins where email='$email' and senha='$senha'";
            $result = mysqli_query($mysqli, $sqla);
            $numsAdmin = mysqli_num_rows($result);

            if($numsAdmin>0)
            {
                $data = array('message'=>'admin success', 'email'=>$email);
                echo json_encode($data);
            }else{
                $data = array('message'=>'failed');
                echo json_encode($data);
            }
        }
    }
?>