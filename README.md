
# Api-Estagio Escribo

Projeto para vaga de estagio

Funcionalidades:

    Api RESTful, que cadastra usuarios, sistema de login e sistema de token de sessao. E ainda possui a funcionalidade de resgatar infos da pessoa cadastrada ao enviar o token que foi recebido


Tecnologias Utilizadas:

    A aplicação foi construída com Nodejs, express, bcrypt, jwt


Voce pode acessar a api e ve mais sobre no Link:

    https://api-escribo.onrender.com/api-doc/





## API Reference

#### Post

```http
   /signup
```

## Modelo de post a ser seguido:

{
  "nome": "String",
  "email": "String",
  "senha": "String",
  "telefones": [
    { "numero": "String", "ddd": "String" }
  ]
}


#### Post

```http
   /signin
```

## Modelo de post a ser seguido:

{
  "email": "String",
  "senha": "String",
}


#### Get
```http
   /getusers
```
## Envie um header com o nome bearer e no valor insira o token que eh retornado apos cadastrar ou logar
	Exemplo: 
 ![image](https://github.com/LukasLimalkl/escribo-teste2/assets/58051821/20a974ef-a0c7-4321-abfb-ecc8602a0368)



Screenshots
![image](https://github.com/LukasLimalkl/escribo-teste2/assets/58051821/56e42748-0e75-4791-9ff0-8a392490b860)
