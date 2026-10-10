const express = require('express')
const router = express.Router()
const { settings } = require('../data/store')

router.get('/', (req, res) => {
  res.json(settings)
})

router.put('/', (req, res) => {
  const { warningThreshold, audioEnabled, videoEnabled, warningEnabled, demoMode, forensicDepth, language } = req.body

  if (warningThreshold !== undefined) {
    const t = parseInt(warningThreshold)
    if (isNaN(t) || t < 1 || t > 99) {
      return res.status(400).json({ error: 'Warning threshold must be between 1 and 99.' })
    }
    settings.warningThreshold = t
  }

  if (audioEnabled !== undefined) settings.audioEnabled = Boolean(audioEnabled)
  if (videoEnabled !== undefined) settings.videoEnabled = Boolean(videoEnabled)
  if (warningEnabled !== undefined) settings.warningEnabled = Boolean(warningEnabled)
  if (demoMode !== undefined) settings.demoMode = Boolean(demoMode)
  if (forensicDepth !== undefined) {
    const valid = ['STANDARD', 'DEEP']
    if (!valid.includes(forensicDepth)) {
      return res.status(400).json({ error: 'forensicDepth must be STANDARD or DEEP.' })
    }
    settings.forensicDepth = forensicDepth
  }
  if (language !== undefined) settings.language = language

  res.json(settings)
})

module.exports = router
