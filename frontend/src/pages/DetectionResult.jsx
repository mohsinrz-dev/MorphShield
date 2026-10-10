import { useNavigate } from 'react-router-dom'

const C={bg:'#0a0f1a',card:'#0f1e3a',card2:'#1a2d52',cyan:'#00d4ff',brd:'rgba(0,212,255,0.12)',txt:'#fff',txt2:'#7a9cc8',red:'#ef4444',grn:'#22c55e',amb:'#d97706'}

const DEMO={id:'ms-6425',filename:'urgent_wire_transfer_call.mp3',overallRisk:95,riskLevel:'HIGH',audioRisk:95,videoRisk:0,warning:true,demoMode:true,latencyMs:22,forensics:[{name:'Vocal Pitch & Respiration',status:'SYNTHETIC',score:96,description:'Missing natural respiratory pauses, inhalation decay, and human micro-tremor over prolonged continuous phrases.'},{name:'Frequency Artifacts',status:'ANOMALY DETECTED',score:91,description:'Neural vocoder upper-harmonic bricked cutoff observed precisely at 16kHz with distinct phase cancellation.'},{name:'Room Acoustics & Ambience',status:'SUSPICIOUS',score:74,description:'Synthetic dead silence floor with zero physical environmental reflection or background noise decay.'},{name:'Cadence & Emotion Consistency',status:'MANIPULATED',score:83,description:'Flat effective curve despite aggressive urgent vocabulary, presenting unnatural emotional cadence dissonance.'}]}

const wH=[25,45,30,60,80,90,85,88,75,82,70,65,40,30,20]
const wH2=[20,35,28,45,60,50,55,48,42,38,30,44,52,46,35]

function ScoreCircle({score}) {
  const r=52,c=2*Math.PI*r,dash=(score/100)*c
  const col=score>60?C.red:score>30?C.amb:C.grn
  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10"/>
      <circle cx="70" cy="70" r={r} fill="none" stroke={col} strokeWidth="10" strokeDasharray={`${dash} ${c}`} strokeLinecap="round" transform="rotate(-90 70 70)"/>
      <text x="70" y="62" textAnchor="middle" fill="white" fontSize="26" fontWeight="800" fontFamily="JetBrains Mono,monospace">{score}%</text>
      <text x="70" y="80" textAnchor="middle" fill="#7a9cc8" fontSize="9" fontFamily="Inter,sans-serif">AI LEVEL RISK</text>
    </svg>
  )
}

const statusColors={SYNTHETIC:{color:C.red,bg:'rgba(239,68,68,0.1)'},'ANOMALY DETECTED':{color:C.red,bg:'rgba(239,68,68,0.1)'},SUSPICIOUS:{color:C.amb,bg:'rgba(217,119,6,0.1)'},MANIPULATED:{color:C.amb,bg:'rgba(217,119,6,0.1)'}}
const actions=[{n:1,color:C.red,text:'Hang up or pause communication — Do NOT send money, gift cards, or two-factor authentication codes. Sever the immediate psychological urgency.'},{n:2,color:C.amb,text:'Call their verified number directly — Never trust callback numbers provided in the voice call. Dial the known member stored in your personal phone contact list.'},{n:3,color:C.cyan,text:'Challenge with a family safe-phrase — Ask an intimate question that cannot be found online, or verify through your agreed household duress codeword.'},{n:4,color:C.grn,text:'Report to cyber defence helpline — Submit this audio fingerprint and phone metadata to help protect other potential targets in your local network.'}]

export default function DetectionResult({result}) {
  const navigate=useNavigate()
  const r=result||DEMO
  const isHigh=r.riskLevel==='HIGH'

  return (
    <div style={{background:C.bg,minHeight:'80vh',padding:'32px 24px'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:8}}>
          <p style={{color:C.txt2,fontSize:12}}>Detect &gt; Voice Analyser</p>
          <span style={{background:'rgba(0,212,255,0.08)',border:'1px solid rgba(0,212,255,0.15)',borderRadius:6,padding:'4px 10px',color:C.txt2,fontSize:11,fontFamily:'JetBrains Mono,monospace'}}>CASE #{r.id?.toUpperCase()||'MS-6425'}</span>
        </div>

        {r.demoMode&&<div style={{background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.3)',borderRadius:8,padding:'8px 14px',color:'#f59e0b',fontSize:12,marginBottom:16,display:'flex',gap:8}}><span>DEMO MODE</span><span style={{color:'#7a9cc8'}}>Results shown are simulated for prototype demonstration.</span></div>}

        <div style={{display:'grid',gridTemplateColumns:'1fr 200px',gap:24,marginBottom:20}}>
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,background:isHigh?'rgba(239,68,68,0.12)':'rgba(217,119,6,0.12)',border:`1px solid ${isHigh?C.red:C.amb}`,borderRadius:20,padding:'5px 14px',marginBottom:14}}>
              <span style={{color:isHigh?C.red:C.amb,fontSize:11,fontWeight:700}}>● {isHigh?'HIGH RISK · SYNTHETIC SPEECH CONFIRMED':'SUSPICIOUS · FURTHER ANALYSIS REQUIRED'}</span>
            </div>
            <h1 style={{color:C.txt,fontSize:30,fontWeight:800,marginBottom:12,lineHeight:1.3}}>{isHigh?'High likelihood of synthetic speech generation.':'Suspicious audio patterns detected.'}</h1>
            <p style={{color:C.txt2,fontSize:13,lineHeight:1.7,marginBottom:12}}>This audio matches acoustic artifacts and phase incoherence patterns typical of advanced neural voice cloning systems.</p>
            {isHigh&&<p style={{color:C.red,fontSize:13,fontStyle:'italic',marginBottom:12,fontWeight:500}}>Do not wire funds, approve pending transactions, or reveal personal authentication codes.</p>}
            <p style={{color:C.txt2,fontSize:11}}>✦ Voice Clone Model Pattern: V-Clone-v4 / HiFi-GAN · ◊ ◊</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10}}>
            <ScoreCircle score={r.overallRisk||95}/>
            <div style={{textAlign:'center'}}>
              <p style={{color:C.red,fontSize:12,fontWeight:600}}>● {isHigh?'Critical Security Breach':'Moderate Risk'}</p>
              <p style={{color:C.txt2,fontSize:11,lineHeight:1.5}}>Auditory deception targeted at urgent authorised actions</p>
            </div>
          </div>
        </div>

        <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:20,marginBottom:20}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
            <span style={{color:C.txt,fontSize:14,fontWeight:700}}>✦ Acoustic Inspection Deck</span>
            <span style={{color:C.txt2,fontSize:11}}>SAMPLE: 01:24 TOTAL</span>
          </div>
          <div style={{display:'flex',alignItems:'flex-end',gap:2,height:60,marginBottom:10,position:'relative'}}>
            {wH.map((h,i)=>{
              const flagged=i>=5&&i<=10
              return <div key={i} style={{flex:1,height:h+'%',background:flagged?C.red:'rgba(0,212,255,0.5)',borderRadius:2,position:'relative'}}>
                {i===5&&<div style={{position:'absolute',top:-18,left:0,background:C.red,color:'#fff',fontSize:9,fontWeight:700,padding:'2px 6px',borderRadius:4,whiteSpace:'nowrap'}}>FLAGGED WINDOW</div>}
              </div>
            })}
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <button style={{width:28,height:28,borderRadius:'50%',background:C.cyan,border:'none',color:'#000',cursor:'pointer',fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>▶</button>
              <span style={{color:C.txt2,fontSize:12,fontFamily:'JetBrains Mono,monospace'}}>00:06 / 05:24</span>
              <span style={{color:C.txt2,fontSize:12}}>Artifact cluster: Synthesised vocal fry</span>
            </div>
            <button style={{background:'transparent',border:'1px solid '+C.brd,borderRadius:6,padding:'5px 12px',color:C.cyan,fontSize:12,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Jump to Anomaly →</button>
          </div>
          <p style={{color:C.txt2,fontSize:12,lineHeight:1.6,marginTop:12}}>The highlighted segment displays unnatural high-frequency micro-jitter and phase discontinuity, characteristic of realtime diffusion speech synthesisers trained on stolen voicemail greetings.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:20,marginBottom:20}}>
          <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:20}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:16}}>
              <span style={{color:C.txt,fontSize:14,fontWeight:700}}>Forensic Signal Breakdown</span>
              <span style={{color:C.txt2,fontSize:11}}>4 Neural Vector Probes</span>
            </div>
            {(r.forensics?.length>0?r.forensics:DEMO.forensics).map((f,i)=>{
              const sc=statusColors[f.status]||{color:C.txt2,bg:'rgba(255,255,255,0.05)'}
              return <div key={i} style={{marginBottom:i<3?18:0}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <span style={{fontSize:14}}>🔬</span>
                    <span style={{color:C.txt,fontSize:13,fontWeight:600}}>{f.name}</span>
                  </div>
                  <span style={{background:sc.bg,color:sc.color,fontSize:10,fontWeight:700,padding:'3px 8px',borderRadius:5}}>{f.status}</span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
                  <div style={{flex:1,height:6,background:'rgba(255,255,255,0.06)',borderRadius:3}}><div style={{height:'100%',width:f.score+'%',background:sc.color,borderRadius:3}}/></div>
                  <span style={{color:sc.color,fontSize:11,fontFamily:'JetBrains Mono,monospace',whiteSpace:'nowrap'}}>Score: {f.score}% AI</span>
                </div>
                <p style={{color:C.txt2,fontSize:12,lineHeight:1.5}}>{f.description}</p>
              </div>
            })}
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{background:C.card,border:'1px solid rgba(239,68,68,0.3)',borderRadius:12,padding:20}}>
              <p style={{color:C.red,fontSize:10,fontWeight:700,letterSpacing:'0.08em',marginBottom:8}}>IMMEDIATE PROTOCOL</p>
              <h3 style={{color:C.txt,fontSize:15,fontWeight:700,marginBottom:6}}>What should you do right now?</h3>
              <p style={{color:C.txt2,fontSize:12,marginBottom:14}}>High-pressure urgency is the primary vector for synthetic audio scams. Follow these step-by-step calming countermeasures:</p>
              {actions.map(a=>(
                <div key={a.n} style={{display:'flex',gap:10,marginBottom:12}}>
                  <div style={{width:22,height:22,borderRadius:'50%',background:a.color,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <span style={{color:'#fff',fontSize:11,fontWeight:700}}>{a.n}</span>
                  </div>
                  <p style={{color:C.txt2,fontSize:12,lineHeight:1.5}}>{a.text}</p>
                </div>
              ))}
              <div style={{background:'rgba(0,212,255,0.06)',border:'1px solid rgba(0,212,255,0.15)',borderRadius:8,padding:10,display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:4}}>
                <span style={{color:C.txt2,fontSize:11}}>US Scam Hotline NCS | FTC: 1-877-382-4357</span>
                <button style={{background:C.grn,border:'none',borderRadius:6,padding:'5px 10px',color:'#fff',fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Call Now</button>
              </div>
            </div>

            <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:20}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
                <span style={{fontSize:20}}>👨‍👩‍👧‍👦</span>
                <div>
                  <p style={{color:C.txt,fontSize:14,fontWeight:700}}>Family Emergency Shield</p>
                  <p style={{color:C.txt2,fontSize:11}}>Protect relatives against cloned family emergencies.</p>
                </div>
              </div>
              <p style={{color:C.txt2,fontSize:12,lineHeight:1.5,marginBottom:14}}>MorphShield can send an instant, silent safety push to verified family members confirming your security status so they don't panic if contacted by this synthetic impersonator.</p>
              <button style={{width:'100%',background:'linear-gradient(135deg,#00d4ff,#0080ff)',border:'none',borderRadius:8,padding:'10px',color:'#fff',fontWeight:700,fontSize:13,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Send Defusing Alert to Family Circle</button>
            </div>
          </div>
        </div>

        <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:20}}>
          <div style={{height:6,background:'rgba(0,212,255,0.1)',borderRadius:3,marginBottom:14,overflow:'hidden'}}>
            <div style={{height:'100%',width:'100%',background:`repeating-linear-gradient(90deg,${C.cyan} 0px,${C.cyan} 10px,rgba(0,212,255,0.2) 10px,rgba(0,212,255,0.2) 20px)`,animation:'none'}}/>
          </div>
          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            <button onClick={()=>navigate('/voice-detection')} style={{background:'transparent',border:'1px solid '+C.cyan,borderRadius:8,padding:'9px 20px',color:C.cyan,fontWeight:600,fontSize:13,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>← Check Another File</button>
            <button style={{background:'rgba(255,255,255,0.04)',border:'1px solid '+C.brd,borderRadius:8,padding:'9px 20px',color:C.txt2,fontWeight:600,fontSize:13,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Share Warning</button>
          </div>
        </div>

        <p style={{color:C.txt2,fontSize:11,textAlign:'center',marginTop:16}}>✦ Zero-Knowledge Neural Processing — The audio was analysed in an encrypted enclave and purged immediately from server RAM.</p>
      </div>
    </div>
  )
}
