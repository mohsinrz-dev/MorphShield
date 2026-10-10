const express = require('express')
const cors = require('cors')

const healthRouter = require('./routes/health')
const authRouter = require('./routes/auth')
const detectionRouter = require('./routes/detection')
const historyRouter = require('./routes/history')
const settingsRouter = require('./routes/settings')
const robustnessRouter = require('./routes/robustness')
const plansRouter = require('./routes/plans')
const safetyRouter = require('./routes/safety')

const app = express()
const PORT = 8080

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/health', healthRouter)
app.use('/api/auth', authRouter)
app.use('/api/detection', detectionRouter)
app.use('/api/history', historyRouter)
app.use('/api/settings', settingsRouter)
app.use('/api/robustness', robustnessRouter)
app.use('/api/plans', plansRouter)
app.use('/api/safety', safetyRouter)

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found', path: req.path })
})

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(``)
  console.log(`  MorphShield Backend — ACTIVE SCAM PROTECTION GRID`)
  console.log(`  Running at: http://localhost:${PORT}`)
  console.log(`  API health: http://localhost:${PORT}/api/health`)
  console.log(``)
})
