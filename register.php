<?php
    include_once("db_connect.php");

    $postdata = file_get_contents("php://input");
    
    if(isset($postdata) && !empty($postdata))
    {
        $request = json_decode($postdata);
        $nome = trim($request->nome);
        $cpf = trim($request->cpf);
        $email = trim($request->email);
        $telefone = trim($request->telefone);
        $senha = trim($request->senha);
    
        $sql = "INSERT INTO usuarios(
            nome, 
            cpf, 
            email, 
            telefone, 
            senha
        ) VALUES (?, ?, ?, ?, ?)";
    
        $stmt = $mysqli->prepare($sql);
        $stmt->bind_param("sssss", $nome, $cpf, $email, $telefone, $senha);
    
        if ($stmt->execute()){
            $data = array('message'=>'success');
            echo json_encode($data);
        } else{
            $data = array('message'=>'failed');
            echo json_encode($data);
        }
    
        $stmt->close();
    }
    
?>