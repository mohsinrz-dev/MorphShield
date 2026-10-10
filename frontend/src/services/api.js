const BACKEND_URL = 'http://localhost:8080'

async function request(path, method = 'GET', body = null) {
  const options = { method, headers: { 'Content-Type': 'application/json' } }
  if (body !== null) options.body = JSON.stringify(body)
  const response = await fetch(BACKEND_URL + path, options)
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error || 'Request failed: HTTP ' + response.status)
  }
  return response.json()
}

export const checkHealth = () => request('/api/health')
export const analyzeMedia = (d) => request('/api/detection/analyze', 'POST', d)
export const runDemo = (scenario = null) => request('/api/detection/demo', 'POST', scenario ? { scenario } : {})
export const analyzeVoice = (fileName, demoMode = true) => request('/api/detection/voice', 'POST', { fileName, demoMode })
export const analyzeVideo = (fileName, demoMode = true) => request('/api/detection/video', 'POST', { fileName, demoMode })
export const getSettings = () => request('/api/settings')
export const saveSettings = (s) => request('/api/settings', 'PUT', s)
export const runRobustnessTest = (testType) => request('/api/robustness/test', 'POST', { testType })
export const loginUser = (email, password) => request('/api/auth/login', 'POST', { email, password })
export const registerUser = (data) => request('/api/auth/register', 'POST', data)
export const getSafetyTips = () => request('/api/safety')
export const getHistory = (params = {}) => { const q = new URLSearchParams(params).toString(); return request('/api/history' + (q ? '?' + q : '')) }
export const clearHistory = () => request('/api/history/clear', 'DELETE')
export const deleteHistoryItem = (id) => request('/api/history/' + id, 'DELETE')
export const startLiveCall = (callerNumber) => request('/api/detection/live/start', 'POST', { callerNumber })
export const stopLiveCall = (sessionId, duration, finalRisk) => request('/api/detection/live/stop', 'POST', { sessionId, duration, finalRisk })
export const getLiveAssessment = () => request('/api/detection/live/assessment', 'POST', {})
export const getPlans = () => request('/api/plans')
