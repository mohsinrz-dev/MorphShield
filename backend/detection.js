const express = require('express')
const router = express.Router()
const { detectionHistory, settings, demoScenarios, calculateRiskLevel } = require('../data/store')

function buildResponse(id, type, audioRisk, videoRisk, demoMode, filename, duration) {
  const overallRisk = type === 'VIDEO' ? videoRisk : type === 'VOICE' ? audioRisk : Math.round(audioRisk * 0.6 + videoRisk * 0.4)
  const riskLevel = calculateRiskLevel(overallRisk)
  const warning = overallRisk > settings.warningThreshold

  const verdicts = {
    HIGH: { VOICE: 'AI Clone Detected', VIDEO: 'Face Swap Detected', LIVE: 'Synthetic Speech Confirmed' },
    SUSPICIOUS: { VOICE: 'Probe Required', VIDEO: 'Liveness Check Failed', LIVE: 'Suspicious Pattern Active' },
    LOW: { VOICE: 'Verified Human', VIDEO: 'Verified Natural', LIVE: 'Authentic Speaker' }
  }

  return {
    id,
    filename: filename || 'unknown',
    type,
    audioRisk,
    videoRisk,
    overallRisk,
    riskLevel,
    warning,
    demoMode,
    duration: duration || '0:00',
    verdict: verdicts[riskLevel][type] || verdicts[riskLevel]['VOICE'],
    confidence: overallRisk + '%',
    forensics: overallRisk > 60 ? detectionHistory[0].forensics : [],
    latencyMs: Math.floor(Math.random() * 40) + 10,
    timestamp: new Date().toISOString()
  }
}

router.post('/analyze', (req, res) => {
  const { demoMode = true, mediaType = 'VOICE', fileName = 'unknown' } = req.body

  let audioRisk = 0
  let videoRisk = 0

  if (demoMode) {
    const keys = Object.keys(demoScenarios)
    const s = demoScenarios[keys[Math.floor(Math.random() * keys.length)]]
    audioRisk = s.audioRisk
    videoRisk = s.videoRisk
  }

  const result = buildResponse('ms-' + Date.now(), mediaType.toUpperCase(), audioRisk, videoRisk, demoMode, fileName, null)
  res.json(result)
})

router.post('/demo', (req, res) => {
  const body = req.body || {}
  const { scenario = null } = body
  const keys = Object.keys(demoScenarios)
  const chosen = scenario && demoScenarios[scenario] ? scenario : keys[Math.floor(Math.random() * keys.length)]
  const s = demoScenarios[chosen]

  const overallRisk = Math.round(s.audioRisk * 0.5 + s.videoRisk * 0.5)
  const riskLevel = calculateRiskLevel(overallRisk)

  res.json({
    id: 'ms-demo-' + Date.now(),
    filename: 'demo_sample.mp3',
    type: 'VOICE',
    audioRisk: s.audioRisk,
    videoRisk: s.videoRisk,
    overallRisk,
    riskLevel,
    warning: overallRisk > settings.warningThreshold,
    demoMode: true,
    scenario: chosen,
    verdict: s.verdict,
    details: s.details,
    confidence: overallRisk + '%',
    forensics: s.forensics,
    latencyMs: Math.floor(Math.random() * 40) + 10,
    timestamp: new Date().toISOString()
  })
})

router.post('/voice', (req, res) => {
  const { demoMode = true, fileName = 'audio_file.mp3', duration = '0:15', forensicDepth = 'STANDARD' } = req.body

  let audioRisk = 0
  if (demoMode) {
    const keys = Object.keys(demoScenarios)
    audioRisk = demoScenarios[keys[Math.floor(Math.random() * keys.length)]].audioRisk
  }

  const result = buildResponse('ms-' + Date.now(), 'VOICE', audioRisk, 0, demoMode, fileName, duration)

  detectionHistory.unshift({
    ...result,
    dateLabel: 'Just Now',
    details: demoMode ? 'Demo Mode Analysis' : 'Live Analysis',
    action: result.riskLevel === 'HIGH' ? 'ICS Reported' : result.riskLevel === 'SUSPICIOUS' ? 'Probe Required' : 'View Certificate'
  })

  res.json(result)
})

router.post('/video', (req, res) => {
  const { demoMode = true, fileName = 'video_file.mp4', duration = '0:30' } = req.body

  let videoRisk = 0
  if (demoMode) {
    const keys = Object.keys(demoScenarios)
    videoRisk = demoScenarios[keys[Math.floor(Math.random() * keys.length)]].videoRisk
  }

  const result = buildResponse('ms-vid-' + Date.now(), 'VIDEO', 0, videoRisk, demoMode, fileName, duration)

  detectionHistory.unshift({
    ...result,
    dateLabel: 'Just Now',
    details: demoMode ? 'Demo Mode Visual Analysis' : 'Live Visual Analysis',
    action: result.riskLevel === 'HIGH' ? 'Visual Forensics' : 'View Certificate'
  })

  res.json(result)
})

router.post('/live/start', (req, res) => {
  const { callerNumber = 'Unknown', channelMode = 'SPEAKERPHONE' } = req.body

  res.json({
    sessionId: 'live-' + Date.now(),
    status: 'MONITORING',
    callerNumber,
    channelMode,
    startedAt: new Date().toISOString(),
    latency: '18ms',
    bufferMode: 'RAM-Only',
    storage: '0 Bytes Stored',
    neuralScanActive: true,
    message: 'Live Call Guardian activated. Monitoring for synthetic speech patterns.'
  })
})

router.post('/live/stop', (req, res) => {
  const { sessionId = 'unknown', duration = '00:00', finalRisk = 0 } = req.body

  if (finalRisk > 0) {
    detectionHistory.unshift({
      id: sessionId,
      filename: 'Live Call ' + new Date().toLocaleTimeString(),
      type: 'LIVE',
      duration,
      date: new Date().toISOString(),
      dateLabel: 'Just Now',
      overallRisk: finalRisk,
      riskLevel: calculateRiskLevel(finalRisk),
      verdict: finalRisk > 60 ? 'Synthetic Speech Confirmed' : finalRisk > 30 ? 'Suspicious Pattern' : 'Authentic Speaker',
      confidence: finalRisk + '%',
      details: 'Live call monitoring session',
      action: finalRisk > 60 ? 'ICS Reported' : 'View Log',
      audioRisk: finalRisk,
      videoRisk: 0,
      demoMode: false,
      warning: finalRisk > settings.warningThreshold,
      forensics: []
    })
  }

  res.json({
    sessionId,
    status: 'ENDED',
    duration,
    finalRisk,
    message: 'Session ended. No audio retained per zero-retention policy.',
    zeroRetentionConfirmed: true
  })
})

router.post('/live/assessment', (req, res) => {
  res.json({
    syntheticArtifactScore: 72,
    authenticRange: '0-30',
    suspiciousRange: '31-70',
    deepfakeRange: '71+',
    currentCategory: 'SUSPICIOUS',
    speechToText: [
      { speaker: 'Caller', text: '"Hello, this is David from your primary card fraud department. Urgent wire verification required immediately, do not hang up or call back as this incident case will lock."', flagged: true },
      { speaker: 'System', text: '"I need you to open your authentication app and recite the 6-digit confirmation prompt, now."', flagged: true }
    ],
    riskIndicators: ['Synthesised Urgency NLP', 'Cadence Mismatch', 'High Pressure Pattern'],
    latency: '18ms',
    bufferPurge: '30s',
    cipher: 'AES-256'
  })
})

router.get('/:id', (req, res) => {
  const found = detectionHistory.find(d => d.id === req.params.id)
  if (!found) {
    return res.status(404).json({ error: 'Detection result not found.', id: req.params.id })
  }
  res.json(found)
})

module.exports = router
