const bcrypt = require('bcryptjs/dist/bcrypt');
const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/UsuarioModel');


const crearUsuario = async (req, res = response)=>{
    const {email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({email});
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }
        usuario = new Usuario(req.body);

        //Encriptar password
        const salt = bcrypt.genSaltSync( );
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar JWT

        const token = await generarJWT(usuario.id, usuario.name);
        
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Contacte con el administrador'
        });
    }
 }

 const loginUsuario = async (req, res = response)=>{
    const {email, password} = req.body;

    try {
        const usuario = await Usuario.findOne({email});

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o password no son correctos'
            });
        }

        //Confirmar Passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario o Password no son correctos"
            })
        }

        //Generar JWT

        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        console(error);
        res.status(500).json({
            ok:false,
            msg: 'Contacte con el administrador'
        });
    }
 }

 const renovarToken = async (req, res = response)=>{
    const {uid, name} = req;

    //Generar nuevo token

    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
 }

 module.exports = {
     crearUsuario,
     loginUsuario,
     renovarToken
    }