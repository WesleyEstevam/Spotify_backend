const express = require('express'); 
const server = express();
const port = 3000;
const usuario = require('./model/usuarios');

const db = require('./conexaoDB/conect');
const usuarios = require('./model/usuarios')

//CONFIGURAÇÕES DO SERVIDOR

server.use(express.json());

//ROTAS DISPONÍVEIS
//========================== Listagem da playlists =========================== 
server.get('/playlists', (req, res) => {
    try {
        res.json(playlists);

    }catch (error){
        res.json(error);
    } 
});

//========================== Detalhe da playlists com id =========================== 
server.get('/playlists/:id', (req, res) => {
    let id = req.params.id;
    let playlist = {};
    playlist = playlists[id];
    res.json(playlist);
})

//========================== Cadastrar playlist =========================== 

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

    let { email, nome, senha } = req.body;
    new usuario({
        email: email,
        nome: nome,
        senha: senha
    }).save().then(() => {
        console.log("Usuário cadastrado com sucesso!!")
    }).catch((err) => {
        console.log("Houve um erro ao registrar um usuário: " + err)
    })

    res.json(usuario)
})

//========================== Login =========================== 
server.get('/usuario', (req, res) => {
    let queryEmail = req.query['email'];
    let u = usuarios //RETORNA O ARRAY DE USUÁRIOS

    let objeto = u.find((user) => {
        return user.email === queryEmail;    
    })

    res.json(objeto);

});

//========================== Listagem de usuários =========================== 

server.get('/usuarios', (req, res) => {
    try {
        let listaUsuarios = usuario.find(); 
        res.json(listaUsuarios);

    }catch (error){
        res.json(error);
    } 
});

//========================== Editar usuário =========================== 

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

server.get('/musicas', (req, res) => {
    let pesquisa = req.query['nome_like'];
    let musicas = playlists;

    let busca = musicas.filter((music) => {
        return music.nomeMusica === pesquisa;
    })

    res.json(busca);
    console.log(busca)

})

//VERIFICAÇÃO DO SERVIDOR
server.listen(port, () => {
    console.log('Servidor node rodando na porta: ' + port);
})

module.exports = server;
