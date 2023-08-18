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
        $senha = sha1($request->senha);

        // Verificar se já existe um usuário com o mesmo CPF
        $checkCpfSql = "SELECT COUNT(*) AS count FROM usuarios WHERE cpf = ?";
        $checkCpfStmt = $mysqli->prepare($checkCpfSql);
        $checkCpfStmt->bind_param("s", $cpf);
        $checkCpfStmt->execute();
        $checkCpfResult = $checkCpfStmt->get_result();
        $checkCpfRow = $checkCpfResult->fetch_assoc();

        if ($checkCpfRow['count'] > 0) {
            $data = array('message' => 'failed', 'error' => 'CPF already exists');
            echo json_encode($data);
            exit();
        }

        // Verificar se já existe um usuário com o mesmo email
        $checkEmailSql = "SELECT COUNT(*) AS count FROM usuarios WHERE email = ?";
        $checkEmailStmt = $mysqli->prepare($checkEmailSql);
        $checkEmailStmt->bind_param("s", $email);
        $checkEmailStmt->execute();
        $checkEmailResult = $checkEmailStmt->get_result();
        $checkEmailRow = $checkEmailResult->fetch_assoc();

        if ($checkEmailRow['count'] > 0) {
            $data = array('message' => 'failed', 'error' => 'Email already exists');
            echo json_encode($data);
            exit();
        }

        $insertSql = "INSERT INTO usuarios(
            nome, 
            cpf, 
            email, 
            telefone, 
            senha
        ) VALUES (?, ?, ?, ?, ?)";

        $stmt = $mysqli->prepare($insertSql);
        $stmt->bind_param("sssss", $nome, $cpf, $email, $telefone, $senha);

        if ($stmt->execute()){
            $data = array('message' => 'success');
            echo json_encode($data);
        } else{
            $data = array('message' => 'failed');
            echo json_encode($data);
        }

        $stmt->close();
    }    
?>
