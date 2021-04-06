# GiuWer

(*Apenas para estudo*)

É uma aplicação de troca de mensagens simples. Ela foi desenvolvida para que eu pudesse praticar as renderizações em tempo real, na aplicação ReacJS, utilizando o *Socket.io* e também praticar o uso da *contextAPI* para efetuar a autenticação da aplicacação.

Ela não suporta várias cponversas ao msm tempo. Então é uma boa para você usar com aquele amigo de confiança ou com sua(seu) crush que sempre têm a desculpa de não gostar de entrar nos aplicativos de mensagens convencionais hahaha

Brincadeiras a parte, bora para as features!

![alt text](https://thumbs2.imgbox.com/d2/66/2TGPEMOC_t.png)

---
## Instalação

- 1- Antes de tudo você deverá ter o [Nodejs](https://nodejs.org) instalado na sua máquina.
- 2- Abra o seu terminal e dê o comando `git clone https://github.com/UhCardoso/giulen-API.git`
- 3- Dê o comando `cd giulen-API`
- 4- Dê o comando `npm install`
- 5- Configure a sua conexão com o banco de dados MongoDB no arquivo `/src/database/index.js`. Você pode criar um BD online no site do [Mongodb Atlas](https://www.mongodb.com/cloud/atlas) para configurar o banco de dados.
- 6- execute o programa com o comando `npm start`


---
## Features

- **Rota de registro:**
- 
`https://api-giulen.herokuapp.com/auth/register`

Por ser uma aplicação que suporta várias conversas, o registro inicial deve ser feito pelo [Postaman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/download), passando os seguintes campos no corpo JSON via método POST:

    `"name": "Nome Teste"`,
    
	`"username":"nome_usuário",`
	
	`"password": "uma_senha_de_acesso"`

*Crie só 2 registros*

- **Rota de autenticação:**

`https://api-giulen.herokuapp.com/auth/authenticate`

Nessa rota, ao ser solicitada a autenticação, são enviados os seguintes campos via método POST: 

    `"username":"nome_usuário",`
    
	`"password": "senha_de_acesso"`

Na aplicação frontend eu utilizo a biblioteca *Axios* para realizar a requisição.
Ao se autenticar, a API enviará a reguinte resposta no formato em JSON: 

![alt text](https://thumbs2.imgbox.com/98/90/92MnbCsV_t.png)

*O token é muito importante para ser possível usar as próximas rotas.*

- **Rota para enviar mensagem:**

`https://api-giulen.herokuapp.com/menseger`

Com o token válido sendo enviado no HEAD da requisição, a aplicação enviará o seguinte campo em JSON para a API via método POST:

`"menseger": "uma mensagem aleatória..."

A mensagem irá ser salva com o ID do usuário, que a enviou, no banco de dados.

- **Rota para listar mensagens:**

`https://api-giulen.herokuapp.com/menseger`

Com o token válido sendo enviado no HEAD da requisição via método GET, irá ser retornado um array de JSON. Veja o exemplo abaixo:

![alt text](https://thumbs2.imgbox.com/d5/39/NPW7s6DW_t.png)

- **Rota para editar mensagem:**

`https://api-giulen.herokuapp.com/menseger`

Com o token válido sendo enviado no HEAD da requisição, a aplicação enviará o seguinte campo em JSON para a API via método PUT:

  `"_id": "<id_da_mensagem>",`
  `"user": "<id_do_usuário_autor>",`
  `"menseger": "mensagem editada..."`

- **Rota para excluir mensagem:**

`https://api-giulen.herokuapp.com/menseger`

Com o token válido sendo enviado no HEAD da requisição, a aplicação enviará o seguinte campo em JSON para a API via método DELETE:

  `"_id": "<id_da_mensagem>",`
  `"user": "<id_do_usuário_autor>",`
