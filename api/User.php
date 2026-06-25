<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
include 'db_connection.php';

$urlParams = explode('/', $_SERVER['REQUEST_URI']);
$functionName = $urlParams[4];
if (strpos($functionName, '?')){
    $functionName = explode('?', $functionName)[0];
    $functionName($db_connection);
} else {
    $functionName($db_connection);
}

function insertAccount($db_connection){
    $POST = json_decode(file_get_contents('php://input'));

    if($POST->email != ''){
        $queryCheck = pg_query($db_connection, 
                        "SELECT count(*) AS check 
                        FROM usuarios
                        WHERE email = '{$POST->email}'");
        $retornoCheck = pg_fetch_all($queryCheck);

        if ($retornoCheck[0]['check'] >= 1){
            echo json_encode(array('error'=>'Este E-mail já está cadastrado em nosso sistema!', 'id_usuario'=>0));
        } else {
            try {
                $query = pg_query($db_connection, 
                        "INSERT INTO usuarios(email, cpf, senha, usuario)
                        VALUES ('$POST->email','','$POST->password', 'admin');");
                $retorno = pg_fetch_all($query);

                $queryId = pg_query($db_connection, 
                        "SELECT id_usuario
                        FROM usuarios
                        WHERE email = '{$POST->email}'");
                $retornoId = pg_fetch_all($queryId);

                echo json_encode(array('error'=>null, 'id_usuario'=>$retornoId[0]['id_usuario']));
            } catch (Exception $e) {
                echo json_encode(array('error'=>$e, 'id_usuario'=>0));
            }
        }
    }
}

function loginAccount($db_connection){
    $POST = json_decode(file_get_contents('php://input'));

    if($POST->email != ''){
        $queryCheck = pg_query($db_connection, 
                        "SELECT id_usuario
                         FROM usuarios
                         WHERE email = '{$POST->email}'
                         AND senha = '{$POST->password}'");
        $retornoCheck = pg_fetch_all($queryCheck);

        if (count($retornoCheck) == 0){
            echo json_encode(array('error'=>'E-mail ou senha incorreta', 'id_usuario'=>0));
        } else {
            echo json_encode(array('error'=>null, 'id_usuario'=>$retornoCheck[0]['id_usuario']));
        }
    }
}

?>

