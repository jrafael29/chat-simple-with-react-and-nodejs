# Projeto simples feito com o intuito de praticar e aprender melhor sobre React.

Trata-se de um projeto de salas de chat, onde um cliente poderá se conectar e enviar mensagens para o chat dos canais/salas.

O projeto está dividido em dois: sendo o ./client uma aplicação frontend em __React__ com __Typescript__, e o ./server um backend simples utilizando __NodeJS__ e __Socket IO__ para a comunicação em tempo real.

# Para rodar o projeto:

* Entre no diretorio de cada aplicação e instale as dependencias utilizando o npm ou o gerenciador de pacotes que queira. `npm install`

* Utilize `npm run dev` em ambas aplicações para rodar localmente.

O servidor irá rodar na :3000 e o client na :5173

__Obs: Caso opte por alterar a porta do client, será necessário a modificação do arquivo index do servidor, permitindo a nova porta no origin do cors do server do socket.__