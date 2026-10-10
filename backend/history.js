const express = require('express')
const router = express.Router()
const { detectionHistory, getStats } = require('../data/store')

router.get('/', (req, res) => {
  const { type, limit = 50, sort = 'newest', search = '' } = req.query

  let results = [...detectionHistory]

  if (type && type !== 'ALL') {
    results = results.filter(d => d.type === type.toUpperCase())
  }

  if (search.trim()) {
    const q = search.toLowerCase()
    results = results.filter(d =>
      d.filename.toLowerCase().includes(q) ||
      (d.verdict && d.verdict.toLowerCase().includes(q)) ||
      (d.details && d.details.toLowerCase().includes(q))
    )
  }

  if (sort === 'newest') {
    results.sort((a, b) => new Date(b.date) - new Date(a.date))
  } else if (sort === 'oldest') {
    results.sort((a, b) => new Date(a.date) - new Date(b.date))
  } else if (sort === 'risk_high') {
    results.sort((a, b) => b.overallRisk - a.overallRisk)
  }

  const limited = results.slice(0, parseInt(limit))

  res.json({
    detections: limited,
    total: results.length,
    stats: getStats()
  })
})

router.get('/stats', (req, res) => {
  res.json(getStats())
})

router.get('/:id', (req, res) => {
  const found = detectionHistory.find(d => d.id === req.params.id)
  if (!found) {
    return res.status(404).json({ error: 'Detection not found.' })
  }
  res.json(found)
})

router.delete('/clear', (req, res) => {
  detectionHistory.length = 0
  res.json({ success: true, message: 'Detection cache cleared. Zero-retention confirmed.' })
})

router.delete('/:id', (req, res) => {
  const idx = detectionHistory.findIndex(d => d.id === req.params.id)
  if (idx === -1) {
    return res.status(404).json({ error: 'Detection not found.' })
  }
  detectionHistory.splice(idx, 1)
  res.json({ success: true, message: 'Record deleted.' })
})

module.exports = router
