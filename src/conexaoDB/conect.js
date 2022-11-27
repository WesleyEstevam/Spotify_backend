async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:123123@localhost:3306/spotify");//Alterar URL

    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

connect()
/*
async function listaMusicas() {
    const conn = connect; //CONEXÃO COM O MYSQL
    const [row] = await conn.query('SELECT * FROM musicas;');
    return row;
}

*/

module.exports = {connect};