const express = require('express')
const { register, login, refresh, getController } = require('../controllers/authController')
const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/refresh',refresh)
router.get('/',getController)

module.exports = router