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

function getProdutos($db_connection){
    $where = '';

    if (isset($_GET['id'])) {
        $where = "WHERE p.id_produto = {$_GET['id']}";
    } else if (isset($_GET['search'])) {
        $search = pg_escape_string($db_connection, $_GET['search']);
        $where = "WHERE LOWER(p.nome) LIKE LOWER('%{$search}%')";
    }

    $query = pg_query($db_connection, 
        "SELECT 
            p.id_produto AS id,
            '../' || p.imagem AS image,
            p.nome AS title,
            p.preco_venda AS description,
            p.descricao AS descricao_produto,
            p.ingredientes,
            p.gramas,
            c.nome AS categoria
        FROM produtos p
        LEFT JOIN categorias c ON c.id_categoria = p.id_categoria
        $where
        ORDER BY p.nome ASC"
    );

    $retorno = pg_fetch_all($query);

    foreach ($retorno as $key => $value) {
        $retorno[$key]['description'] = 'R$ '.str_replace('.', ',', $value['description']);
    }

    echo json_encode($retorno);
}

function getCategoryProdutos($db_connection){
    $query = pg_query($db_connection, 
                "SELECT a.id_produto AS id
                      , '../' || a.imagem AS image
                      , a.nome AS title
                      , a.preco_venda AS description
                      , a.descricao AS descricao_produto
                      , b.nome AS nome_categoria
                FROM produtos AS a
                LEFT JOIN categorias AS b ON b.id_categoria = a.id_categoria
                WHERE a.id_categoria = {$_GET['id']}
                ORDER BY a.nome ASC");
    $retorno = pg_fetch_all($query);

    foreach ($retorno as $key => $value) {
        $retorno[$key]['description'] = 'R$ '.str_replace('.', ',', $value['description']);
    }

    echo json_encode($retorno);
}

?>

