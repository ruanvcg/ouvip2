<?php
    include_once("db_connect.php"); // Include the database connection script

    $postdata = file_get_contents("php://input"); // Retrieve data from the request body
    
    if(isset($postdata) && !empty($postdata))
    {
        $request = json_decode($postdata); // Decode the JSON data from the request
        $email = mysqli_real_escape_string($mysqli, trim($request->email)); // Sanitize and extract email
        $senha = sha1(mysqli_real_escape_string($mysqli, trim($request->senha))); // Sanitize and encrypt password
    
        // SQL query to check if the user's email and password exist in the 'usuarios' table
        $sql = "SELECT * FROM usuarios WHERE email=? AND senha=?";

        $stmt = mysqli_prepare($mysqli, $sql); // Prepare the statement
        mysqli_stmt_bind_param($stmt, "ss", $email, $senha); // Bind parameters
        mysqli_stmt_execute($stmt); // Execute the statement

        $result = mysqli_stmt_get_result($stmt); // Get the result
        $numsUser = mysqli_num_rows($result); // Count the number of rows in the result
    
        if($numsUser > 0)
        {
            $userRow = mysqli_fetch_assoc($result); // Fetch the user data
            $data = array(
                'message' => 'user success',
                'email' => $email,
                'telefone' => $userRow['telefone'],
                'id' => $userRow['usuarioId'],
                'nome' => $userRow['nome'], // Assuming 'nome' is the field name for the name
                'cpf' => $userRow['cpf'] // Assuming 'cpf' is the field name for the CPF
            );
            echo json_encode($data); // Send JSON response
        }
        else
        {
            // If user login fails, check if the email and password exist in the 'admins' table
            $sqla = "SELECT * FROM admins WHERE email=? AND senha=?";

            $stmt = mysqli_prepare($mysqli, $sqla);
            mysqli_stmt_bind_param($stmt, "ss", $email, $senha);
            mysqli_stmt_execute($stmt);

            $result = mysqli_stmt_get_result($stmt);
            $numsAdmin = mysqli_num_rows($result); // Count the number of rows in the result
    
            if($numsAdmin > 0)
            {
                $data = array('message' => 'admin success', 'email' => $email); // Admin login success response
                echo json_encode($data); // Send JSON response
            }
            else
            {
                $data = array('message' => 'failed'); // Both user and admin login failed response
                echo json_encode($data); // Send JSON response
            }
        }
    }
?>
