# 📦 D-Oliva-E-Commerce

## 🛠️ Requisitos

Antes de começar, certifique-se de ter instalado:

- [XAMPP](https://www.apachefriends.org/index.html)
- [PostgreSQL](https://www.postgresql.org/download/)
- [pgAdmin](https://www.pgadmin.org/download/)
- [Node.js](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)

## 🚀 Passos para rodar o projeto

### 1. Instale os softwares acima

Garanta que XAMPP, PostgreSQL/pgAdmin, VSCode e Node.js estejam instalados e funcionando corretamente.

### 2. Mova o projeto para o `htdocs`

Coloque a pasta do projeto dentro do diretório `htdocs` do XAMPP. Exemplo:


``` C:\xampp\htdocs\nome-do-projeto ```

### 3. Ative as extensões do PostgreSQL no PHP
No arquivo php.ini do XAMPP (geralmente localizado em C:\xampp\php\php.ini), descomente as seguintes linhas (remova o ; do início):

extension=pdo_pgsql <br>
extension=pgsql

### 4. Configure o banco de dados
Abra o pgAdmin.

Crie um banco de dados.

Importe o arquivo .sql fornecido com o projeto.


### 5. Configure a conexão com o banco
No projeto, localize o arquivo db_connection.php na pasta API e atualize os dados conforme o banco de dados que você criou/importou.

### 6. Rode o projeto
Abra um terminal dentro da pasta do projeto ou no próprio VSCode e execute o comando na pasta do projeto:

```npm run dev ```

Não se esqueça de dar Start no Apache dentro do Xampp. 

### 7. Configurar .ENV
Criar um arquivo .env na raiz do projeto contendo a API_KEY e a Conexão com o Bando de Dados.

Ficaria assim:

GEMINI_API_KEY=Chave aqui
DB_NAME=nome do banco
DB_USER=postgres
DB_PASSWORD=senha
DB_HOST=localhost
DB_PORT=5432

Rodar o comando abaixo para instalar o requerimentos para o codigo python
pip install -r requirements.txt




