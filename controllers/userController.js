const User = require('../models/User')
const Balance = require('../models/Balance')
const asyncHandler = require('express-async-handler')
const bcyrpt = require('bcrypt')

// @desc Get all user accounts and data associated with it
// @route GET /users
// @access Private, ROLE SENSITIVE 
const getAllData = asyncHandler(async (req, res) => {
    // get all data from MongoDB
    const data = await User.find().select('-password').lean()

    // if no data
    if (!data?.length) {
        return res.status(400).json({ message: 'No data found'})
    }

    // Get balances for each user and attach them to the response
    const allData = await Promise.all(data.map(async user => {
        const balance = await Balance.findOne({ user: user._id});
       return { ...user, balance: balance ? balance.balance: 0.00 }
    }))
    res.json(allData) // shows all user data including balance
})

// @desc Create new user account
// @route POST /users 
// @access Public 
const createNewUserAccount = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, username, password, roles} = req.body

    // Confirm user account
    if (!firstName || !lastName || !email || !username || !password ||  !Array.isArray(roles) || !roles.length ) {
        return res.status(400).json({ message: 'All fields are required'})
    }

    // Check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Username is unavailable'})
    }

    // Hash password
    const hashedPwd = await bcyrpt.hash(password, 10) // 10 salt rounds

    const userObject = { 
        firstName,
        lastName,
        email,
        username,
        "password": hashedPwd,
        roles
    }

    // Create and store new user account
    const user = await User.create(userObject)

    // Create initial balance for new user
    const balance = new Balance({ 
        user: user._id,
        balance: 0.00 // Initial balance
    });

    await balance.save();

    if (user && balance) { // account created
        res.status(201).json({ message: `New user ${username} created with initial balance of $${balance.balance}`})
    } else {
        res.status(400).json({message: 'Invalid data received'})
    }
})

// @desc Update an account
// @route PATCH /users
// @access Private 
const updateUserAccount = asyncHandler(async (req, res) => {
    console.log('Received Data:', req.body)
    const { id, firstName, lastName, email, username, roles, password } = req.body

    // Confirm account
    if (!id || !username || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required except password'})
    }

    // Does account exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found'})
    }
    // Check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec()

    // Allow updates to the original user
    if (duplicate && duplicate?._id.toString() !== id ) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.username = username
    user.roles = roles

    if (password) {
        // Hash password
        user.password = await bcyrpt.hash(password, 10) // salt rounds
    }

    const updatedUserAccount = await user.save()
    const refetchedUser = await User.findById(id).exec()
    console.log("Updated User:", updatedUserAccount)
    console.log("Refecthed User:", refetchedUser)

    res.json({ message: `${updatedUserAccount.username} updated`})

})

// @desc Delete an account
// @route DELETE /users
// @access Private
const deleteUserAccount = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm user account
    if (!id) {
        return res.status(400).json({ message: 'User ID Required'})
    }

    // does the user account have a balance > 0?
    const balance = await Balance.findOne({ user: id }).lean().exec()
    if (balance && balance.balance !== 0.00) {
        return res.status(400).json({ message: 'User with a non-zero balance cannot be deleted'})
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found'})
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)

})

module.exports = {
    getAllData,
    createNewUserAccount,
    updateUserAccount,
    deleteUserAccount
}