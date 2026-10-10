const express = require('express')
const router = express.Router()

const plans = [
  {
    id: 'family-guardian',
    name: 'Family Guardian',
    tag: 'MOST POPULAR',
    description: 'Complete dynamic perimeter for entire households.',
    monthlyPrice: 9.99,
    annualPrice: 6.99,
    billingNote: 'Billed annually ($83.88/yr)',
    maxDevices: 5,
    features: [
      'Up to 5 family devices',
      'Real-Time Voice Call Intercept',
      'Shared Duress Codeword Vault',
      'WhatsApp & FaceTime Guardian'
    ]
  },
  {
    id: 'individual-pro',
    name: 'Individual Pro',
    tag: null,
    description: 'Targeted biometric shield for solo professionals.',
    monthlyPrice: 4.99,
    annualPrice: 3.49,
    billingNote: 'Billed annually ($41.88/yr)',
    maxDevices: 2,
    features: [
      '1 member / 2 active devices',
      'Video & Voice Forensic Scanner',
      'Phone Calls & Watermarks',
      'Instant Incident Audit Export'
    ]
  }
]

router.get('/', (req, res) => {
  res.json(plans)
})

router.get('/:id', (req, res) => {
  const found = plans.find(p => p.id === req.params.id)
  if (!found) return res.status(404).json({ error: 'Plan not found.' })
  res.json(found)
})

module.exports = router
