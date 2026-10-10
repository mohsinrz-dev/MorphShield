import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { analyzeVoice, runDemo } from '../services/api.js'

const C={bg:'#0a0f1a',card:'#0f1e3a',card2:'#1a2d52',cyan:'#00d4ff',brd:'rgba(0,212,255,0.12)',txt:'#fff',txt2:'#7a9cc8',grn:'#22c55e',amb:'#d97706',red:'#ef4444'}

const waveHeights=Array.from({length:40},(_,i)=>18+Math.abs(Math.sin(i*0.55+0.8)*55)+Math.abs(Math.sin(i*1.2)*22))

const samples=[
  {file:'grandma_emergency_sample.mp3',desc:'Impersonation bait + High Pitch Drift',badge:{color:C.red,bg:'rgba(239,68,68,0.12)',label:'AI Voice Clone 100% Confidence'},scenario:'high'},
  {file:'bank_support_agent.wav',desc:'Suspicious Rhythmed',badge:{color:C.amb,bg:'rgba(217,119,6,0.12)',label:'Suspicious Rhythmed'},scenario:'suspicious'},
  {file:'colleague_phonecall.m4a',desc:'Dispute anomalies + Normal voice pauses',badge:{color:C.grn,bg:'rgba(34,197,94,0.12)',label:'Authentic Human Voice'},scenario:'low'}
]

export default function VoiceDetection({setLastResult}) {
  const [tab,setTab]=useState('upload')
  const [file,setFile]=useState(null)
  const [forensicDepth,setForensicDepth]=useState(60)
  const [loading,setLoading]=useState(false)
  const [sampleLoading,setSampleLoading]=useState(null)
  const [error,setError]=useState(null)
  const fileRef=useRef()
  const navigate=useNavigate()

  const [animFrame,setAnimFrame]=useState(0)
  useEffect(()=>{const t=setInterval(()=>setAnimFrame(f=>(f+1)%4),600);return()=>clearInterval(t)},[])

  async function handleAnalyze() {
    setLoading(true); setError(null)
    try {
      const result=await analyzeVoice(file?.name||'uploaded_file.mp3',true)
      setLastResult(result)
      navigate('/detection-result')
    } catch(e){ setError(e.message) }
    finally { setLoading(false) }
  }

  async function handleSample(scenario,file) {
    setSampleLoading(scenario); setError(null)
    try {
      const result=await runDemo(scenario)
      result.filename=file
      setLastResult(result)
      navigate('/detection-result')
    } catch(e){ setError(e.message) }
    finally { setSampleLoading(null) }
  }

  return (
    <div style={{background:C.bg,minHeight:'80vh',padding:'32px 24px'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
          <div>
            <p style={{color:C.txt2,fontSize:12,marginBottom:6}}>← <span style={{color:C.cyan,cursor:'pointer'}} onClick={()=>navigate('/detect')}>Back to Analysis</span></p>
            <h1 style={{color:C.txt,fontSize:28,fontWeight:800,marginBottom:6}}>Check a Voice Recording</h1>
            <p style={{color:C.txt2,fontSize:13}}>Submit a voice recording or record a short sample to check for signs of AI-generated speech, cloning, and vocal synthetic artifacts.</p>
          </div>
          <span style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:8,padding:'6px 12px',color:C.grn,fontSize:11,fontWeight:700,whiteSpace:'nowrap'}}>● ACOUSTIC SENTINEL v4.2 ACTIVE</span>
        </div>

        <div style={{display:'flex',gap:4,marginBottom:24}}>
          {[['upload','Upload Audio File'],['record','Record Live Audio']].map(([v,l])=>(
            <button key={v} onClick={()=>setTab(v)} style={{padding:'8px 20px',borderRadius:8,border:'1px solid '+C.brd,background:tab===v?C.card2:'transparent',color:tab===v?C.txt:C.txt2,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>{l}</button>
          ))}
        </div>

        {error&&<div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:8,padding:'10px 14px',color:C.red,fontSize:13,marginBottom:16}}>{error}</div>}

        <div style={{display:'grid',gridTemplateColumns:'1fr 380px',gap:20}}>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:24}}>
              <div onClick={()=>fileRef.current?.click()} style={{border:'2px dashed rgba(0,212,255,0.2)',borderRadius:10,padding:'40px 20px',textAlign:'center',cursor:'pointer',marginBottom:20}}>
                <div style={{width:52,height:52,borderRadius:'50%',background:'rgba(0,212,255,0.1)',border:'1px solid rgba(0,212,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px',fontSize:22}}>🎵</div>
                <p style={{color:C.txt,fontSize:14,fontWeight:600,marginBottom:6}}>{file?file.name:'Drop your audio here or browse from your device'}</p>
                <p style={{color:C.txt2,fontSize:12,lineHeight:1.6}}>Supports real-time decomposition of prosody, breath continuity, and synthetic vocoder glimmers.</p>
              </div>
              <input ref={fileRef} type="file" accept=".mp3,.wav,.m4a,.aac,audio/*" style={{display:'none'}} onChange={e=>setFile(e.target.files?.[0]||null)}/>
              <div style={{display:'flex',gap:10,marginBottom:14}}>
                <button onClick={()=>fileRef.current?.click()} style={{flex:1,background:'transparent',border:'1px solid '+C.cyan,borderRadius:8,padding:'9px',color:C.cyan,fontWeight:600,fontSize:13,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Browse File</button>
                <button style={{flex:1,background:'rgba(255,255,255,0.04)',border:'1px solid '+C.brd,borderRadius:8,padding:'9px',color:C.txt2,fontWeight:600,fontSize:13,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Record Sample</button>
              </div>
              <p style={{color:C.txt2,fontSize:11,textAlign:'center'}}>Supported: MP3, WAV, M4A, AAC · Max file size: 25MB</p>
            </div>

            <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:20}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
                <span style={{color:C.txt,fontSize:13,fontWeight:600}}>Neural Waveform & Acoustic Spectrogram</span>
                <span style={{color:C.txt2,fontSize:10,fontFamily:'JetBrains Mono,monospace'}}>44.1 KHZ PCM FEED</span>
              </div>
              <div style={{display:'flex',alignItems:'flex-end',gap:2,height:56}}>
                {waveHeights.map((h,i)=>(
                  <div key={i} style={{flex:1,height:(h+Math.sin(i*0.4+animFrame)*8)+'%',background:C.cyan,borderRadius:2,opacity:0.7,transition:'height 0.6s ease'}}/>
                ))}
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:8}}>
                <span style={{color:C.txt2,fontSize:10,fontFamily:'JetBrains Mono,monospace'}}>00:00:00</span>
                <span style={{color:C.grn,fontSize:10}}>● Sub-Band Vocoder Phase Synchronised</span>
                <span style={{color:C.txt2,fontSize:10,fontFamily:'JetBrains Mono,monospace'}}>00:15:00</span>
              </div>
            </div>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:20}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                <span style={{color:C.txt,fontSize:14,fontWeight:700}}>Sample Demonstration</span>
                <button style={{background:'rgba(0,212,255,0.08)',border:'1px solid rgba(0,212,255,0.15)',borderRadius:6,padding:'4px 10px',color:C.cyan,fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>PRESET</button>
              </div>
              {samples.map((s,i)=>(
                <div key={i} style={{paddingBottom:i<2?14:0,marginBottom:i<2?14:0,borderBottom:i<2?'1px solid rgba(255,255,255,0.05)':'none'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8,marginBottom:6}}>
                    <div>
                      <p style={{color:C.txt,fontSize:12,fontWeight:600,marginBottom:3}}>{s.file}</p>
                      <p style={{color:C.txt2,fontSize:11}}>{s.desc}</p>
                    </div>
                    <button onClick={()=>handleSample(s.scenario,s.file)} disabled={sampleLoading===s.scenario} style={{background:'rgba(0,212,255,0.1)',border:'1px solid rgba(0,212,255,0.2)',borderRadius:6,padding:'5px 10px',color:C.cyan,fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'Inter,sans-serif',whiteSpace:'nowrap',flexShrink:0,opacity:sampleLoading===s.scenario?0.6:1}}>{sampleLoading===s.scenario?'Testing…':'Test This'}</button>
                  </div>
                  <span style={{background:s.badge.bg,color:s.badge.color,fontSize:10,fontWeight:700,padding:'3px 8px',borderRadius:5}}>● {s.badge.label}</span>
                </div>
              ))}
            </div>

            <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:20}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                <span style={{color:C.txt2,fontSize:12,fontWeight:600}}>Forensic Depth</span>
                <span style={{color:C.txt2,fontSize:11}}>Deep Acoustic Forensics</span>
              </div>
              <input type="range" min="0" max="100" value={forensicDepth} onChange={e=>setForensicDepth(+e.target.value)} style={{width:'100%',accentColor:C.cyan,marginBottom:6}}/>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:16}}>
                <span style={{color:C.txt2,fontSize:10}}>Standard Consumer</span>
                <span style={{color:C.txt2,fontSize:10}}>Deep Forensics</span>
              </div>
              <label style={{color:C.txt2,fontSize:12,fontWeight:600,display:'block',marginBottom:8}}>Spoken Language Context</label>
              <select style={{width:'100%',background:'#0a1628',border:'1px solid '+C.brd,borderRadius:8,padding:'9px 12px',color:C.txt,fontSize:12,outline:'none',fontFamily:'Inter,sans-serif',marginBottom:10}}>
                <option>Auto-Detect Language (Multi-Lingual Only)</option>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
              <p style={{color:C.txt2,fontSize:11,lineHeight:1.5,marginBottom:12}}>Adaptive phoneme weights dynamically tune according to regional cadence.</p>
              <div style={{background:'rgba(0,212,255,0.04)',border:'1px solid rgba(0,212,255,0.1)',borderRadius:8,padding:12}}>
                <p style={{color:C.txt2,fontSize:11,lineHeight:1.6}}>🔒 <strong style={{color:C.txt}}>Privacy Protected In-Memory Analysis.</strong> Your audio sample is processed in isolated volatile memory and automatically destroyed after the authenticity report is generated. No audio is ever saved, indexed, or shared.</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{marginTop:24}}>
          <button onClick={handleAnalyze} disabled={loading} style={{width:'100%',background:'linear-gradient(135deg,#00d4ff,#0080ff)',border:'none',borderRadius:10,padding:16,color:'#fff',fontWeight:700,fontSize:16,cursor:'pointer',marginBottom:12,opacity:loading?0.7:1,fontFamily:'Inter,sans-serif'}}>{loading?'Analysing voice recording…':'Analyse Voice Recording'}</button>
          <p style={{textAlign:'center',cursor:'pointer',color:C.txt2,fontSize:13}} onClick={()=>navigate('/detect')}>← Back to Detection Center</p>
        </div>
      </div>
    </div>
  )
}
