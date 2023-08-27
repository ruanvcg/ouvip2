<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header("Content-Type: application/json; charset=UTF-8");
    include("../db_connect.php"); // Include the database connection script

    $postdata = file_get_contents("php://input"); // Retrieve data from the request body

    if(isset($postdata) && !empty($postdata))
    {
        // Include here a method to capture data for insert sql:
        $request = json_decode($postdata); // Decode the JSON data from the request

        // Extract data from the request object
        $usuarioId = trim($request->usuarioId);
        $nome = trim($request->nome);
        $cpf = trim($request->cpf);
        $tipoReporte = trim($request->tipoReporte);
        $categoria = trim($request->categoria);
        $endereco = trim($request->endereco);
        $numero = trim($request->numero);
        $descricao = trim($request->descricao);
        $statusReporte = trim($request->statusReporte);

        // Depois de obter os dados do postdata
        error_log("Dados do postdata: " . json_encode($request));

        // Teste de Conexão
        if ($mysqli->connect_error) {
            die("Erro na conexão: " . $mysqli->connect_error);
        }

        // Insert user data into the 'reportes' table
        $insertSql = "INSERT INTO reportes(
            usuarioId, 
            nome, 
            cpf, 
            tipoReporte, 
            categoria,
            endereco,
            numero,
            descricao,
            statusReporte
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        // Antes de preparar e executar a declaração SQL
        error_log("Preparando e executando a declaração SQL...");

        $stmt = $mysqli->prepare($insertSql);
        if (!$stmt) {
            die("Erro na preparação da declaração SQL: " . $mysqli->error);
        }

        $stmt->bind_param("isssssiss", $usuarioId, $nome, $cpf, $tipoReporte, $categoria, $endereco, $numero, $descricao, $statusReporte);

        // Após a execução da declaração SQL
        error_log("Execução da declaração SQL concluída.");

        if ($stmt->execute()){
            $data = array('message' => 'success');
            echo json_encode($data);
        } else{
            $data = array('message' => 'failed');
            echo json_encode($data);
        }
        error_log("Dados recebidos: " . json_encode($request));

        $stmt->close(); // Close the prepared statement
        $mysqli->close(); // Close the database connection
    }    
?>
