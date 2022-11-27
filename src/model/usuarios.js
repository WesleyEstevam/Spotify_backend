//const conn = require('../conexaoDB/conect');

const Usuario = {
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
};

module.exports = Usuario;