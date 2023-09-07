const User = require('../models/User')
const Balance = require('../models/Balance')
const asyncHandler = require('express-async-handler')

// @desc Check balance of user by username 
// @route GET /balance
// @access Private-- access via username even after login

const checkBalance = asyncHandler(async (req, res) => {
  const username = req.query.username;
  const user = await User.findOne({ username: username })

  if (!user) {
    return res.status(400).json({ message: 'User not found'})
  }

  const balance = await Balance.findOne({ user: user._id })

  if (!balance) {
    return res.status(400).json({ message: 'Balance not found '})
  }

  res.json({ username: user.username, balance: balance.balance })

});

// @desc Initial deposit to a user's account (must be at least $25)
// @route POST /balance
// @access Public for project??
const initialDeposit = asyncHandler(async (req, res) => {
    const { username, amount } = req.body;
    const depositAmount = parseFloat(amount);

    // validates deposit amount is a positive number 
    if (isNaN(depositAmount) || depositAmount <= 0) {
        return res.status(400).json({ message: 'Invalid deposit amount' });
    }

    // check if user exisits
    const user = await User.findOne({ username });
    
    if(!user) {
        return res.status(400).json({ message: 'User not found'})
    }

    // check if balance exists
    const balance = await Balance.findOne({ user: user._id });

    if(!balance) {
        return res.status(400).json({ message: 'Balance not found'})
    }

    if (balance.balance !== 0 || depositAmount < 25) {
        return res.status(400).json({ message: 'Initial deposit must be at least $25' });
    }

    // Update default balance
    balance.balance += depositAmount;
    await balance.save();

    res.json({ message: `Initial deposit successful. New balance is $${balance.balance}` });
});

// @desc Deposit to a user's account
// @route PATCh /balance/deposit
// @access Private must login and then sign in via username

const userDeposit = asyncHandler(async (req, res) => {
    const { username, amount } = req.body;
    const depositAmount = parseFloat(amount);

    // validates deposit amount is a positive number 
    if (isNaN(depositAmount) || depositAmount <= 0) {
        return res.status(400).json({ message: 'Invalid deposit' });
    }

    // check if user exists
    const user = await User.findOne({ username });
    
    if (!user) 
    return res.status(400).json({ message: 'User not found' });

    // check for balance
    const balance = await Balance.findOne({ user: user._id });
    
    if (!balance ) 
    return res.status(400).json({ message: 'Balance not found' });

    // Update balance
    balance.balance += depositAmount;

    // Log transaction
    balance.transactions.push({
        type: 'deposit',
        amount: depositAmount,
        date: new Date()
    });

    await balance.save();

    res.json({ message: `Deposit successful. New balance is $${balance.balance}`});
})


// @desc Withdraw to user's account
// @route PATCH /balance/withdraw
// @access Private must login and sign in via username
const userWithdraw = asyncHandler(async (req, res) => {
    const { username, amount } = req.body;
    const withdrawAmount = parseFloat(amount)

    // validates withdraw amount is a positive number 
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
    return res.status(400).json({ message: 'Invalid withdrawal' });
    }

    // check if user exists
    const user = await User.findOne({ username });
    
    if (!user) 
    return res.status(400).json({ message: 'User not found' });

    // check for balance
    const balance = await Balance.findOne({ user: user._id });
    
    if (!balance ) 
    return res.status(400).json({ message: 'Balance not found' });

    // check for sufficient balance
    if (withdrawAmount > balance.balance) {
        return res.status(400).json({ message: 'Insufficient funds' })
    }

    // Update balance
    balance.balance -= withdrawAmount;

    // Log transaction
    balance.transactions.push({
        type: 'withdraw',
        amount: withdrawAmount,
        date: new Date()
    });
    
    await balance.save();
  
      res.json({ message: `Withdrawal successful. New balance is $${balance.balance}`});
  })

// @desc Reset user balance to 0
// @route DELETE /balance/close-account
// @access Private
// did not end up using this // might add in later for future updates

const closeAccount = asyncHandler(async (req, res) => {
    const username = req.query.username;

    // Check if user exists
    const user = await User.findOne({ username }); 

    if (!user) {
        return res.status(400).json({ message: 'User not found'})
    }

    // Check for balance
    const balance = await Balance.findOne({ user: user._id });

    if (!balance) {
        return res.status(400).json({ message: 'Balance not found'})
    }

    // Reset balance
    balance.balance = 0;
    await balance.save();

    res.json({ message: `Account closed. Your balance has been reset to $${balance.balance}`})

})




module.exports = { 
    checkBalance,
    initialDeposit,
    userDeposit,
    userWithdraw,
    closeAccount
 }