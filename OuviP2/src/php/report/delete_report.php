<?php


include("../db_connect.php"); // Include the database connection script

try {
    // get record ID
    // isset() is a PHP function used to verify if a value is there or not
    $id = isset($_GET['id']) ? $_GET['id'] : die('ERROR: Record ID not found.');

    // delete query
    $query = "DELETE FROM reportes WHERE id = ?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param('i', $id); // 'i' stands for integer

    if ($stmt->execute()) {
        // redirect to read records page and 
        // tell the user record was deleted
        echo json_encode(array('result' => 'success'));
    } else {
        echo json_encode(array('result' => 'fail'));
    }
}

// show error
catch (PDOException $exception) {
    die('ERROR: ' . $exception->getMessage());
}

?>
