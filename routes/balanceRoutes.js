const express = require('express')
const router = express.Router()
const balanceController = require('../controllers/balanceController')
const verifyJWT = require('../middleware/verifyJWT')



// routing points to the correct method inside the balanceController
router.route('/')
.get(verifyJWT, balanceController.checkBalance)
.post(balanceController.initialDeposit)

router.route('/deposit')
.patch(verifyJWT, balanceController.userDeposit)

router.route('/withdraw')
.patch(verifyJWT, balanceController.userWithdraw)

router.route('/close-account')
.delete(verifyJWT, balanceController.closeAccount)

module.exports = router