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

function getCategory($db_connection){
    if (isset($_GET['id'])){
        $query = pg_query($db_connection, 
                    "SELECT id_categoria
                          , nome
                          , '/categoria/' || id_categoria AS link
                    FROM categorias
                    WHERE id_categoria = {$_GET['id']}
                    ORDER BY nome ASC");
        $retorno = pg_fetch_all($query);
    } else {
        $query = pg_query($db_connection, 
                        "SELECT id_categoria
                              , nome
                              , '/categoria/' || id_categoria AS link
                        FROM categorias
                        ORDER BY nome ASC");
        $retorno = pg_fetch_all($query);    
    }

    echo json_encode($retorno);
}

?>

