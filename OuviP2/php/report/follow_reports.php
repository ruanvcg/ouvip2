<?php
    // include database connection
    include '../db_connect.php';
    
    // Verifique se o usuário está autenticado e obter o usuarioId a partir da URL
    session_start();
    
    $usuarioId = $_GET['usuarioId']; // Obtenha o valor de usuarioId da URL
    
    if ($usuarioId) {
        // Certifique-se de que o valor de usuarioId seja um número inteiro válido
        if (!is_numeric($usuarioId)) {
            echo json_encode(array('error' => 'ID de usuário inválido.'));
            exit; // Saia do script
        }
        
        // Select data for the specific user
        $query = "SELECT * FROM reportes WHERE usuarioId = ? ORDER BY CASE WHEN statusReporte = 'Pendente' THEN 1 WHEN statusReporte = 'Encaminhado' THEN 2 WHEN statusReporte = 'Concluído' THEN 3
        ELSE 4 END";

        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("i", $usuarioId); // "i" indica que é um inteiro
        $stmt->execute();
    
        $result = $stmt->get_result(); // Get the mysqli_result object
    
        $results = [];
        while ($row = $result->fetch_assoc()) {
            $results[] = $row;
        }
    
        $json = json_encode(array('success' => true, 'data' => $results));
        echo $json;
    } else {
        $json = json_encode(array('error' => 'Usuário não autenticado.'));
        echo $json;
    }
?>
