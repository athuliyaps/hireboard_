const express = require('express')
const { authenticate, authorize } = require('../middlewares/authMiddleware')
const {  createAppli_controller, getAppli_controller } = require('../controllers/applicationController')
const router = express.Router()

router.post('/',authenticate,authorize('user'),createAppli_controller)
router.get('/',authenticate,authorize('user'),getAppli_controller)


module.exports = router