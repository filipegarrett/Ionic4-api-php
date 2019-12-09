# Ionic4-api-php

Esse projeto traz um CRUD completo em Ionic4 consumindo uma API própria que oferece também serviço de autenticação. A API está escrita
em PHP e usando MySQL para persistência de dados.

<img src="imgs/login.JPG"/>
<img src="imgs/home.JPG"/>

## Requisitos

* Node.js
* Ionic4
* Servidor local implementado

## Instalação

* Basta clonar o repositório (ou fazer o download do .zip)
* A pasta 'ionic' é a API. Para usar, você vai precisar mover a pasta para dentro do seu servidor local. Se você usa o Xampp, seria dentro da pasta 'htdocs', por exemplo.
* Dentro de 'ionic' você encontra o arquivo da API em si - api.php - e o arquivo de configuração - config.php - com os dados do banco
* No projeto do ionic você terá que provavelmente atualizar o endereço da API no arquivo "post-providers.ts" dentro da pasta 'providers'
