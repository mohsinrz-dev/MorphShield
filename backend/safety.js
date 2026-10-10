const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    coreRules: [
      {
        title: 'Establish an offline family codeword',
        description: 'Pick a private, un-guessable verbal passphrase only known inside your household. Ask for it immediately during any crisis or money transfer request.'
      },
      {
        title: 'Hang up and call back directly',
        description: "Never trust incoming Caller ID. Pause, wait 30 seconds, and dial your contact's saved trusted phone number directly."
      },
      {
        title: 'Ask an un-googleable recent memory question',
        description: 'Pose a trivial question only the real individual could recall from the last 48 hours (e.g. recent dinner, personal errand).'
      },
      {
        title: 'Watch for micro-artifacts',
        description: 'Listen closely for unnatural robotic breathing pauses, flat monotones, or metallic audio clipping. On video, request face turns or hand waves.'
      }
    ],
    redFlags: [
      {
        title: 'Urgent demands for gift cards or wire transfers',
        description: 'Demands for immediate payment through gift cards, cryptocurrency, or peer-to-peer apps are always fraudulent.'
      },
      {
        title: 'Refusal to turn on camera',
        description: 'Making excuses like broken cameras, poor signal, or dead batteries to avoid two-way live video confirmation.'
      },
      {
        title: 'Commands to keep conversations secret',
        description: 'Insisting you do not tell parents, partners, or authorities is a deliberate manipulation tactic to isolate you.'
      }
    ],
    emergencyHelp: [
      {
        title: 'National Elder Fraud Helpline',
        contact: '1-833-372-8311',
        description: 'Free specialised support for seniors and families.'
      },
      {
        title: 'FBI Internet Crime Complaint Center',
        contact: 'ic3.gov',
        description: 'Report cyber fraud incidents and log headers directly.'
      },
      {
        title: 'Federal Trade Commission',
        contact: 'reportfraud.ftc.gov',
        description: 'File official government scam and identity theft reports.'
      }
    ]
  })
})

module.exports = router
