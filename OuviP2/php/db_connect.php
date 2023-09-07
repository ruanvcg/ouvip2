<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header("Content-Type: application/json; charset=UTF-8");


    // Credentials
    $db_host = 'mysql-ruan.alwaysdata.net';
    $db_username = 'ruan';
    $db_password = 'tccruanouvip22023';
    $db_name = 'ruan_ouvidb';

    //Connection
    $mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
    if($mysqli->connect_error){
        die('Error: ('. $mysqli->connect_errno . ') ' . $mysqli->connect_error);
    }
?>