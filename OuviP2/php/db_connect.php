<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header("Content-Type: application/json; charset=UTF-8");
    use Dotenv\Dotenv as Dotenv;
    $config = include('config.php');


    $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
    //Credentials
    $db_host = $_ENV['HOST'];
    $db_username = $_ENV['USER'];
    $db_password = $_ENV['PASS'];
    $db_name = $_ENV['NAME'];

    //Connection
    $mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
    if($mysqli->connect_error){
        die('Error: ('. $mysqli->connect_errno . ') ' . $mysqli->connect_error);
    }
?>