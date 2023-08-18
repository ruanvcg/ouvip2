<?php
    include_once("db_connect.php");

    $postdata = file_get_contents("php://input");
    
    if(isset($postdata) && !empty($postdata))
    {
        $request = json_decode($postdata);
        $email = mysqli_real_escape_string($mysqli, trim($request->email));
        $senha = mysqli_real_escape_string($mysqli, trim($request->senha));
    
        $sql = "SELECT * FROM usuarios WHERE email=? AND senha=?";
        $stmt = mysqli_prepare($mysqli, $sql);
        mysqli_stmt_bind_param($stmt, "ss", $email, $senha);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
    
        $numsUser = mysqli_num_rows($result);
    
        if($numsUser > 0)
        {
            $data = array('message' => 'user success', 'email' => $email);
            echo json_encode($data);
        }
        else
        {
            $sqla = "SELECT * FROM admins WHERE email=? AND senha=?";
            $stmt = mysqli_prepare($mysqli, $sqla);
            mysqli_stmt_bind_param($stmt, "ss", $email, $senha);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
    
            $numsAdmin = mysqli_num_rows($result);
    
            if($numsAdmin > 0)
            {
                $data = array('message' => 'admin success', 'email' => $email);
                echo json_encode($data);
            }
            else
            {
                $data = array('message' => 'failed');
                echo json_encode($data);
            }
        }
    }
    
?>