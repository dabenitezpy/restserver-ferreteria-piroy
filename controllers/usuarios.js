const { response } = require( 'express' );
 
 const usuariosGet = (req, res = response) => {

    //const query = req.query;
    const { q, nombre = 'No name', apikey } = req.query;

    res.json({
        msg: 'get API - controlador',
        //query
        q,
        nombre,
        apikey
    });
 }

 const usuariosPost = (req, res = response) => {

    //const body = req.body;
    const { nombre, edad} = req.body;

    res.json({
        msg: 'post API - controlador',
        //body
        nombre,
        edad
    });
 }

 const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    });
 }

 const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - controlador',
        id
    });
 }

 const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete API - controlador'
    });
 }



 module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPatch,
    usuariosPost,
    usuariosDelete
 }