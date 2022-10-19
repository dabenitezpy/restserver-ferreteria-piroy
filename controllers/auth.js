const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');



const login = async(req, res = response) => {

    const { nombre, password }  = req.body;

    try {

        const usuario = await Usuario.findOne({ nombre });
        
        // Verificar si usuario existe
        if ( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - correo'
            });
        }

        // Si el usuario esta activo
        if ( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - estado false'
            });
        }

        // Verificar la constraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - pass incorrecto'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        
        res.json({
            msg: 'Login ok',
            nombre,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
        
    }



}


module.exports = {
    login
}