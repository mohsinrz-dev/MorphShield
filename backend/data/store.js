const detectionHistory = [
  {
    id: 'ms-6425',
    filename: 'urgent_wire_transfer_call.mp3',
    type: 'VOICE',
    duration: '0:24',
    date: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    dateLabel: 'Just Now (14:22)',
    overallRisk: 95,
    riskLevel: 'HIGH',
    verdict: 'AI Clone',
    confidence: '94.8%',
    details: 'V-Clone-v4 Neural Vocoder Anomaly, Micro-Q Bricked cutoff',
    action: 'ICS Reported',
    audioRisk: 95,
    videoRisk: 0,
    demoMode: false,
    warning: true,
    forensics: [
      {
        name: 'Vocal Pitch & Respiration',
        status: 'SYNTHETIC',
        score: 96,
        description: 'Missing natural respiratory pauses, inhalation decay, and human micro-tremor over prolonged continuous phrases.'
      },
      {
        name: 'Frequency Artifacts',
        status: 'ANOMALY DETECTED',
        score: 91,
        description: 'Neural vocoder upper-harmonic bricked cutoff observed precisely at 16kHz with distinct phase cancellation.'
      },
      {
        name: 'Room Acoustics & Ambience',
        status: 'SUSPICIOUS',
        score: 74,
        description: 'Synthetic dead silence floor with zero physical environmental reflection or background noise decay.'
      },
      {
        name: 'Cadence & Emotion Consistency',
        status: 'MANIPULATED',
        score: 83,
        description: 'Flat effective curve despite aggressive urgent vocabulary, presenting unnatural emotional cadence dissonance.'
      }
    ]
  },
  {
    id: 'ms-3300',
    filename: '+1 (415) 892-0193',
    type: 'LIVE',
    duration: '02:45',
    date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    dateLabel: 'Today, 11:05',
    overallRisk: 73,
    riskLevel: 'SUSPICIOUS',
    verdict: 'Probe Challenged',
    confidence: '73/100',
    details: 'Cadence Urgency Mismatch, Cloned Timbre 91%',
    action: 'Probe Challenged',
    audioRisk: 73,
    videoRisk: 0,
    demoMode: false,
    warning: true,
    forensics: []
  },
  {
    id: 'ms-8845',
    filename: 'family_voicemail_urgency.mp3',
    type: 'VOICE',
    duration: '0:43',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    dateLabel: 'Yesterday, 19:30',
    overallRisk: 8,
    riskLevel: 'LOW',
    verdict: 'Verified Human',
    confidence: '99.2% Authentic Human',
    details: 'Natural Respiration Decay, Organic Sub-band harmonics',
    action: 'View Certificate',
    audioRisk: 8,
    videoRisk: 0,
    demoMode: false,
    warning: false,
    forensics: []
  },
  {
    id: 'ms-6200',
    filename: 'executive_briefing_clip.mp4',
    type: 'VIDEO',
    duration: '3:36',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    dateLabel: '3 days ago',
    overallRisk: 81,
    riskLevel: 'HIGH',
    verdict: 'Flagged',
    confidence: '84% AI Likelihood',
    details: 'Irregular Blink Cadence 0.4Hz, Jawline Boundary Drift',
    action: 'Visual Forensics',
    audioRisk: 0,
    videoRisk: 81,
    demoMode: false,
    warning: true,
    forensics: []
  },
  {
    id: 'ms-1598',
    filename: 'unknown_caller_bank_alert.wav',
    type: 'VOICE',
    duration: '0:49',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    dateLabel: '5 days ago',
    overallRisk: 98,
    riskLevel: 'HIGH',
    verdict: 'Fraud Intercepted',
    confidence: '98.7% Synthetic',
    details: 'Severe Late Model Signature match, Synthesised Urgency NLP',
    action: 'Automated Alert Transferred',
    audioRisk: 98,
    videoRisk: 0,
    demoMode: false,
    warning: true,
    forensics: []
  },
  {
    id: 'ms-0971',
    filename: 'granddaughter_bail_request.mp3',
    type: 'VOICE',
    duration: '1:13',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    dateLabel: '1 week ago',
    overallRisk: 89,
    riskLevel: 'HIGH',
    verdict: 'Cloned Voice',
    confidence: '89.4% Cloned Voice',
    details: 'Acoustic Burn Inconsistency, Cloned Timbre from Social Media',
    action: 'Incident Report',
    audioRisk: 89,
    videoRisk: 0,
    demoMode: false,
    warning: true,
    forensics: []
  }
]

const settings = {
  audioEnabled: true,
  videoEnabled: true,
  warningEnabled: true,
  demoMode: true,
  warningThreshold: 60,
  forensicDepth: 'STANDARD',
  language: 'AUTO'
}

const currentUser = {
  id: 'user-001',
  email: 'ada.morgan@familydefense.io',
  name: 'Ada Morgan',
  plan: 'Family Guardian',
  isLoggedIn: false
}

const demoScenarios = {
  low: {
    audioRisk: 12,
    videoRisk: 8,
    verdict: 'Verified Human',
    details: 'Natural Respiration Decay, Organic Sub-band harmonics',
    forensics: []
  },
  suspicious: {
    audioRisk: 45,
    videoRisk: 52,
    verdict: 'Probe Required',
    details: 'Cadence Urgency Mismatch, Suspicious Rhythmed pattern',
    forensics: []
  },
  high: {
    audioRisk: 78,
    videoRisk: 83,
    verdict: 'AI Clone Detected',
    details: 'V-Clone-v4 Neural Vocoder Anomaly, Micro-Q Bricked cutoff',
    forensics: detectionHistory[0].forensics
  }
}

function calculateRiskLevel(score) {
  if (score <= 30) return 'LOW'
  if (score <= 60) return 'SUSPICIOUS'
  return 'HIGH'
}

function getStats() {
  return {
    totalScanned: detectionHistory.length,
    authenticHuman: detectionHistory.filter(d => d.riskLevel === 'LOW').length,
    inconclusive: detectionHistory.filter(d => d.riskLevel === 'SUSPICIOUS').length,
    impostorsBlocked: detectionHistory.filter(d => d.riskLevel === 'HIGH').length
  }
}

module.exports = { detectionHistory, settings, currentUser, demoScenarios, calculateRiskLevel, getStats }
