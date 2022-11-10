const express = require('express'); 
const server = express();
const port = 3000;
const usuarios = require('./model/usuarios');
const playlists = require('./model/playlists');
const bodyParser = require('body-parser');

//CONFIGURAÇÕES DO SERVIDOR
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json()); //convertendo tudo que vem com JSON
server.use(express.json());

//ROTAS DISPONÍVEIS
//========================== Listagem da playlists =========================== OK
server.get('/playlists', (req, res) => {
    try {
        res.json(playlists);

    }catch (error){
        res.json(error);
    } 
});

//========================== Detalhe da playlists com id =========================== OK
server.get('/playlists/:id', (req, res) => {
    let id = req.params.id;
    let playlist = {};
    playlist = playlists[id];
    res.json(playlist);
})

//========================== Cadastrar playlist =========================== OK

server.post('/playlists', (req, res) => {
    let { id, titulo, nomeMusica, artista } = req.body;
    let novaPlaylist = playlists.push({ id, titulo, nomeMusica, artista });
    res.json(novaPlaylist);
})

//========================== Editar playlist ===========================

server.put('/playlists', (req, res) => {
    
})

//========================== Cadastro de usuários =========================== OK

server.post('/usuarios', (req, res) => {
    try{
        let { email, nome, senha, id } = req.body;
        usuarios.push( { email, nome, senha, id } );
        res.json(usuarios);
    }catch(error) {
        console.log(error)
    }

})

//========================== Login =========================== OK
server.get('/usuario', (req, res) => {
    let queryEmail = req.query['email'];
    let u = usuarios //RETORNA O ARRAY DE USUÁRIOS

    let objeto = u.find((user) => {
        return user.email === queryEmail;    
    })

    res.json(objeto);

});

//========================== Listagem de usuários =========================== OK

server.get('/usuarios', (req, res) => {
    try {
        res.json(usuarios);

    }catch (error){
        res.json(error);
    } 
});

//========================== Editar usuário =========================== OK

server.put('/usuarios/:id', (req, res) => {
    let id = req.params.id;
    let { email, nome, senha } = req.body
    let novoUsuario = usuarios.find( user => user.id == id );

    if( novoUsuario ) {
        novoUsuario.email = email;
        novoUsuario.nome  = nome;
        novoUsuario.senha = senha;
        
        res.json(novoUsuario);
    }else {
        res.json({ error: 'Usuário não encontrado!' });
    }
})


//========================== Buscar músicas ===========================

server.post('/musicas', (req, res) => {
    
})

//VERIFICAÇÃO DO SERVIDOR
server.listen(port, () => {
    console.log('Servidor rodando na porta: ' + port);
})

module.exports = server;
