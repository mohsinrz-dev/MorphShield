import { useState } from 'react'
import { saveSettings } from '../services/api.js'
import { Card } from '../components/shared.jsx'

function Toggle({ value, onChange, label, desc }) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-slate-800 last:border-0">
      <div className="pr-4">
        <p className="text-white text-sm font-medium">{label}</p>
        {desc && <p className="text-slate-500 text-xs mt-0.5">{desc}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className="relative w-10 h-5 rounded-full transition-colors shrink-0 mt-0.5"
        style={{ background: value ? '#0284c7' : '#1e293b' }}
      >
        <span
          className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
          style={{ transform: value ? 'translateX(21px)' : 'translateX(2px)' }}
        />
      </button>
    </div>
  )
}

export default function Settings({ settings, setSettings, demoMode, setDemoMode }) {
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState(null)

  async function handleSave() {
    setSaved(false)
    setSaveError(null)
    try {
      await saveSettings({ ...settings, demoMode })
      setSaved(true)
    } catch {
      setSaveError('Backend unavailable. Settings applied locally only.')
      setSaved(true)
    } finally {
      setTimeout(() => { setSaved(false); setSaveError(null) }, 3000)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold text-white mb-6">Settings</h1>
      <Card>
        <div className="mb-5 pb-5 border-b border-slate-800">
          <label className="block text-white text-sm font-medium mb-1">
            Warning Threshold — <span className="font-mono text-sky-400">{settings.threshold}</span>
          </label>
          <p className="text-slate-500 text-xs mb-3">Risk scores above this value trigger a warning. Prototype default: 60.</p>
          <input
            type="range"
            min="1"
            max="99"
            value={settings.threshold}
            onChange={e => setSettings(s => ({ ...s, threshold: Number(e.target.value) }))}
          />
          <div className="flex justify-between text-xs text-slate-700 mt-1"><span>1</span><span>99</span></div>
        </div>
        <Toggle
          value={settings.audioEnabled}
          onChange={v => setSettings(s => ({ ...s, audioEnabled: v }))}
          label="Audio Detection"
          desc="Include audio signal analysis in the risk calculation."
        />
        <Toggle
          value={settings.videoEnabled}
          onChange={v => setSettings(s => ({ ...s, videoEnabled: v }))}
          label="Video Detection"
          desc="Include video frame analysis in the risk calculation."
        />
        <Toggle
          value={settings.warningEnabled}
          onChange={v => setSettings(s => ({ ...s, warningEnabled: v }))}
          label="Warning Notifications"
          desc="Show a warning card when risk exceeds the threshold."
        />
        <Toggle
          value={demoMode}
          onChange={setDemoMode}
          label="Demo Mode"
          desc="Use simulated detection values. The Demo Mode label always appears on results."
        />
        <div className="pt-4 flex items-center gap-3">
          <button
            onClick={handleSave}
            className="bg-sky-600 hover:bg-sky-500 text-white font-medium px-5 py-2 rounded-lg text-sm transition-colors"
          >
            Save Changes
          </button>
          {saved && (
            <span className={`text-xs ${saveError ? 'text-amber-400' : 'text-green-400'}`}>
              {saveError || 'Saved'}
            </span>
          )}
        </div>
      </Card>
    </div>
  )
}
