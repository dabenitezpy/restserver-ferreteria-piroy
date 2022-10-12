const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { usuarioExiste, usuarioExistePorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/', usuariosGet);

router.patch('/', usuariosPatch);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(usuarioExistePorId),
    check('nombre').custom( usuarioExiste ),
    validarCampos
], usuariosPut);

router.post('/', [
    //check('nombre', 'El usuario no es valido').isEmail(),
    check('nombre', 'El usuario es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    check('nombre').custom( usuarioExiste ),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(usuarioExistePorId),
    validarCampos
], usuariosDelete);
  



module.exports = router;