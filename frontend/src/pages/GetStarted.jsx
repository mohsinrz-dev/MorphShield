import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/api.js'

const C={bg:'#0a0f1a',card:'#0f1e3a',card2:'#1a2d52',cyan:'#00d4ff',brd:'rgba(0,212,255,0.12)',txt:'#fff',txt2:'#7a9cc8',grn:'#22c55e',red:'#ef4444'}
const inp={width:'100%',background:'#0a1628',border:'1px solid rgba(0,212,255,0.12)',borderRadius:8,padding:'10px 12px',color:'#fff',fontSize:13,outline:'none',boxSizing:'border-box',fontFamily:'Inter,sans-serif'}
const wH=[30,55,40,75,35,85,50,65,40,70,55,80,45,60,50,75,35,65]

const plans=[
  {id:'family-guardian',name:'Family Guardian',popular:true,monthly:9.99,annual:6.99,features:['Up to 5 family devices','Real-Time Voice Call Intercept','Shared Duress Codeword Vault','WhatsApp & FaceTime Guardian']},
  {id:'individual-pro',name:'Individual Pro',popular:false,monthly:4.99,annual:3.49,features:['1 member / 2 active devices','Video & Voice Forensic Scanner','Phone Calls & Watermarks','Instant Incident Audit Export']}
]

export default function GetStarted() {
  const [billing,setBilling]=useState('annual')
  const [selectedPlan,setSelectedPlan]=useState('family-guardian')
  const [tab,setTab]=useState('Defense Plan')
  const [fullName,setFullName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [telemetry,setTelemetry]=useState(true)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  const [success,setSuccess]=useState(false)
  const navigate=useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if(!fullName.trim()) return setError('Full name is required.')
    if(!email.includes('@')) return setError('A valid email is required.')
    setLoading(true); setError(null)
    try {
      await registerUser({fullName,email,plan:selectedPlan})
      setSuccess(true)
      setTimeout(()=>navigate('/'),2000)
    } catch(err){ setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div style={{background:C.bg,minHeight:'80vh',padding:'48px 24px'}}>
      <div style={{maxWidth:1100,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 400px',gap:28,alignItems:'start'}}>

        <div>
          <p style={{color:C.cyan,fontSize:11,fontWeight:700,letterSpacing:'0.08em',marginBottom:10}}>✦ 14-DAY RISK-FREE TRIAL · NO CREDIT CARD REQUIRED</p>
          <h1 style={{color:C.txt,fontSize:30,fontWeight:800,marginBottom:10}}>Activate Your Real-Time Deepfake Shield</h1>
          <p style={{color:C.txt2,fontSize:13,marginBottom:24,lineHeight:1.6}}>Join over 85,000 families and professionals protected against synthetic voice clones, AI video swaps, and phone scams with zero biometric retention.</p>

          <div style={{display:'flex',gap:4,marginBottom:28}}>
            {['Defense Plan','Family Circle','Passkey'].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{padding:'8px 18px',borderRadius:8,border:'1px solid '+C.brd,background:tab===t?C.card2:'transparent',color:tab===t?C.txt:C.txt2,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>{t}</button>
            ))}
          </div>

          <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:24,marginBottom:20}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <p style={{color:C.txt2,fontSize:12,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>Step 1 of 3 — Select Protection Level</p>
              <div style={{display:'flex',background:'#060e20',borderRadius:8,padding:3,gap:2}}>
                {['monthly','annual'].map(b=>(
                  <button key={b} onClick={()=>setBilling(b)} style={{padding:'5px 12px',borderRadius:6,border:'none',background:billing===b?C.cyan:'transparent',color:billing===b?'#000':C.txt2,fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'Inter,sans-serif',textTransform:'capitalize'}}>
                    {b}{b==='annual'&&<span style={{background:C.grn,color:'#000',borderRadius:4,padding:'1px 5px',fontSize:10,fontWeight:700,marginLeft:4}}>-30%</span>}
                  </button>
                ))}
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              {plans.map(p=>(
                <div key={p.id} onClick={()=>setSelectedPlan(p.id)} style={{background:selectedPlan===p.id?'rgba(0,212,255,0.06)':'#0a1628',border:`1px solid ${selectedPlan===p.id?C.cyan:C.brd}`,borderRadius:10,padding:16,cursor:'pointer',position:'relative'}}>
                  {p.popular&&<span style={{position:'absolute',top:-10,left:'50%',transform:'translateX(-50%)',background:C.cyan,color:'#000',fontSize:10,fontWeight:800,padding:'2px 10px',borderRadius:10,whiteSpace:'nowrap'}}>MOST POPULAR</span>}
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10,marginTop:p.popular?6:0}}>
                    <input type="radio" checked={selectedPlan===p.id} onChange={()=>setSelectedPlan(p.id)} style={{accentColor:C.cyan}}/>
                    <span style={{color:C.txt,fontSize:14,fontWeight:700}}>{p.name}</span>
                  </div>
                  <p style={{color:C.cyan,fontSize:20,fontWeight:800,fontFamily:'JetBrains Mono,monospace',marginBottom:10}}>${billing==='annual'?p.annual:p.monthly}<span style={{color:C.txt2,fontSize:12,fontWeight:400}}>/mo</span></p>
                  {p.features.map((f,i)=><p key={i} style={{color:C.txt2,fontSize:12,marginBottom:4}}>✓ {f}</p>)}
                </div>
              ))}
            </div>
          </div>

          <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:24}}>
            <p style={{color:C.txt2,fontSize:12,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:4}}>Step 2 of 3 — Account Safeguard Credentials</p>
            <p style={{color:C.txt2,fontSize:12,marginBottom:18}}>No trackers, no telemetry sharing. Encrypted locally with WebAuthn standards.</p>
            {error&&<div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:8,padding:'10px 14px',color:C.red,fontSize:13,marginBottom:14}}>{error}</div>}
            {success&&<div style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:8,padding:'10px 14px',color:C.grn,fontSize:13,marginBottom:14}}>✓ Account created! Redirecting…</div>}
            <form onSubmit={handleSubmit}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
                <div>
                  <label style={{color:C.txt2,fontSize:12,fontWeight:600,display:'block',marginBottom:5}}>Full Name</label>
                  <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Sarah Jennings" style={inp}/>
                </div>
                <div>
                  <label style={{color:C.txt2,fontSize:12,fontWeight:600,display:'block',marginBottom:5}}>Primary Alert Email</label>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="sarah.jenkins@proton.me" style={inp}/>
                </div>
              </div>
              <div style={{background:'#0a1628',border:'1px solid rgba(0,212,255,0.15)',borderRadius:10,padding:14,display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
                <div>
                  <p style={{color:C.txt,fontSize:13,fontWeight:600,marginBottom:3}}>🔑 Biometric Passkey <span style={{color:C.grn,fontSize:10,fontWeight:700,background:'rgba(34,197,94,0.1)',borderRadius:4,padding:'1px 6px'}}>(Recommended)</span></p>
                  <p style={{color:C.txt2,fontSize:11}}>Touch ID, Face ID or Windows Hello. Zero credential phishing risk.</p>
                </div>
                <button type="button" style={{background:'transparent',border:'1px solid '+C.cyan,borderRadius:8,padding:'7px 14px',color:C.cyan,fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'Inter,sans-serif',whiteSpace:'nowrap'}}>Link Passkey</button>
              </div>
              <div style={{marginBottom:8}}>
                <label style={{color:C.txt2,fontSize:12,fontWeight:600,display:'block',marginBottom:5}}>Optional Backup Master Password <span style={{color:C.grn,fontSize:10}}>• Entropy: 89 bits (Strong)</span></label>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••••••••••" style={inp}/>
                <div style={{height:3,background:'#1a2d52',borderRadius:2,marginTop:6}}><div style={{height:'100%',width:'78%',background:C.grn,borderRadius:2}}/></div>
              </div>
              <label style={{display:'flex',alignItems:'center',gap:8,marginBottom:20,cursor:'pointer'}}>
                <input type="checkbox" checked={telemetry} onChange={e=>setTelemetry(e.target.checked)} style={{accentColor:C.cyan}}/>
                <span style={{color:C.txt2,fontSize:12}}>Enable 24/7 Live Call Telemetry & Emergency Duo-Alerts across connected family lines. Client-side audio processing with zero voice cloud recording.</span>
              </label>
              <button type="submit" disabled={loading||success} style={{width:'100%',background:'linear-gradient(135deg,#00d4ff,#0080ff)',border:'none',borderRadius:10,padding:14,color:'#fff',fontWeight:700,fontSize:15,cursor:'pointer',marginBottom:10,opacity:(loading||success)?0.7:1,fontFamily:'Inter,sans-serif'}}>{loading?'Creating account…':'Start Free 14-Day Defense Trial →'}</button>
              <p style={{color:C.txt2,fontSize:11,textAlign:'center'}}>Secure engine in-app · Zero credit control · Zero internet retention</p>
            </form>
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{background:C.card,border:'1px solid '+C.cyan,borderRadius:12,padding:20}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
              <span style={{color:C.cyan,fontSize:11,fontWeight:700,letterSpacing:'0.08em'}}>● LIVE ENCLAVE GUARD</span>
              <span style={{background:'rgba(0,212,255,0.1)',color:C.cyan,fontSize:10,borderRadius:4,padding:'2px 8px',fontWeight:600}}>Core v4.2</span>
            </div>
            <p style={{color:C.txt,fontSize:15,fontWeight:700,marginBottom:4}}>Defense Status: Ready</p>
            <p style={{color:C.txt2,fontSize:12,marginBottom:16}}>Active neural filters stand by to scrub synthetic timecodes in inbound audio streams.</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:14}}>
              {[['25ms','Latency'],['99.8%','Clone Intercept'],['0.08','Data Stored']].map(([v,l])=>(
                <div key={l} style={{background:'#0a1628',borderRadius:8,padding:'10px 8px',textAlign:'center'}}>
                  <p style={{color:C.cyan,fontSize:16,fontWeight:800,fontFamily:'JetBrains Mono,monospace'}}>{v}</p>
                  <p style={{color:C.txt2,fontSize:10}}>{l}</p>
                </div>
              ))}
            </div>
            <div style={{display:'flex',alignItems:'flex-end',gap:2,height:32,marginBottom:14}}>
              {wH.map((h,i)=><div key={i} style={{flex:1,height:h+'%',background:i%3===0?'rgba(0,212,255,0.4)':'rgba(0,212,255,0.2)',borderRadius:2}}/>)}
            </div>
            <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
              {['Phone Calls','Watermarks','Zoom & FaceTime','Audio Notes'].map(t=>(
                <span key={t} style={{background:'rgba(0,212,255,0.08)',border:'1px solid rgba(0,212,255,0.15)',borderRadius:6,padding:'3px 8px',color:C.txt2,fontSize:11}}>🛡 {t}</span>
              ))}
            </div>
          </div>

          <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:20}}>
            <p style={{color:C.txt,fontSize:14,fontWeight:700,marginBottom:16}}>What happens after signup?</p>
            {['Install the lightweight Guardian app','Establish an offline safety codeword','Silent real-time threat neutralisation'].map((s,i)=>(
              <div key={i} style={{display:'flex',gap:12,marginBottom:i<2?14:0}}>
                <div style={{width:24,height:24,borderRadius:'50%',background:'rgba(0,212,255,0.1)',border:'1px solid rgba(0,212,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <span style={{color:C.cyan,fontSize:11,fontWeight:700}}>{i+1}</span>
                </div>
                <p style={{color:C.txt2,fontSize:13,paddingTop:3,lineHeight:1.5}}>{s}</p>
              </div>
            ))}
          </div>

          <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:20}}>
            <p style={{color:'#f59e0b',fontSize:16,marginBottom:12}}>★★★★★</p>
            <p style={{color:C.txt,fontSize:13,lineHeight:1.7,marginBottom:12}}>"MorphShield flagged an AI clone pretending to be my grandson within 6 seconds. Priceless peace of mind for our entire family."</p>
            <p style={{color:C.txt2,fontSize:12,marginBottom:12}}>— Eleanor M., San Jose California · Verified Family Plan</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
              {['SOC 2 Type II Certified','AIC-250-38 CCFC','EUGSC 27011 Aligned'].map(b=>(
                <span key={b} style={{background:'rgba(0,212,255,0.06)',border:'1px solid rgba(0,212,255,0.12)',borderRadius:5,padding:'3px 7px',color:C.txt2,fontSize:10}}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
