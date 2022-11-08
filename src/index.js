const express = require('express'); 
const server = express();
const port = 3000;
const usuarios = require('./model/usuarios');
const bodyParser = require('body-parser');

//CONFIGURAÇÕES DO SERVIDOR
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

//ROTAS DISPONÍVEIS
//========================== Listagem de usuários ===========================
server.get('/login', (req, res) => {
    try {
        let lista = usuarios.map((user) => {
            return user;
        })
        res.json(lista);

    }catch (error){
        res.json(error);
    } 
});

//========================== Cadastro de usuários ===========================

server.post('/cadastro', (req, res) => {
    try{
        let { email, nome, senha, id } = req.body;
        let novoUsuario = usuarios.push( { email, nome, senha, id } ).toString();

        res.json(novoUsuario);
    }catch(error) {
        console.log(error)
    }

})

//========================== Alteração de usuários ===========================

server.put('/editarLogin/:id', (req, res) => {
    let id = req.params.id;
    let { email, nome, senha } = req.body
    let novoUsuario = id;

    if( novoUsuario ) {
        novoUsuario.nome = nome;
        novoUsuario.email = email;
        novoUsuario.senha = senha;
        
        res.json(novoUsuario);
    }else {
        res.json({ error: 'Usuário não encontrado!' });
    }
})











//VERIFICAÇÃO DO SERVIDOR
server.listen(port, () => {
    console.log('Servidor rorando na porta: ' + port);
})

module.exports = server;
