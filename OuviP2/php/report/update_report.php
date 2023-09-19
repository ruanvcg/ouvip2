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
        // Primeiro, obtenha o endereço de e-mail do destinatário com base no ID
        $querySelect = "SELECT email FROM reportes WHERE id = ?";
        $stmtSelect = $mysqli->prepare($querySelect);
        $stmtSelect->bind_param('i', $request->id);
        $stmtSelect->execute();
        $stmtSelect->bind_result($destinatario);
        $stmtSelect->fetch();
        $stmtSelect->close();

        if (!$destinatario) {
            // O destinatário não foi encontrado
            echo json_encode(array('result' => 'fail', 'message' => 'Destinatário não encontrado'));
        } else {
            // O destinatário foi encontrado, continue com a atualização do status e envio de e-mail
            // write update query
            $queryUpdate = "UPDATE reportes SET statusReporte = ? WHERE id = ?";
            $stmtUpdate = $mysqli->prepare($queryUpdate);
            $stmtUpdate->bind_param('si', $request->statusReporte, $request->id);
            
            // Execute a atualização do status
            if ($stmtUpdate->execute()) {
                // Aqui, após o sucesso, você pode enviar o e-mail
                $assunto = "Status do Relatório Atualizado";
                $mensagem = "O status do seu reporte foi atualizado para: " . $request->statusReporte;
                $remetente = "ruanvictorp22111@gmail.com"; // Substitua pelo seu endereço de e-mail

                if (mail($destinatario, $assunto, $mensagem, "From: $remetente")) {
                    echo json_encode(array('result' => 'success'));
                } else {
                    echo json_encode(array('result' => 'fail', 'message' => 'Falha ao enviar e-mail'));
                }
            } else {
                echo json_encode(array('result' => 'fail', 'message' => 'Falha na atualização do status'));
            }

            $stmtUpdate->close();
        }
    }

    // show errors
    catch (PDOException $exception) {
        die('ERROR: ' . $exception->getMessage());
    }
}
?>
