const express = require('express')
const { createController, getController, updateController, deleteController } = require('../controllers/jobController')
const router = express.Router()

router.post('/',createController)
router.get('/',getController)
router.put('/:id',updateController)
router.delete('/:id',deleteController)

module.exports=router