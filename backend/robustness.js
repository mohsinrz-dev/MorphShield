const express = require('express')
const router = express.Router()

const SUPPORTED_TESTS = ['ORIGINAL', 'COMPRESSION', 'NOISY_AUDIO', 'LOW_RESOLUTION', 'LIGHTING_VARIATION']

router.post('/test', (req, res) => {
  const start = Date.now()
  const { testType } = req.body

  if (!testType || !testType.trim()) {
    return res.status(400).json({ error: 'testType is required.' })
  }

  const normalized = testType.trim().toUpperCase()

  if (!SUPPORTED_TESTS.includes(normalized)) {
    return res.status(400).json({
      error: 'Unknown test type: ' + testType,
      supported: SUPPORTED_TESTS
    })
  }

  res.json({
    testType: normalized,
    status: 'NOT_IMPLEMENTED',
    riskScore: null,
    latencyMs: Date.now() - start,
    message: 'Test type registered. Connect an AI detection model to enable live robustness analysis.'
  })
})

router.get('/types', (req, res) => {
  res.json({ supported: SUPPORTED_TESTS })
})

module.exports = router
