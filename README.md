# LuizaLabApp

## Índice

  - [Instalação](#instalação)
  - [Teste Unitário](#teste-unitário)
  - [Arquitetura do Projeto](#arquitetura-do-projeto)
  - [Teste da Aplicação](#teste-da-aplicação)
  - [Observações](#observações)
  - [Itens Pendentes](#todo)

## Instalação
**Instalar repositório:**
  - Ter docker e docker compose instalado

  1. Acessar o diretório do projeto (luizalabApp)

  2. Executar o comando de instalação 
```bash
$ npm install ou yarn (caso tenha instalado)
```
  3. Executar o comando para subir a aplicação no docker
```bash
$ docker compose up -d
```
  4. Após executar o comando acima, rodar as migrations para criação das tabelas
```bash
$ yarn typeorm migration:run ou npm run typeorm migration:run
```



## Teste unitário
**Após instalar as dependencias do projeto:**

  1. Para rodar os testes unitários, após a instalação dos pacotes rodar o seguinte comando:
 ```bash
$ yarn test ou npm run test
```
  6.1 Acessar coverage\lcov-report\index.html para verificar a cobertura


## Arquitetura do Projeto
```
  Projeto desenvolvido em Typescript.
  Foi criado utilizando a Arquitetura SOLID, DOCKER e DOCKER COMPOSE

  - Bibliotecas utilizadas
  . Express
  . TypeOrm
  . Tsyringe
  . Multer
  . Jest
  . etc

  - Banco de dados utilizado
  . Postgres
    
```

## Teste da Aplicação
**Para executar os testes da aplicação:**

  1. Caso entenda necessário, pode ser feita a importação da collection para faciliar os testes:
  ```
  TesteLuizaLabs.postman_collection.json
  ```

  2. Executar o endpoint de importação do arquivo:
  ```bash
  curl --location 'http://localhost:3333/orders/import' \
  --form 'file=@"/C:/NOME_DA_PASTA/data_1.txt"'
  ```
  **Para o teste foram usados os seguintes arquivos:**
  ```
  data_1.txt
  data_2.txt
  ```

  3. Executar o endpoint de consulta dos pedidos:
  ```bash
  curl --location 'http://localhost:3333/orders/'
  ```
  - Essa consulta exibirá o resultado, conforme esperado no teste.

  - 3.1 - Opcionalmente, pode se utilizar a consulta com paginação:

  ``` bash
  curl --location 'http://localhost:3333/orders/?skip=5&limit=30'
  ```

  Foram adicionados outros endpoints na aplicação:
  
  **Usuários:**
  - Create User -> POST
  ```bash
  curl --location 'http://localhost:3333/users' \
  --header 'Content-Type: application/json' \
  --data '{
      "user_id": 1,
      "name": "Usuário Teste"
  }'  
  ```

  **Pedidos:**
  - Create Order -> POST
  ```bash
  curl --location 'http://localhost:3333/orders' \
  --header 'Content-Type: application/json' \
  --data '{
      "order_id": 1,
      "user_id": 1
  }' 
  ```
  - Get Order By Id -> GET
  ```bash
  curl --location 'http://localhost:3333/orders/895'  
  ```
  - Get Order By User ID -> GET
  ```bash
  curl --location 'http://localhost:3333/orders/user/94'
  ```

**Itens do Pedido:**

  - Create Order Item -> POST
  ```bash
  curl --location 'http://localhost:3333/orders/item' \
  --header 'Content-Type: application/json' \
  --data '{
      "order_id": 1,
      "product_id": 5,
      "price": 5,
      "qty": 2
  }'
  ```

**Produtos:**

  - Create Product -> POST

  ```bash
  curl --location 'http://localhost:3333/products' \
  --header 'Content-Type: application/json' \
  --data '{
        "product_id": 5,
        "name": "product name",
        "description": "product teste",
        "value": 157.55,
        "is_active": true
  }'

  ```

  - Get Product By Id -> GET
  ```bash
  curl --location 'http://localhost:3333/products/7'  
  ```

  - Get All Products -> GET
  ```bash
  curl --location 'http://localhost:3333/products' 
  ```

  - Update Product -> PUT
  ```bash
  curl --location --request PUT 'http://localhost:3333/products/7' \
  --header 'Content-Type: application/json' \
  --data '{
      "name": "product name",
      "description": "product teste",
      "value": 367.55,
      "is_active": true
  }'  
  ```

  - Delete Product -> DELETE
  ```bash
  curl --location --request DELETE 'http://localhost:3333/products/7' \
  --header 'Content-Type: application/json' \
  --data '{
      "is_active": false
  }'
  
  Esse método não irá excluir por definitivo o registro, fará apenas o update na tabela no campo "is_active", colocando esse registro como "active: false" (deleção lógica)
  ```
 


## Observações
  Consegui colocar em prática os principais conceitos que aprendi ao longo dos
  meus estudos / experiência com essas tecnologias, além do desafio de ter criado tudo do "zero".
  Não fiz a publicação do projeto em ambiente cloud por ter expirado minha conta (versão gratuita) da AWS, porém, 
  possuo experiência com arquitetura cloud, serverless, api gateway, criação de lambdas etc.

  Ficaram faltando algumas melhorias e refatorações no código, considerando algumas regras de negócio:

  ## TODO
  ```
  . Métodos CRUD no módulo de usuário
  . Testes de integração (controllers / rotas etc)
  . Criar mecanismo de leitura por stream, porém, como o teste está pedindo para recebermos o arquivo via requisição, seguimos dessa forma
  . Controlar quais arquivos já foram importados (histórico de importação, resiliência para os arquivos etc), porém, desenvolvi uma contingência nos repositórios / camada de negócio para controlar a duplicidade dos registros com a estratégia de upsert ( Caso não tenha o registro, a aplicação irá criar e caso já exista, fará o update)
  . Configuração de acesso ao banco etc com variáveis de ambiente / estratégia de armazenamento em segredo (secret manager por exemplo). Foi feito sem essa configuração por se tratar inicialmente de um teste.
  . Algumas validações nos CRUD's
  ```

