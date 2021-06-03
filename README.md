![Build and Deploy](https://github.com/thiagoborba/eng-zap-challenge-javascript/actions/workflows/aws.yml/badge.svg)
![Test](https://github.com/thiagoborba/eng-zap-challenge-javascript/actions/workflows/test.yml/badge.svg)

# eng-zap-challenge-javascript

Este projeto é um simulacro do que seria uma plataforma digital imobiliária, onde duas agências dividem imóveis de acordo com as regras de negócio apresentadas no desafio.

Você pode acessar <http://eng-zap-challenge-javascript.s3-website.us-east-2.amazonaws.com/> para ver o projeto no ar.

Este projeto utiliza `yarn` para gerenciar os pacotes node, para instalar o `yarn` basta rodar o comando `npm install yarn --global`, porém se preferir utilizar o npm poderá faze-lo sem problemas utilizando os mesmos comandos do `yarn`.

### Como instalar

`yarn install`

### Como rodar o projeto

`yarn start`

### Como executar os testes

`yarn test`

### Como rodar o projeto numa imagem docker

Você pode rodar o projeto em uma imagem docker, caso tenha o docker instalado em sua máquina. Veja <https://docs.docker.com/engine/install> caso precise instalar o docker.

execute `sudo	docker build . -t react-docker` para criar a imagem docker <br />
execute `sudo docker run -p 8000:80 react-docker` para rodar a imagem.

acesse <http://localhost:8000> para visualizar a aplicação.
