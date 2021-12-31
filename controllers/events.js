const {response} = require('express');
const Evento = require('../models/EventoModel');

const getEventos = async (req, res = response) =>{
    const eventos = await Evento.find().populate('user', 'name');

    res.status(201).json({
        ok: true,
        eventos
    })
}

const crearEvento = async (req, res = response) =>{
    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarEvento = async (req, res = response) =>{
    const eventoId = req.params.id;

    try {
        const evento = await Evento.findById(eventoId);
        const uid = req.uid;

        if (!evento) {
            return res.status(404).json({
                ok: true,
                msg: 'Evento no existe'
             }) 
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: true,
                msg: 'Usuario no autorizado'
             }) 
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

        res.status(201).json({
            ok: true,
            evento: eventoActualizado
         }) 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
         }) 
    }

    
}

const eliminarEvento = async (req, res = response) =>{
    const eventoId = req.params.id;

    try {
        const evento = await Evento.findById(eventoId);
        const uid = req.uid;

        if (!evento) {
            return res.status(404).json({
                ok: true,
                msg: 'Evento no existe'
             }) 
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: true,
                msg: 'Usuario no autorizado'
             }) 
        }

        await Evento.findByIdAndDelete(eventoId);

        res.status(201).json({
            ok: true,
            msg: 'evento eliminado con exito'
         }) 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
         }) 
    }

}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}