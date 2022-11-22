const { mongoose } = require("mongoose");

const Usuario = mongoose.Schema({
  nome: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  senha: {
    type: String,
    require: true
  }
})

//Aqui estamos informando qual a collection onde os dados serão armazenados. collection == tabela



module.exports = mongoose.model('usuario', Usuario);