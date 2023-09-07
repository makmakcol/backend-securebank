const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')



router.route('/')
// routing points to the correct method inside the userController
    
    .get(verifyJWT, userController.getAllData)
    .post( userController.createNewUserAccount)
    .patch(verifyJWT, userController.updateUserAccount)
    .delete(verifyJWT, userController.deleteUserAccount)

module.exports = router