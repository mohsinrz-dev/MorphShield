import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { stopLiveCall, getLiveAssessment } from '../services/api.js'

const C={bg:'#0a0f1a',card:'#0f1e3a',card2:'#1a2d52',cyan:'#00d4ff',brd:'rgba(0,212,255,0.12)',txt:'#fff',txt2:'#7a9cc8',grn:'#22c55e',amb:'#d97706',red:'#ef4444'}

const wH=[35,60,45,80,50,90,70,55,85,40,75,60,50,80,45,65,70,55,85,40,60,75,50,70,45]

function Waveform({animated=false}) {
  const [frame,setFrame]=useState(0)
  useEffect(()=>{ if(!animated) return; const t=setInterval(()=>setFrame(f=>f+1),150); return()=>clearInterval(t) },[animated])
  return (
    <div style={{display:'flex',alignItems:'flex-end',gap:2,height:52}}>
      {wH.map((h,i)=>{
        const off=Math.sin(i*0.5+frame*0.3)*15
        return <div key={i} style={{flex:1,height:Math.max(10,h+off)+'%',background:i%3===0?C.red:C.cyan,borderRadius:2,opacity:0.75,transition:'height 0.15s ease'}}/>
      })}
    </div>
  )
}

export default function LiveCallGuardian() {
  const [seconds,setSeconds]=useState(162)
  const [assessment,setAssessment]=useState({syntheticArtifactScore:72,speechToText:[{speaker:'Caller (02:01)',text:'"Hello, this is David from your primary card fraud department. Urgent wire verification required immediately, do not hang up or call back as this incident case will lock."',flagged:true},{speaker:'Caller (03:34)',text:'"I need you to open your authentication app and recite the 6-digit confirmation prompt, now."',flagged:true}]})
  const navigate=useNavigate()

  useEffect(()=>{
    const t=setInterval(()=>setSeconds(s=>s+1),1000)
    return()=>clearInterval(t)
  },[])

  useEffect(()=>{
    getLiveAssessment().then(d=>setAssessment(d)).catch(()=>{})
    const poll=setInterval(()=>getLiveAssessment().then(d=>setAssessment(d)).catch(()=>{}),5000)
    return()=>clearInterval(poll)
  },[])

  function fmt(s){const m=Math.floor(s/60);return `0 ${String(m).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`}

  async function handleEnd() {
    try{ await stopLiveCall('live-session-001',fmt(seconds),assessment.syntheticArtifactScore) }catch{}
    navigate('/history')
  }

  const score=assessment.syntheticArtifactScore||72
  const riskColor=score>70?C.red:score>30?C.amb:C.grn
  const riskLabel=score>70?'HIGH':'MEDIUM'

  return (
    <div style={{background:C.bg,minHeight:'80vh',padding:'24px'}}>
      <style>{`@keyframes wvFast{0%,100%{transform:scaleY(0.4);opacity:0.5}50%{transform:scaleY(1);opacity:0.9}}`}</style>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:12,marginBottom:16}}>
          <div>
            <p style={{color:C.txt2,fontSize:12,marginBottom:4}}>Detect &gt; Live Call Assistant</p>
            <div style={{display:'flex',alignItems:'center',gap:12,flexWrap:'wrap'}}>
              <h1 style={{color:C.txt,fontSize:22,fontWeight:800}}>Live Call Guardian</h1>
              <span style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:6,padding:'4px 10px',color:C.grn,fontSize:11,fontWeight:700}}>● SHIELD ACTIVE</span>
            </div>
            <p style={{color:C.txt2,fontSize:12,marginTop:4}}>Monitoring incoming call stream in real time. Detecting neural vocoder anomalies, synthetic cadence variance, and cloned timbre with sub-20ms latency.</p>
            <div style={{display:'flex',alignItems:'center',gap:12,marginTop:8,flexWrap:'wrap'}}>
              <span style={{color:C.txt,fontSize:13}}>📞 +1 (415) 892-0193</span>
              <span style={{color:C.txt2,fontSize:11}}>● IP Trace: Encrypted Route #802</span>
            </div>
          </div>
          <div style={{textAlign:'right'}}>
            <p style={{color:C.txt2,fontSize:11,marginBottom:4}}>● CONTINUOUS NEURAL SCAN</p>
            <p style={{color:C.txt,fontSize:20,fontWeight:700,fontFamily:'JetBrains Mono,monospace'}}>{fmt(seconds)}</p>
            <div style={{display:'flex',gap:6,justifyContent:'flex-end',marginTop:6}}>
              {[['Safe',C.grn,false],['Suspicious',C.amb,true],['Deepfake',C.red,false]].map(([l,c,active])=>(
                <span key={l} style={{background:active?`rgba(${l==='Suspicious'?'217,119,6':'34,197,94'},0.1)`:C.card,border:`1px solid ${active?c:C.brd}`,borderRadius:6,padding:'4px 10px',color:active?c:C.txt2,fontSize:11,fontWeight:active?700:400}}>{l}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 400px',gap:16}}>
          <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:20,display:'flex',flexDirection:'column',gap:14}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
              <span style={{background:'rgba(217,119,6,0.1)',border:'1px solid rgba(217,119,6,0.3)',borderRadius:6,padding:'4px 10px',color:C.amb,fontSize:11,fontWeight:700}}>● SUSPICIOUS CADENCE DETECTED (89% Likelihood)</span>
              <span style={{color:C.txt2,fontSize:11,fontFamily:'JetBrains Mono,monospace'}}>VOCODER CONFIDENCE: 91.6%</span>
            </div>

            <div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                <span style={{color:C.txt2,fontSize:10,textTransform:'uppercase',letterSpacing:'0.06em'}}>Spectral Harmonics (512hz–16khz)</span>
                <span style={{color:C.txt2,fontSize:10,textTransform:'uppercase',letterSpacing:'0.06em'}}>Live Buffer Streaming</span>
              </div>
              <Waveform animated={true}/>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
              {[['Voice Timbre','Cloned Profile (91%)',C.red],['Lip-Sync','Natural (10ms var)',C.grn],['Acoustic Scan','Inconsistent Type ⚠',C.amb]].map(([k,v,c])=>(
                <div key={k} style={{background:'#0a1628',borderRadius:8,padding:10}}>
                  <p style={{color:C.txt2,fontSize:10,marginBottom:4}}>{k}</p>
                  <p style={{color:c,fontSize:11,fontWeight:600}}>{v}</p>
                </div>
              ))}
            </div>

            <div style={{display:'flex',gap:10}}>
              <button style={{flex:1,background:'rgba(255,255,255,0.04)',border:'1px solid '+C.brd,borderRadius:8,padding:'9px',color:C.txt2,fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>🔇 Mute Audio</button>
              <button style={{flex:1,background:'rgba(255,255,255,0.04)',border:'1px solid '+C.brd,borderRadius:8,padding:'9px',color:C.txt2,fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>🛡 Safe-Phone Challenge</button>
            </div>

            <button onClick={handleEnd} style={{width:'100%',background:'rgba(239,68,68,0.15)',border:'1px solid rgba(239,68,68,0.4)',borderRadius:10,padding:'12px',color:C.red,fontWeight:800,fontSize:14,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>⚡ Instant Disconnect</button>

            <div style={{display:'flex',justifyContent:'center',gap:20,paddingTop:4}}>
              {['🔇','🔊','⏺','⏹'].map(ic=>(
                <button key={ic} style={{background:'none',border:'none',fontSize:18,cursor:'pointer',color:C.txt2,padding:'4px 8px'}}>{ic}</button>
              ))}
            </div>

            <button onClick={handleEnd} style={{width:'100%',background:'linear-gradient(135deg,#00d4ff,#0080ff)',border:'none',borderRadius:10,padding:'12px',color:'#fff',fontWeight:700,fontSize:14,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>End Call →</button>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:20}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
                <span style={{color:C.txt,fontSize:15,fontWeight:700}}>Live Assessment</span>
                <span style={{background:`rgba(${riskLabel==='HIGH'?'239,68,68':'217,119,6'},0.1)`,border:`1px solid ${riskColor}`,borderRadius:6,padding:'3px 10px',color:riskColor,fontSize:11,fontWeight:700}}>RISK: {riskLabel}</span>
              </div>

              <p style={{color:C.txt2,fontSize:12,marginBottom:6}}>Synthetic Artifact Score</p>
              <p style={{color:riskColor,fontSize:36,fontWeight:800,fontFamily:'JetBrains Mono,monospace',marginBottom:10}}>{score}<span style={{color:C.txt2,fontSize:18,fontWeight:400}}>/100</span></p>

              <div style={{position:'relative',height:12,borderRadius:6,overflow:'hidden',marginBottom:6}}>
                <div style={{position:'absolute',inset:0,background:`linear-gradient(90deg,${C.grn} 30%,${C.amb} 60%,${C.red} 100%)`,opacity:0.2}}/>
                <div style={{position:'absolute',top:0,left:0,bottom:0,width:score+'%',background:riskColor,borderRadius:6,opacity:0.8}}/>
                <div style={{position:'absolute',top:-2,bottom:-2,width:3,background:'white',borderRadius:2,left:`${score}%`,transform:'translateX(-50%)'}}/>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:14}}>
                <span style={{color:C.grn,fontSize:9}}>Authentic (0-30)</span>
                <span style={{color:C.amb,fontSize:9}}>Suspicious (31-70)</span>
                <span style={{color:C.red,fontSize:9}}>Deepfake (71+)</span>
              </div>

              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                <span style={{color:C.txt2,fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em'}}>Speech-to-Text Stream</span>
                <span style={{color:C.grn,fontSize:10}}>● LIVE NLP SCAN</span>
              </div>
              <div style={{background:'#0a1628',border:'1px solid rgba(0,212,255,0.1)',borderRadius:8,padding:12,maxHeight:140,overflowY:'auto'}}>
                {(assessment.speechToText||[]).map((l,i)=>(
                  <div key={i} style={{marginBottom:i<assessment.speechToText.length-1?10:0}}>
                    {l.flagged&&<span style={{background:'rgba(239,68,68,0.1)',color:C.red,fontSize:9,fontWeight:700,padding:'1px 6px',borderRadius:3,display:'inline-block',marginBottom:4}}>Synthesised Urgency Stress</span>}
                    <p style={{color:C.txt2,fontSize:11,lineHeight:1.5}}><span style={{color:C.txt,fontWeight:600}}>{l.speaker}:</span> {l.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:C.card2,border:'1px solid '+C.brd,borderRadius:12,padding:18}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                <span style={{color:C.txt,fontSize:14,fontWeight:700}}>Emergency Script</span>
                <span style={{color:C.grn,fontSize:10,fontWeight:700}}>● ASSIST ACTIVE</span>
              </div>
              <div style={{background:'rgba(0,212,255,0.04)',borderLeft:'3px solid '+C.cyan,borderRadius:4,padding:10,marginBottom:12}}>
                <p style={{color:C.txt2,fontSize:11,lineHeight:1.5}}>Immediate Advisory: Do not read SMS passcodes or confirm account balances. Banks will never threaten immediate line termination.</p>
              </div>
              <p style={{color:C.txt2,fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:10}}>Recommended Counter-Questions</p>
              {[['Challenge: Safe-Word Verification','What was the name of our childhood street in Seattle?'],['Protocol: Verification Callback','Give me your cross reference code, I will hang up and call back the verified number on the card.']].map(([k,v])=>(
                <div key={k} style={{background:'#0a1628',borderRadius:8,padding:10,marginBottom:8,display:'flex',justifyContent:'space-between',gap:8}}>
                  <div>
                    <p style={{color:C.txt2,fontSize:10,fontWeight:600,marginBottom:3}}>{k}</p>
                    <p style={{color:C.txt,fontSize:12,fontStyle:'italic'}}>"{v}"</p>
                  </div>
                  <button style={{background:'none',border:'none',color:C.txt2,cursor:'pointer',fontSize:14,flexShrink:0}}>⧉</button>
                </div>
              ))}
              <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid rgba(255,255,255,0.05)',paddingTop:10,marginTop:4}}>
                <div style={{textAlign:'center'}}>
                  <p style={{color:C.txt2,fontSize:9,textTransform:'uppercase',marginBottom:2}}>Latency</p>
                  <p style={{color:C.cyan,fontSize:12,fontWeight:700,fontFamily:'JetBrains Mono,monospace'}}>18ms</p>
                </div>
                <div style={{textAlign:'center'}}>
                  <p style={{color:C.txt2,fontSize:9,textTransform:'uppercase',marginBottom:2}}>Buffer Purge</p>
                  <p style={{color:C.cyan,fontSize:12,fontWeight:700,fontFamily:'JetBrains Mono,monospace'}}>30s</p>
                </div>
                <div style={{textAlign:'center'}}>
                  <p style={{color:C.txt2,fontSize:9,textTransform:'uppercase',marginBottom:2}}>Cipher</p>
                  <p style={{color:C.cyan,fontSize:12,fontWeight:700,fontFamily:'JetBrains Mono,monospace'}}>AES-256</p>
                </div>
              </div>
            </div>

            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
              <div style={{display:'flex',gap:8}}>
                <button style={{background:'transparent',border:'1px solid '+C.brd,borderRadius:7,padding:'7px 12px',color:C.txt2,fontSize:11,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Export Incident Telemetry</button>
                <button style={{background:'transparent',border:'1px solid '+C.brd,borderRadius:7,padding:'7px 12px',color:C.txt2,fontSize:11,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Blocklist Number</button>
              </div>
              <button onClick={handleEnd} style={{background:'rgba(239,68,68,0.12)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:7,padding:'7px 12px',color:C.red,fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Report to Police Network</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
