import { useNavigate } from 'react-router-dom'

const C={bg:'#0a0f1a',card:'#0f1e3a',card2:'#1a2d52',cyan:'#00d4ff',brd:'rgba(0,212,255,0.12)',txt:'#fff',txt2:'#7a9cc8',grn:'#22c55e'}

const wH=[30,55,40,70,35,80,50,65,45,75,55,85,40,60,50]

function MiniWave({color='#00d4ff',heights=wH}) {
  return <div style={{display:'flex',alignItems:'flex-end',gap:3,height:44}}>{heights.map((h,i)=><div key={i} style={{width:4,height:h+'%',background:color,borderRadius:2,opacity:0.85}}/>)}</div>
}

const steps=[
  {n:'01',tag:'Local On-Device Enclave',title:'Connect & Monitor',body:"MorphShield silently monitors incoming calls, audio notes, and video meetings directly on your device. Zero audio leaves your phone.",footer:'✓ No external server routing',visual:<MiniWave heights={[40,60,35,70,45,55,65,50,40,60]} color='#00d4ff'/>},
  {n:'02',tag:'Zero Detection Latency',title:'Instant Acoustic Analysis',body:'Our neural engine scans vocal formants, synthetic frequency glitches, and micro-artifacts in less than 25 milliseconds.',footer:'✦ Dual semantic & temporal models',visual:<MiniWave heights={[55,80,35,90,45,70,60,85,40,75,50,65,80,45,60]} color='#00d4ff'/>},
  {n:'03',tag:'99.8% Clone Intercept',title:'Real-Time Verification & Alert',body:'If a deepfake or voice clone is detected, an immediate discrete alert notifies you before any scam or extortion occurs.',footer:'✓ Zero-friction discreet heads-up',
    visual:<div style={{textAlign:'center'}}><div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:8,padding:'8px 14px',marginBottom:8}}><span style={{color:'#22c55e',fontSize:12}}>●</span><span style={{color:'#22c55e',fontSize:12,fontWeight:600}}>Verified Natural</span></div><p style={{color:'#22c55e',fontSize:11,fontFamily:'JetBrains Mono,monospace',fontWeight:700}}>99.8% CONFIDENCE</p></div>}
]

export default function HowItWorks() {
  const navigate=useNavigate()
  return (
    <div style={{background:C.bg,minHeight:'80vh'}}>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <p style={{color:C.cyan,fontSize:11,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:12}}>✦ Zero-Knowledge Protection</p>
          <h1 style={{color:C.txt,fontSize:38,fontWeight:800,marginBottom:12}}>How MorphShield Works</h1>
          <p style={{color:C.txt2,fontSize:15,maxWidth:520,margin:'0 auto'}}>Real-time AI defense for your voice, video, and calls in three simple steps.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:32}}>
          {steps.map(s=>(
            <div key={s.n} style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:24,display:'flex',flexDirection:'column',gap:14}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <span style={{background:'rgba(0,212,255,0.1)',border:'1px solid rgba(0,212,255,0.2)',borderRadius:8,padding:'4px 10px',color:C.cyan,fontSize:13,fontWeight:700,fontFamily:'JetBrains Mono,monospace'}}>{s.n}</span>
                <span style={{background:'rgba(0,212,255,0.06)',borderRadius:6,padding:'3px 8px',color:C.txt2,fontSize:10,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>{s.tag}</span>
              </div>
              <div style={{height:52,display:'flex',alignItems:'center'}}>{s.visual}</div>
              <div>
                <h3 style={{color:C.txt,fontSize:17,fontWeight:700,marginBottom:8}}>{s.title}</h3>
                <p style={{color:C.txt2,fontSize:13,lineHeight:1.7}}>{s.body}</p>
              </div>
              <p style={{color:C.cyan,fontSize:12,fontWeight:600,marginTop:'auto',paddingTop:12,borderTop:'1px solid '+C.brd}}>{s.footer}</p>
            </div>
          ))}
        </div>

        <div style={{background:'#060e20',border:'1px solid '+C.brd,borderRadius:12,padding:'20px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16,marginBottom:32}}>
          <div style={{display:'flex',alignItems:'center',gap:14}}>
            <span style={{fontSize:22}}>🔒</span>
            <div>
              <p style={{color:C.txt,fontSize:15,fontWeight:700,marginBottom:4}}>Privacy by Design</p>
              <p style={{color:C.txt2,fontSize:13}}>We never record, store, or transmit your voice conversations. All cryptographic checks run in an isolated hardware enclave.</p>
            </div>
          </div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {['Zero Cloud Storage','SOC 2 Aligned','Instant On/Off'].map(t=>(
              <span key={t} style={{background:'rgba(0,212,255,0.08)',border:'1px solid rgba(0,212,255,0.15)',borderRadius:6,padding:'4px 10px',color:C.cyan,fontSize:11,fontWeight:600,whiteSpace:'nowrap'}}>✓ {t}</span>
            ))}
          </div>
        </div>

        <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:'48px 24px',textAlign:'center'}}>
          <h2 style={{color:C.txt,fontSize:26,fontWeight:800,marginBottom:12}}>Ready to protect your conversations?</h2>
          <p style={{color:C.txt2,fontSize:14,marginBottom:28}}>Start intercepting synthetic clones and impersonation attempts today with quiet on-device security.</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <button onClick={()=>navigate('/get-started')} style={{background:'linear-gradient(135deg,#00d4ff,#0080ff)',border:'none',borderRadius:10,padding:'12px 28px',color:'#fff',fontWeight:700,fontSize:14,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Get Started Free</button>
            <button onClick={()=>navigate('/voice-detection')} style={{background:'transparent',border:'1px solid '+C.cyan,borderRadius:10,padding:'12px 28px',color:C.cyan,fontWeight:700,fontSize:14,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Try Voice Test</button>
          </div>
        </div>
      </div>
    </div>
  )
}
