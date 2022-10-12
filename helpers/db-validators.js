const Usuario = require('../models/usuario');



const usuarioExiste = async( nombre = '' ) => {
    // Verificar usuario duplicado
    const existeUsuario = await Usuario.findOne({ nombre });
    if ( existeUsuario ) {
      /*return res.status(400).json({
         msg: "El usuario ya existe!"
      });  */

      throw new Error(`El usuario: ${nombre} ya existe!`);
    }

}

const usuarioExistePorId = async( id ) => {
    // Verificar usuario duplicado
    const existeUsuario = await Usuario.findById(id)
    if ( !existeUsuario ) {
        throw new Error(`El id no existe: ${id}`);
    }

}

module.exports = {
    usuarioExiste,
    usuarioExistePorId
}