const express = require('express')
const router = express.Router()
const { currentUser } = require('../data/store')

router.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !email.trim()) {
    return res.status(400).json({ error: 'Email is required.' })
  }
  if (!password || password.length < 4) {
    return res.status(400).json({ error: 'Password must be at least 4 characters.' })
  }

  currentUser.isLoggedIn = true
  currentUser.email = email.trim()

  res.json({
    success: true,
    token: 'morphshield-demo-token-' + Date.now(),
    user: {
      id: currentUser.id,
      email: currentUser.email,
      name: currentUser.name,
      plan: currentUser.plan
    }
  })
})

router.post('/logout', (req, res) => {
  currentUser.isLoggedIn = false
  res.json({ success: true, message: 'Logged out.' })
})

router.get('/me', (req, res) => {
  res.json({
    isLoggedIn: currentUser.isLoggedIn,
    user: currentUser.isLoggedIn ? {
      id: currentUser.id,
      email: currentUser.email,
      name: currentUser.name,
      plan: currentUser.plan
    } : null
  })
})

router.post('/register', (req, res) => {
  const { fullName, email, plan = 'Individual Pro', biometricEnabled = false } = req.body

  if (!fullName || !fullName.trim()) {
    return res.status(400).json({ error: 'Full name is required.' })
  }
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email address is required.' })
  }

  currentUser.name = fullName.trim()
  currentUser.email = email.trim()
  currentUser.plan = plan
  currentUser.isLoggedIn = true

  res.status(201).json({
    success: true,
    message: '14-day trial activated. No credit card required.',
    token: 'morphshield-demo-token-' + Date.now(),
    user: {
      id: currentUser.id,
      email: currentUser.email,
      name: currentUser.name,
      plan: currentUser.plan,
      trialDays: 14
    },
    nextSteps: [
      'Install the lightweight Guardian app',
      'Establish an offline safety codeword',
      'Silent real-time threat neutralisation is now active'
    ]
  })
})

module.exports = router
