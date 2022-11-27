const express = require('express'); 
const server = express();
const port = 3000;

const usuario = require('./model/usuarios');
const { connect } = require('./conexaoDB/conect');

//CONFIGURAÇÕES DO SERVIDOR
server.use(express.json());

//ROTAS DISPONÍVEIS
//========================== Listagem da playlists =========================== OK
server.get('/playlists', async (req, res) => {

    const conn  = await connect();
    const [row] = await conn.query('SELECT * FROM playlist;');

    res.json(row);

});

//========================== Detalhe da playlists com id =========================== INCOMPLETO
server.get('/playlists/:id', async (req, res) => {
    let id = req.params.id;
    
    const conn  = await connect();
    const value = id;
    const [row] = await conn.query(`SELECT * FROM playlist WHERE id=${value};`);

    res.json(row, value);

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


//========================== Buscar músicas =========================== INCOMPLETO

server.get('/musicas', async (req, res) => {
    
    let pesquisa = req.query['nome'];
    
    const conn  = await connect(); //CONEXÃO COM O MYSQL
    const row = await conn.query('SELECT * FROM musicas;');
    
    let busca = row.filter((rows) => {
        return rows.nomeMusica === pesquisa;
    })

    res.json(busca);

})

//VERIFICAÇÃO DO SERVIDOR
server.listen(port, () => {
    console.log('Servidor node rodando na porta: ' + port);
})

module.exports = server;
