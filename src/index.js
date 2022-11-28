const express = require('express'); 
const server = express();
const port = 3001;

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

//========================== Detalhe da playlists com id =========================== OK
server.get('/playlists/:id', async (req, res) => {
    let id = req.params.id;

    const conn  = await connect();
    const [row] = await conn.query(`SELECT * FROM playlist WHERE id_playlist=${id};`);

    res.json(row);

})

//========================== Cadastrar playlist =========================== OK

server.post('/playlists', async (req, res) => {
    let { titulo, artista, fk_musicas } = req.body;

    const conn = await connect();

    const [row] = await conn.query(`
    INSERT INTO playlist ( titulo, artista, fk_musicas ) 
    VALUE ( '${titulo}', '${artista}', ${fk_musicas} );`)

    res.json(row)
})

//========================== Editar playlist =========================== OK

server.put('/playlists/:id_playlist', async (req, res) => {
    let { titulo, artista, fk_musicas } = req.body;
    let id_playlist = req.params.id_playlist;

    const conn = await connect();
    const [row] = await conn.query(`
    UPDATE playlist SET titulo='${titulo}', artista='${artista}', fk_musicas='${fk_musicas}' 
    WHERE id_playlist = ${id_playlist};`)

    res.json(row);
})

//========================== Cadastro de usuários =========================== OK

server.post('/usuarios', async (req, res) => {

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

//========================== Login =========================== incompleta
server.get('/usuario', async (req, res) => {
    let queryEmail = req.query['email'];

    const conn  = await connect();
    const [row] = await conn.query(`SELECT * FROM usuario WHERE email='${queryEmail}';`);

    res.json(row);

});

//========================== Listagem de usuários =========================== OK

server.get('/usuarios', async (req, res) => {
    let conn  = await connect();
    let [row] = await conn.query('SELECT * FROM usuario;');

    res.json(row);

});

//========================== Editar usuário =========================== OK

server.put('/usuarios/:id_usuario', async (req, res) => {
    let id_usuario = req.params.id_usuario;
    let { nome, email, senha } = req.body

    if( id_usuario ) {
        const conn  = await connect();
        const [row] = await conn.query(`
        UPDATE usuario SET nome='${nome}', email='${email}', senha='${senha}' 
        WHERE id_usuario = ${id_usuario};`)

        res.json(row)
    }else {
        res.json({ error: 'Usuário não encontrado!' });
    }
})


//========================== Buscar músicas =========================== OK

server.get('/musicas', async (req, res) => {
    
    let pesquisa = req.query['nome'];
    
    const conn = await connect(); //CONEXÃO COM O MYSQL
    const [row]  = await conn.query(`SELECT * FROM musicas WHERE nome='${pesquisa}';`);

    res.json(row)

})

//VERIFICAÇÃO DO SERVIDOR
server.listen(port, () => {
    console.log('Servidor node rodando na porta: ' + port);
})

module.exports = server;
