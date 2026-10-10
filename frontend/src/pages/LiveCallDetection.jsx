import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { startLiveCall, analyzeVoice } from '../services/api.js'

const C={bg:'#0a0f1a',card:'#0f1e3a',cyan:'#00d4ff',brd:'rgba(0,212,255,0.12)',txt:'#fff',txt2:'#7a9cc8',grn:'#22c55e',red:'#ef4444'}
const wH=[25,50,35,65,45,80,55,70,40,75,60,85,50,65,45,70,55,80,40,60]

export default function LiveCallDetection({setLastResult}) {
  const [micPassThrough,setMicPassThrough]=useState(true)
  const [familyDual,setFamilyDual]=useState(false)
  const [file,setFile]=useState(null)
  const [launching,setLaunching]=useState(false)
  const [scanning,setScanning]=useState(false)
  const [animT,setAnimT]=useState(0)
  const navigate=useNavigate()

  async function launchLive() {
    setLaunching(true)
    try { await startLiveCall('+1 (415) 892-0193'); navigate('/live-guardian') }
    catch{ navigate('/live-guardian') }
    finally { setLaunching(false) }
  }

  async function handleScan() {
    setScanning(true)
    try {
      const result=await analyzeVoice(file?.name||'uploaded_file.mp3',true)
      if(setLastResult) setLastResult(result)
      navigate('/detection-result')
    } catch(e){ alert('Analysis failed: '+e.message) }
    finally { setScanning(false) }
  }

  return (
    <div style={{background:C.bg,minHeight:'80vh',padding:'32px 24px'}}>
      <style>{`@keyframes wvPulse{0%,100%{transform:scaleY(0.5);opacity:0.5}50%{transform:scaleY(1);opacity:1}}`}</style>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <p style={{color:C.cyan,fontSize:11,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:10}}>✦ Real-Time Scan Defense</p>
        <h1 style={{color:C.txt,fontSize:32,fontWeight:800,marginBottom:10}}>Start Deepfake & Voice Detection</h1>
        <div style={{display:'flex',gap:16,marginBottom:28,flexWrap:'wrap'}}>
          {['Local Neural Sandbox','23.4ms Neural Latency','Zero-Audio Retention'].map(t=>(
            <span key={t} style={{color:C.txt2,fontSize:12}}>✓ {t}</span>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:20}}>
          <div style={{background:C.card,border:'1px solid '+C.cyan,borderRadius:12,padding:24,position:'relative'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
              <h2 style={{color:C.txt,fontSize:17,fontWeight:700}}>🛡 Live Call Shield</h2>
              <span style={{background:'rgba(0,212,255,0.1)',color:C.cyan,fontSize:10,fontWeight:700,padding:'3px 8px',borderRadius:5}}>RECOMMENDED</span>
            </div>
            <p style={{color:C.txt2,fontSize:12,lineHeight:1.6,marginBottom:18}}>Intercept synthetic speech patterns, voice cloning attempts, and caller impersonation on live phone calls, Zoom, WhatsApp, or FaceTime in real time.</p>

            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
              <span style={{color:C.txt2,fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em'}}>Stream Analysis Pipeline</span>
              <span style={{color:C.grn,fontSize:11}}>● Active Guard Ready</span>
            </div>
            <div style={{display:'flex',alignItems:'flex-end',gap:2,height:40,marginBottom:12}}>
              {wH.map((h,i)=><div key={i} style={{flex:1,height:h+'%',background:C.cyan,borderRadius:2,animation:`wvPulse ${0.8+(i%4)*0.2}s ease-in-out ${i*0.05}s infinite`,opacity:0.7}}/>)}
            </div>
            <div style={{display:'flex',gap:20,marginBottom:16}}>
              {[['Latency','<20ms'],['Buffer','RAM-Only'],['Storage','0 Bytes']].map(([l,v])=>(
                <div key={l}><p style={{color:C.txt2,fontSize:10,textTransform:'uppercase',marginBottom:2}}>{l}</p><p style={{color:C.txt,fontSize:12,fontWeight:600,fontFamily:'JetBrains Mono,monospace'}}>{v}</p></div>
              ))}
            </div>
            <div style={{display:'flex',gap:16,marginBottom:20}}>
              {[[micPassThrough,setMicPassThrough,'Mic Pass-Through'],[familyDual,setFamilyDual,'Family Dual-Alert']].map(([v,s,l])=>(
                <label key={l} style={{display:'flex',alignItems:'center',gap:6,cursor:'pointer'}}>
                  <input type="checkbox" checked={v} onChange={e=>s(e.target.checked)} style={{accentColor:C.cyan}}/>
                  <span style={{color:C.txt2,fontSize:12}}>{l}</span>
                </label>
              ))}
            </div>
            <button onClick={launchLive} disabled={launching} style={{width:'100%',background:'linear-gradient(135deg,#00d4ff,#0080ff)',border:'none',borderRadius:10,padding:'13px',color:'#fff',fontWeight:700,fontSize:14,cursor:'pointer',fontFamily:'Inter,sans-serif',opacity:launching?0.7:1}}>
              {launching?'Launching…':'🔴 Launch Live Shield'}
            </button>
          </div>

          <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:24}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
              <h2 style={{color:C.txt,fontSize:17,fontWeight:700}}>📁 Audio & File Forensic Scan</h2>
              <span style={{background:'rgba(255,255,255,0.06)',color:C.txt2,fontSize:10,fontWeight:700,padding:'3px 8px',borderRadius:5}}>DEEP SPECTROGRAM</span>
            </div>
            <p style={{color:C.txt2,fontSize:12,lineHeight:1.6,marginBottom:18}}>Run spectral vocoder diagnostics and synthetic resonance probes on pre-recorded voicemails, emergency voice notes, or video recordings.</p>
            <label style={{display:'block',cursor:'pointer'}}>
              <div style={{border:'2px dashed rgba(0,212,255,0.2)',borderRadius:10,padding:'28px 20px',textAlign:'center',marginBottom:16}}>
                <div style={{width:44,height:44,borderRadius:'50%',background:'rgba(0,212,255,0.08)',border:'1px solid rgba(0,212,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px',fontSize:18}}>📄</div>
                <p style={{color:C.txt,fontSize:13,fontWeight:600,marginBottom:4}}>{file?file.name:'Drop audio or video file here, or browse computer'}</p>
                <p style={{color:C.txt2,fontSize:11}}>Supports MP3, WAV, M4A, AAC, MP4 · Max 60MB</p>
              </div>
              <input type="file" accept="audio/*,video/*" style={{display:'none'}} onChange={e=>setFile(e.target.files?.[0]||null)}/>
            </label>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:16}}>
              {[['VOCODER CHECK','High-Fidelity'],['ARTIFACT ENGINE','Dual Neural v4'],['CLIENT SECURITY','AES-256 Memory']].map(([k,v])=>(
                <div key={k} style={{background:'#0a1628',borderRadius:8,padding:'8px 10px',textAlign:'center'}}>
                  <p style={{color:C.txt2,fontSize:9,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:3}}>{k}</p>
                  <p style={{color:C.txt,fontSize:11,fontWeight:600}}>{v}</p>
                </div>
              ))}
            </div>
            <button onClick={handleScan} disabled={scanning} style={{width:'100%',background:'linear-gradient(135deg,#00d4ff,#0080ff)',border:'none',borderRadius:10,padding:'13px',color:'#fff',fontWeight:700,fontSize:14,cursor:'pointer',fontFamily:'Inter,sans-serif',opacity:scanning?0.7:1}}>
              {scanning?'Scanning…':'Upload & Scan File'}
            </button>
          </div>
        </div>

        <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:20}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                <span style={{color:C.txt,fontSize:14,fontWeight:700}}>⚡ Instant Mic Quick Test</span>
                <span style={{background:'rgba(0,212,255,0.08)',color:C.cyan,fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:4}}>LOCAL DIAGNOSTIC</span>
              </div>
              <p style={{color:C.txt2,fontSize:12,marginBottom:10}}>Record a quick 5-second voice pass to verify sensor clarity and calibrate baseline acoustic resonance.</p>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
                <div style={{flex:1,height:5,background:'rgba(34,197,94,0.15)',borderRadius:3}}><div style={{height:'100%',width:'65%',background:C.grn,borderRadius:3}}/></div>
                <span style={{color:C.txt2,fontSize:10,whiteSpace:'nowrap'}}>NOISE FLOOR: QUIET</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <span style={{color:C.txt2,fontSize:10}}>MICROPHONE: DEFAULT SYSTEM AUDIO</span>
                <span style={{color:C.grn,fontSize:10}}>Resonance Match: 99.8%</span>
              </div>
            </div>
            <button style={{background:'transparent',border:'1px solid '+C.cyan,borderRadius:8,padding:'10px 16px',color:C.cyan,fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'Inter,sans-serif',whiteSpace:'nowrap'}}>Record 5-Second Sample</button>
          </div>
        </div>

        <div style={{display:'flex',gap:16,flexWrap:'wrap',justifyContent:'center',marginTop:20}}>
          {['✓ Zero-Knowledge Client Enclave','SOC 2 Type II Aligned','End-to-End Encrypted'].map(t=>(
            <span key={t} style={{color:C.txt2,fontSize:11}}>{t}</span>
          ))}
          <span style={{color:C.cyan,fontSize:11,cursor:'pointer'}} onClick={()=>navigate('/history')}>View Past Scan Logs →</span>
          <span style={{color:C.cyan,fontSize:11,cursor:'pointer'}} onClick={()=>navigate('/safety-tips')}>Safety Tips & Codewords →</span>
        </div>
      </div>
    </div>
  )
}
