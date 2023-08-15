<?php
    include_once("db_connect.php");
    
    $postdata = file_get_contents("php://input");
    
    if(isset($postdata) && !empty($postdata))
    {
        $request = json_decode($postdata);
        $nome = trim($request->nome);
        $cpf = mysqli_real_escape_string($mysqli, trim($request->cpf));
        $email = mysqli_real_escape_string($mysqli, trim($request->email));
        $telefone = mysqli_real_escape_string($mysqli, trim($request->telefone));
        $senha = mysqli_real_escape_string($mysqli, trim($request->senha));

        $sql = "INSERT INTO usuarios(
            nome, 
            cpf, 
            email, 
            telefone, 
            senha
        ) VALUES (
            '$nome', 
            '$cpf', 
            '$email', 
            '$telefone', 
            '$senha'
        )";

        if ($mysqli->query($sql)){
            $data = array('message'=>'success');
            echo json_encode($data);
        } else{
            $data = array('message'=>'failed');
            echo json_encode($data);
        }
    }
?>