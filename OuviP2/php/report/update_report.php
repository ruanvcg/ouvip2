<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header("Content-Type: application/json; charset=UTF-8");

    // Pegar o corpo da solicitação
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    if ($request) {
        include("../db_connect.php"); // Include the database connection script

        try {
            // write update query
            $query = "UPDATE reportes SET statusReporte = ? WHERE id = ?";

            // prepare query for execution
            $stmt = $mysqli->prepare($query);

            // Pegar os valores do JSON
            $id = $request->id;
            $statusReporte = $request->statusReporte;

            // bind the parameters
            $stmt->bind_param('si', $statusReporte, $id);
            // Execute the query
            if ($stmt->execute()) {
                echo json_encode(array('result' => 'success'));
            } else {
                echo json_encode(array('result' => 'fail'));
            }
        }

        // show errors
        catch (PDOException $exception) {
            die('ERROR: ' . $exception->getMessage());
        }
    }

?>
