const express = require('express')
const User = require('../models/user')
var passMethods = require('../managePassword')
var users = require('../users')
const router = express.Router()
router.get('/', async (req, res) => {
    User.collection.drop();
    const firstUser = new User(users.firstUser)
    const secondUser = new User(users.secondUser)
    try {
        await firstUser.save()
        await secondUser.save()
    } catch (error) {
        console.log(error);
    }
    res.render('login/index', { errorMessage: '' })
})
router.post('/', async (req, res) => {
    try {
        var user = await User.find({ email: req.body.email })
        if (user.length !== 0 && user[0].email === req.body.email && req.body.lozinka === passMethods.decryptPass(user[0].lozinka))
            res.redirect('/index')
        else res.render('login/index', {
            errorMessage: 'Pogrešan email ili lozinka'
        })
    } catch (error) {
        console.log(error);
    }
})
module.exports = router