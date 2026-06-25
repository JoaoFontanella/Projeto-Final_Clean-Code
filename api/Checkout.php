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

function insertPedido($db_connection){
    $POST = json_decode(file_get_contents('php://input'), true);

    if(count($POST) >= 1 && $POST['id_usuario'] != ''){
        try {
            //Pegar informacoes do carrinho
            $queryCarrinho = pg_query($db_connection, "SELECT *
                                                       FROM carrinho
                                                       WHERE id_carrinho = {$POST['id_carrinho']}
                                                       AND id_usuario = {$POST['id_usuario']};");
            $retornoCarrinho = pg_fetch_all($queryCarrinho);

            //Inserir as informacoes no Pedido
            $queryInsertPedido = pg_query($db_connection, "INSERT INTO pedidos(id_usuario, valor_total, status, usuario)
                                                       VALUES ({$POST['id_usuario']}, {$retornoCarrinho[0]['valor_total']}, 'Pendente', 'admin')
                                                       RETURNING id_pedido;");
            $retornoInsertPedido = pg_fetch_all($queryInsertPedido);

            //Pegar os itens do carrinho
            $queryCarrinhoItens = pg_query($db_connection, "SELECT *
                                                            FROM itens_carrinho
                                                            WHERE id_carrinho = {$POST['id_carrinho']};");
            $retornoCarrinhoItens = pg_fetch_all($queryCarrinhoItens);

            //Criando os inserts dos pedidos itens
            $sql = "";
            foreach ($retornoCarrinhoItens as $key => $value) {
                $sql .= "INSERT INTO itens_pedido(id_pedido, id_produto, quantidade, preco_unitario, usuario)
                         VALUES ({$retornoInsertPedido[0]['id_pedido']}, {$value['id_produto']}, {$value['quantidade']}, {$value['preco_unitario']}, 'admin'); ";
            }

            $queryItens = pg_query($db_connection, $sql);

            //Update no Status do Carrinho
            pg_query($db_connection, "UPDATE carrinho
                                      SET status = 'Finalizado'
                                      WHERE id_carrinho = {$POST['id_carrinho']};");

            echo json_encode(array('error'=>null, 'id_pedido'=>$retornoInsertPedido[0]['id_pedido']));
        } catch (Exception $e) {
            echo json_encode(array('error'=>$e, 'id_pedido'=>0));
        }
    }
}

?>

