const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Wesley:13102002@cluster0.esmhrpu.mongodb.net/test')
.then(() => {
    console.log("Servidor mongo rodando com sucesso!")
})
.catch((err) => {
    console.log("Erro na conexão com o banco de dados mongo: " + err)
})