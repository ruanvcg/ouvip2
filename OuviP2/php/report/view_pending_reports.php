<?php
    // include database connection
    include '../db_connect.php';
    
    // delete message prompt will be here
    
    // select all data
    $query = "SELECT id, tipoReporte, categoria, nome FROM reportes WHERE statusReporte = 'Pendente' ORDER BY id DESC";
    $stmt = $mysqli->prepare($query);
    $stmt->execute();
    
    $result = $stmt->get_result(); // Get the mysqli_result object
    
    $results = [];
    while ($row = $result->fetch_assoc()) {
        $results[] = $row;
    }

    $json = json_encode($results);
    echo $json;
?>
