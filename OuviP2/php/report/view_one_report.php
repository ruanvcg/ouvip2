<?php

    $id = isset($_GET['id']) ? $_GET['id'] : die('ERROR: Record ID not found.');

    // Include the database connection
    include '../db_connect.php';

    // Read current record's data
    try {
        // Prepare select query
        $query = "SELECT id, nome, cpf, tipo_reporte, categoria, endereco, numero, descricao, status_reporte, data_reporte FROM reportes WHERE id = ? LIMIT 0,1";
        $stmt = $mysqli->prepare($query);

        // This is the first question mark
        $stmt->bind_param("i", $id); // 'i' stands for integer

        // Execute the query
        $stmt->execute();

        // Get the result
        $result = $stmt->get_result();
        
        // Fetch the row
        $row = $result->fetch_assoc();
        
        // Encode as JSON and echo
        $json = json_encode($row);
        echo $json;
    } catch (mysqli_sql_exception $exception) {
        die('ERROR: ' . $exception->getMessage());
    }
?>
