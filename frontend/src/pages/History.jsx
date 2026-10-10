import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getHistory, clearHistory, deleteHistoryItem } from '../services/api.js'

const C={bg:'#0a0f1a',card:'#0f1e3a',card2:'#1a2d52',cyan:'#00d4ff',brd:'rgba(0,212,255,0.12)',txt:'#fff',txt2:'#7a9cc8',red:'#ef4444',grn:'#22c55e',amb:'#d97706'}

function riskBadge(level){
  const map={HIGH:{bg:'rgba(239,68,68,0.12)',color:'#ef4444',label:'HIGH RISK'},SUSPICIOUS:{bg:'rgba(217,119,6,0.12)',color:'#d97706',label:'SUSPICIOUS'},LOW:{bg:'rgba(34,197,94,0.12)',color:'#22c55e',label:'VERIFIED HUMAN'}}
  const s=map[level]||map.LOW
  return <span style={{background:s.bg,color:s.color,fontSize:10,fontWeight:700,padding:'3px 8px',borderRadius:5}}>{s.label}</span>
}

function typeIcon(t){return t==='VIDEO'?'📹':t==='LIVE'?'📞':'🎤'}

const wH=[40,65,30,80,45,70,55,85,35,60,50,75,40,65,55]

export default function History() {
  const [data,setData]=useState(null)
  const [selected,setSelected]=useState(null)
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)
  const [typeFilter,setTypeFilter]=useState('ALL')
  const navigate=useNavigate()

  function load(type='ALL'){
    setLoading(true)
    const params=type!=='ALL'?{type}:{}
    getHistory(params).then(d=>{setData(d);if(d.detections.length>0&&!selected)setSelected(d.detections[0])}).catch(e=>setError(e.message)).finally(()=>setLoading(false))
  }

  useEffect(()=>load(),[])

  function handleClear(){if(window.confirm('Clear all detection history?')){clearHistory().then(()=>load())}}
  function handleDelete(id,e){e.stopPropagation();deleteHistoryItem(id).then(()=>load())}
  function handleFilter(t){setTypeFilter(t);load(t)}

  if(loading&&!data) return <div style={{textAlign:'center',padding:80,color:C.txt2}}>Loading detection history…</div>
  if(error) return <div style={{textAlign:'center',padding:80,color:C.red}}>Error: {error}</div>

  const stats=data?.stats||{}
  const detections=data?.detections||[]
  const tabs=[{label:'All Types',count:stats.totalScanned||0,value:'ALL'},{label:'Voice Audio',count:detections.filter(d=>d.type==='VOICE').length,value:'VOICE'},{label:'Video Clips',count:detections.filter(d=>d.type==='VIDEO').length,value:'VIDEO'},{label:'Live Calls',count:detections.filter(d=>d.type==='LIVE').length,value:'LIVE'}]

  return (
    <div style={{background:C.bg,minHeight:'80vh',padding:'32px 24px'}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:12,marginBottom:8}}>
          <div>
            <p style={{color:C.txt2,fontSize:12,marginBottom:4}}>Detect &gt; <span style={{color:C.txt}}>Detection History</span> <span style={{background:'rgba(0,212,255,0.1)',color:C.cyan,fontSize:10,borderRadius:4,padding:'2px 8px',fontWeight:700,marginLeft:8}}>0 ZERO KNOWLEDGE RETENTION</span></p>
            <h1 style={{color:C.txt,fontSize:28,fontWeight:800}}>Detection History</h1>
            <p style={{color:C.txt2,fontSize:13,marginTop:4}}>Review, inspect, and export voice, video, and live call results analysed by MorphShield.</p>
          </div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <button onClick={()=>navigate('/detect')} style={{background:'transparent',border:'1px solid '+C.brd,borderRadius:8,padding:'8px 14px',color:C.txt2,fontSize:12,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Export Audit Log</button>
            <button onClick={handleClear} style={{background:'transparent',border:'1px solid '+C.brd,borderRadius:8,padding:'8px 14px',color:C.txt2,fontSize:12,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Clear Cache</button>
            <button onClick={()=>navigate('/detect')} style={{background:'linear-gradient(135deg,#00d4ff,#0080ff)',border:'none',borderRadius:8,padding:'8px 14px',color:'#fff',fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>▶ Run New Scan</button>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,margin:'24px 0'}}>
          {[{label:'TOTAL SCANNED',val:stats.totalScanned||0,color:C.txt},{label:'AUTHENTIC HUMAN',val:stats.authenticHuman||0,color:C.grn},{label:'INCONCLUSIVE',val:stats.inconclusive||0,color:C.amb},{label:'IMPOSTERS BLOCKED',val:stats.impostorsBlocked||0,color:C.red}].map(s=>(
            <div key={s.label} style={{background:C.card,border:'1px solid '+C.brd,borderRadius:10,padding:16}}>
              <p style={{color:C.txt2,fontSize:10,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:8}}>{s.label}</p>
              <p style={{color:s.color,fontSize:28,fontWeight:800,fontFamily:'JetBrains Mono,monospace'}}>
                {s.val} <span style={{color:C.grn,fontSize:12}}>↑</span>
              </p>
            </div>
          ))}
        </div>

        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:16,paddingBottom:16,borderBottom:'1px solid '+C.brd}}>
          {tabs.map(t=>(
            <button key={t.value} onClick={()=>handleFilter(t.value)} style={{padding:'6px 14px',borderRadius:8,border:'1px solid '+C.brd,background:typeFilter===t.value?C.card2:'transparent',color:typeFilter===t.value?C.txt:C.txt2,fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>
              {t.label} <span style={{color:C.txt2,fontWeight:400}}>({t.count})</span>
            </button>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:16}}>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {detections.length===0&&<p style={{color:C.txt2,padding:40,textAlign:'center'}}>No detections found.</p>}
            {detections.map(d=>(
              <div key={d.id} onClick={()=>setSelected(d)} style={{background:selected?.id===d.id?C.card2:C.card,border:`1px solid ${selected?.id===d.id?C.cyan:C.brd}`,borderRadius:10,padding:14,cursor:'pointer',transition:'border-color 0.2s'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <span style={{fontSize:15}}>{typeIcon(d.type)}</span>
                    <div>
                      <p style={{color:C.txt,fontSize:13,fontWeight:600}}>{d.filename}</p>
                      <p style={{color:C.txt2,fontSize:11}}>{d.dateLabel} · {d.duration}</p>
                    </div>
                  </div>
                  {riskBadge(d.riskLevel)}
                </div>
                <p style={{color:C.txt2,fontSize:12,marginBottom:10}}>{d.details}</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <button onClick={e=>{e.stopPropagation()}} style={{background:'rgba(0,212,255,0.08)',border:'1px solid rgba(0,212,255,0.15)',borderRadius:6,padding:'4px 10px',color:C.cyan,fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>{d.action}</button>
                  <button onClick={e=>handleDelete(d.id,e)} style={{background:'none',border:'none',color:C.txt2,cursor:'pointer',fontSize:14,padding:'4px 6px'}} title="Delete">🗑</button>
                </div>
              </div>
            ))}
          </div>

          <div>
            {selected?(
              <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:20,position:'sticky',top:20}}>
                <p style={{color:C.cyan,fontSize:10,fontWeight:700,letterSpacing:'0.08em',marginBottom:10}}>SPOTLIGHT TELEMETRY</p>
                <p style={{color:C.txt,fontSize:14,fontWeight:700,marginBottom:6}}>{selected.filename}</p>
                <div style={{marginBottom:14}}>{riskBadge(selected.riskLevel)}</div>
                <div style={{display:'flex',alignItems:'flex-end',gap:2,height:40,marginBottom:16}}>
                  {wH.map((h,i)=><div key={i} style={{flex:1,height:h+'%',background:selected.riskLevel==='HIGH'?'rgba(239,68,68,0.6)':'rgba(0,212,255,0.5)',borderRadius:2}}/>)}
                </div>
                {[['Neural Architecture',selected.riskLevel==='HIGH'?'V-Clone-v4 (Diffusion)':'Standard Analysis'],['Threat Severity',selected.overallRisk+'% — '+(selected.riskLevel==='HIGH'?'Critical':'Low')],['Client Verification',selected.riskLevel==='LOW'?'DNH-256 Validated':'Unverified'],['Response Action',selected.action]].map(([k,v])=>(
                  <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                    <span style={{color:C.txt2,fontSize:12}}>{k}</span>
                    <span style={{color:C.txt,fontSize:12,fontWeight:600,maxWidth:'55%',textAlign:'right'}}>{v}</span>
                  </div>
                ))}
                <button style={{width:'100%',background:'linear-gradient(135deg,#00d4ff,#0080ff)',border:'none',borderRadius:8,padding:10,color:'#fff',fontWeight:700,fontSize:13,cursor:'pointer',marginTop:16,fontFamily:'Inter,sans-serif'}}>Open Full Forensic Inspector</button>
                <p style={{color:C.cyan,fontSize:12,textAlign:'center',marginTop:10,cursor:'pointer'}}>↓ Download Cryptographic .chain</p>
              </div>
            ):<div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:40,textAlign:'center'}}><p style={{color:C.txt2,fontSize:13}}>Select a detection to view telemetry</p></div>}
          </div>
        </div>

        <div style={{background:'#060e20',border:'1px solid rgba(0,212,255,0.1)',borderRadius:10,padding:'14px 20px',marginTop:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
          <p style={{color:C.txt2,fontSize:12}}>🔒 <strong style={{color:C.txt}}>Zero-Retention Privacy Guarantee</strong> — All detection data is processed exclusively within your privacy-isolated client enclave, analyzed locally, and never transmitted to external servers.</p>
          <span style={{color:C.grn,fontSize:11,whiteSpace:'nowrap'}}>100% Local Retention</span>
        </div>
      </div>
    </div>
  )
}
