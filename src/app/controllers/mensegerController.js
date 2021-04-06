const express = require('express');
const authMiddleware = require('../middlewares/auth');

const User = require('../models/User');
const Menseger = require('../models/Menseger');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const msg = await Menseger.find();

        return res.send(msg);

    } catch(err) {
        return res.status(400).send({error: "Erro ao buscar mensagens", msg: msg});
    }
})

router.post('/', async (req, res) => {
    try {
        const {menseger} = req.body;

        const msg = await Menseger.create({user: req.userId, menseger});

        req.io.emit('msg', msg);

        return res.send(msg);

    } catch(err) {
        return res.status(400).send({error: "Erro ao enviar mensagem", msg: err});
    }
})

router.put('/:id/:user', async(req, res) => {
    try {
        const {id, user, menseger} = req.params;

        if(user != req.userId)
            return res.status(400).send("Vc não tem permissão para editar menssagem de outro usuário");
        
        const msg = await Menseger.findByIdAndUpdate(id, {
            menseger,
            edited: true
        });

        req.io.emit('msg', msg);
        
       return res.send(msg);

    } catch(err) {
        return res.status(400).send({error: "Erro ao atualizar mensagem", msg: err});
    }
})

router.delete('/:id/:user', async(req, res) => {
    try {
        const {id, user} = req.params;

        if(user != req.userId)
            return res.status(400).send("Vc não tem permissão para excluir menssagem de outro usuário");
        
        const msg = await Menseger.findByIdAndDelete(id);
        
        req.io.emit('msg', msg);

        return res.send(msg);

    } catch(err) {
        return res.status(400).send({error: "Erro ao excluir mensagem", msg: err});
    }
}) 

module.exports = app => app.use('/menseger', router)