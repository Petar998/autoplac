const express = require('express')
const router = express.Router()
router.get('/', (req, res) => {
    // writer.writeFile()
    // reader.readFile()
    // res.redirect('/login')
})
router.get('/index', (req, res) => {
  //  res.render('index')
})
module.exports = router