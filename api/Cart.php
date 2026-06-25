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

function insertProducts($db_connection){
    $POST = json_decode(file_get_contents('php://input'), true);

    if(count($POST) >= 1 && $POST['id_usuario'] != ''){
        try {
            $queryCarrinho = pg_query($db_connection, "INSERT INTO carrinho(id_usuario, valor_total, status, usuario)
                                                       VALUES ({$POST['id_usuario']}, {$POST['total']}, 'Aberto', 'admin')
                                                       RETURNING id_carrinho;");
            $retornoCarrinho = pg_fetch_all($queryCarrinho);

            $sql = "";
            foreach ($POST['post'] as $key => $value) {
                $sql .= "INSERT INTO itens_carrinho(id_carrinho, id_produto, quantidade, usuario, preco_unitario)
                         VALUES ({$retornoCarrinho[0]['id_carrinho']}, {$value['id']}, {$value['quantity']}, 'admin', {$value['price']}); ";
            }

            $queryItens = pg_query($db_connection, $sql);
            echo json_encode(array('error'=>null, 'id_carrinho'=>$retornoCarrinho[0]['id_carrinho']));
        } catch (Exception $e) {
            echo json_encode(array('error'=>$e, 'id_carrinho'=>0));
        }
    }
}

function deleteProduct($db_connection){
    $POST = json_decode(file_get_contents('php://input'), true);

    if(count($POST) >= 1 && $POST['productId'] != ''){
        try {
            $queryItensCarrinho = pg_query($db_connection, "SELECT *
                                                                 , (SELECT carrinho.valor_total
                                                                    FROM carrinho
                                                                    WHERE carrinho.id_carrinho = itens_carrinho.id_carrinho) AS vl_total
                                                            FROM itens_carrinho
                                                            WHERE id_carrinho = {$POST['id_carrinho']}");
            $retornoItensCarrinho = pg_fetch_all($queryItensCarrinho);

            $totalNovo = 0;
            foreach ($retornoItensCarrinho as $key => $value) {
                if($value['quantidade'] > 1 && $value['id_produto'] == $POST['productId']){
                    $quantidadeNova = $value['quantidade'] - 1;
                    $valorTotalNovo = $value['vl_total'] - $value['preco_unitario'];

                    pg_query($db_connection, "UPDATE itens_carrinho
                                              SET quantidade = {$quantidadeNova}
                                              WHERE id_carrinho = {$POST['id_carrinho']}
                                              AND id_produto = {$POST['productId']};");
                    
                    pg_query($db_connection, "UPDATE carrinho
                                              SET valor_total = {$valorTotalNovo}
                                              WHERE id_carrinho = {$POST['id_carrinho']};");

                } else if ($value['quantidade'] == 1 && $value['id_produto'] == $POST['productId']) {
                    pg_query($db_connection, "DELETE FROM itens_carrinho
                                              WHERE id_carrinho = {$POST['id_carrinho']}
                                              AND id_produto = {$POST['productId']}");

                    $queryDeleteCarrinho = pg_query($db_connection, "SELECT count(*) AS check
                                                    FROM itens_carrinho
                                                    WHERE id_carrinho = {$POST['id_carrinho']}");
                    $retornoDeleteCarrinho = pg_fetch_all($queryDeleteCarrinho);

                    if($retornoDeleteCarrinho[0]['check'] == 0) {
                        pg_query($db_connection, "DELETE FROM carrinho
                                                  WHERE id_carrinho = {$POST['id_carrinho']}");
                    }
                }
            }

            echo json_encode(array('error'=>null));
        } catch (Exception $e) {
            echo json_encode(array('error'=>$e));
        }
    }
}

?>

