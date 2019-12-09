<?php

 header('Access-Control-Allow-Origin: *');
 header('Access-Control-Allow-Credentials: true');
 header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
 header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
 header('Content-Type: application/json, charset=UTF-8');

 include "library/config.php";

 $postJson = json_decode(file_get_contents('php://input'), true);
 $hoje = date('Y-m-d');

 if($postJson['acao']=='add'){

    $query = mysqli_query($mysqli, "INSERT INTO usuarios SET
                            nomeUsuario = '$postJson[nomeUsuario]',
                            descricaoUsuario = '$postJson[descricaoUsuario]',
                            criado_em = '$hoje'");
    
    $idUsuario = mysqli_insert_id($mysqli);

    if($query)
        $result = json_encode(array('success' => true, 'id_usuario' => $idUsuario));
    else $result = json_encode(array('success' => false));

    echo $result;

 }

 elseif($postJson['acao']=='getdata'){
     $data = array();
     $query = mysqli_query($mysqli, "SELECT * FROM usuarios ORDER BY id_usuario DESC LIMIT $postJson[start], $postJson[limit]");

     while($row = mysqli_fetch_array($query)){

        $data[] = array(
            'id_usuario' => $row['id_usuario'],
            'nomeUsuario' => $row['nomeUsuario'],
            'descricaoUsuario' => $row['descricaoUsuario'],
            'criado_em' => $row['criado_em'],
        );
    }

    if($query)
        $result = json_encode(array('success' => true, 'result' => $data));
    else $result = json_encode(array('success' => false));

    echo $result;
 }

 elseif($postJson['acao']=='update'){
    $query = mysqli_query($mysqli, "UPDATE usuarios SET nomeUsuario = '$postJson[nomeUsuario]',
        descricaoUsuario = '$postJson[descricaoUsuario]' WHERE id_usuario ='$postJson[id_usuario]'");

   if($query)
       $result = json_encode(array('success' => true, 'result' => 'success'));
   else $result = json_encode(array('success' => false,  'result' => 'error'));

   echo $result;
 }

 elseif($postJson['acao']=='delete'){
    $query = mysqli_query($mysqli, "DELETE FROM usuarios WHERE id_usuario ='$postJson[id_usuario]'");

    if($query)
        $result = json_encode(array('success' => true, 'result' => 'success'));
    else $result = json_encode(array('success' => false,  'result' => 'error'));

    echo $result;
 }

 elseif($postJson['acao'] == "login"){
    $password = md5($postJson['senha']);
    $query = mysqli_query($mysqli, "SELECT * FROM contas_usuarios WHERE login='$postJson[login]' AND senha='$password'");
    $check = mysqli_num_rows($query);

    if($check > 0){
      $data = mysqli_fetch_array($query);
      $datauser = array(
        'id' => $data['id'],
        'login' => $data['login'],
        'senha' => $data['senha'],
        'criado_em' => $data['criado_em']
      );

      if($data['status'] == 'y'){
        $result = json_encode(array('success'=>true, 'result'=> $datauser));
      }else{
        $result = json_encode(array('success'=>false, 'msg'=>"Conta inativa")); 
      }

    }else{
      $result = json_encode(array('success'=>false, 'msg'=>"Usuário não encontrado!"));
    }

    echo $result;
  }

  elseif($postJson['acao'] == "register"){
    $password = md5($postJson['senha']);

    $query = mysqli_query($mysqli, "INSERT INTO contas_usuarios SET
      login = '$postJson[login]',
      senha = '$password',
      status   = 'y',
      criado_em = '$hoje'");

    if($query)
        $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false, 'msg'=>"Algo deu errado, tente novamente"));

    echo $result;
  }

?>
