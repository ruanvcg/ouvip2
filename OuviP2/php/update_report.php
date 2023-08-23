<?php

    // check if form was submitted
    if($_POST){
        include 'db_connect.php';

        try{
            // write update query
            // in this case, it seemed like we have so many fields to pass and 
            // it is better to label them and not use question marks
            $query = "UPDATE reportes 
                        SET status_reporte=:status_reporte 
                        WHERE id = :id";
    
            // prepare query for excecution
            $stmt = $mysqli->prepare($query);
    
            // posted values
            $id = $_POST['id'];
            $status_reporte = $_POST['status_reporte'];
    
            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':status_reporte', $status_reporte);
            
            // Execute the query
            if($stmt->execute()){
                echo json_encode(array('result'=>'success'));
            }else{
                echo json_encode(array('result'=>'fail'));
            }
            
        }
        
        // show errors
        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }
?>