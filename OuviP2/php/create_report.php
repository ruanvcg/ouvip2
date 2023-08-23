<?php
    include_once("db_connect.php"); // Include the database connection script

    $postdata = file_get_contents("php://input"); // Retrieve data from the request body

    if(isset($postdata) && !empty($postdata))
    {
        // Include here a method to capture data for insert sql:
        $request = json_decode($postdata); // Decode the JSON data from the request

        // Extract data from the request object
        $usuario_id = trim($request->usuario_id);
        $nome = trim($request->nome);
        $cpf = trim($request->cpf);
        $tipo_reporte = trim($request->tipo_reporte);
        $categoria = trim($request->categoria);
        $endereco = trim($request->endereco);
        $numero = trim($request->numero);
        $descricao = trim($request->descricao);
        $status_reporte = trim($request->status_reporte);

        // Insert user data into the 'usuarios' table
        $insertSql = "INSERT INTO usuarios(
            usuario_id, 
            nome, 
            cpf, 
            tipo_reporte, 
            categoria,
            endereco,
            numero,
            descricao,
            status_reporte
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $mysqli->prepare($insertSql);
        $stmt->bind_param("sssssssss", $usuario_id, $nome, $cpf, $tipo_reporte, $categoria, $endereco, $numero, $descricao, $status_reporte);

        if ($stmt->execute()){
            $data = array('message' => 'success');
            echo json_encode($data);
        } else{
            $data = array('message' => 'failed');
            echo json_encode($data);
        }

        $stmt->close(); // Close the prepared statement
    }    
?>
