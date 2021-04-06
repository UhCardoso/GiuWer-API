const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authConfig = require('../../config/auth.json');
const User = require('../models/User');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign({params}, authConfig.secret, {
        expiresIn: 86400
    })
}

router.post('/register', async (req, res) => {
    const {username} = req.body;

    try {
        if(await User.findOne({username})) {
            return res.status(400).send({error: "Usuario ja existe"});
        }

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({
            user,
            token: generateToken({id: user._id})
        })

    } catch (err) {
        return res.status(400).send({error: "Erro ao cadstrar usuário", msg: err});
    }

})

router.post('/authenticate', async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username}).select('+password');

        if(!user) 
            return res.status(400).send({error: "Usuario não encontrado"});

        if(!await bcrypt.compare(password, user.password))
            return res.status(400).send({error: "Senha inválida"});

        user.password = undefined;

        return res.send({
            user,
            token: generateToken({id:user._id})
        })

    } catch(err) {
        return res.status(400).send({error: "Erro ao logar", msg: err});
    }
})

module.exports = app => app.use('/auth', router);