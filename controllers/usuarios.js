const { response } = require( 'express' );
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


 
const usuariosGet = async(req, res = response) => {

    //const query = req.query;
    //const { q, nombre = 'No name', apikey } = req.query;

    /*const usuarios = await Usuario.find( query )
      .skip(Number(desde))
      .limit(Number(limite)); 
      
   const total = await Usuario.countDocuments( query );  */

   const { limite = 5, desde = 0 } = req.query;
   const query = { estado: true };

   const [ total, usuarios ] = await Promise.all([
      Usuario.countDocuments( query ),
      Usuario.find( query )
         .skip(Number(desde))
         .limit(Number(limite))
   ]);

    res.json({
        /*msg: 'get API - controlador',
        //query
        q,
        nombre,
        apikey*/
        total,
        usuarios
        
    });
 }

const usuariosPost = async(req, res = response) => {

    //const body = req.body;
    //const usuario = new Usuario( body );

    const { nombre, password, rol} = req.body;
    const usuario = new Usuario({nombre, password, rol});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        msg: 'Usuario guardado correctamente',
        //body
        //nombre,
        //edad
        usuario
    });
 }

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    });
 }

const usuariosPut = async(req, res = response) => {

    const id = req.params.id;
    const { password, google, ...resto } = req.body;

    // Encriptar la contraseña
    if ( password ){
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync( password, salt );
   }

   const usuario = await Usuario.findByIdAndUpdate( id, resto );
   res.json(usuario);

 }

const usuariosDelete = async(req, res = response) => {

   const { id }  = req.params;
   const { admin } = req.query;

   if ( admin ) {
      const usuario = await Usuario.findByIdAndDelete( id );
      return res.json({
         msg: 'Usuario eliminado fisicamente',
         usuario
      });

   }

   // Borrado fisico
   //const usuario = await Usuario.findByIdAndDelete( id );

   // Borrado por marca
   const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );
   const usuarioAutenticado = req.usuario;


                        /* BORRADO OTRA OPCION
                        const usuario = await Usuario.findById( id );  

                        if ( !usuario.estado ) {
                           return res.status(400).json({msg: "usuario no existe"});
                           
                        }
                        var nombreBorrado = usuario.nombre + '**';
                        await Usuario.findByIdAndUpdate( id,
                           { 
                              estado: false,
                              nombre: nombreBorrado
                           }
                        );   */

    res.json( {
      usuario,
      usuarioAutenticado
      
   } );
 }



 module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPatch,
    usuariosPost,
    usuariosDelete
 }