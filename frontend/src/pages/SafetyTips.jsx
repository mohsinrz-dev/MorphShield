import { useState, useEffect } from 'react'
import { getSafetyTips } from '../services/api.js'

const C={bg:'#0a0f1a',card:'#0f1e3a',cyan:'#00d4ff',brd:'rgba(0,212,255,0.12)',txt:'#fff',txt2:'#7a9cc8',amb:'#d97706',grn:'#22c55e',red:'#ef4444'}

export default function SafetyTips() {
  const [data,setData]=useState(null)
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)

  useEffect(()=>{ getSafetyTips().then(setData).catch(e=>setError(e.message)).finally(()=>setLoading(false)) },[])

  if(loading) return <div style={{textAlign:'center',padding:80,color:C.txt2}}>Loading safety tips…</div>
  if(error) return <div style={{textAlign:'center',padding:80,color:C.red}}>Could not load tips: {error}</div>

  return (
    <div style={{background:C.bg,minHeight:'80vh',padding:'48px 24px'}}>
      <div style={{maxWidth:760,margin:'0 auto'}}>
        <p style={{color:C.cyan,fontSize:11,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:12}}>✦ Actionable Field Guide</p>
        <h1 style={{color:C.txt,fontSize:36,fontWeight:800,marginBottom:10}}>Essential Safety Tips</h1>
        <p style={{color:C.txt2,fontSize:15,marginBottom:40}}>Key rules to protect yourself and your family against AI voice and deepfake scams.</p>

        <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:12,padding:28,marginBottom:20}}>
          <h2 style={{color:C.grn,fontSize:16,fontWeight:700,marginBottom:18}}>✓ Core Rules</h2>
          {data.coreRules.map((r,i)=>(
            <div key={i} style={{display:'flex',gap:12,marginBottom:16,paddingBottom:16,borderBottom:i<data.coreRules.length-1?'1px solid rgba(255,255,255,0.05)':'none'}}>
              <span style={{color:C.grn,fontWeight:700,marginTop:2,fontSize:14,flexShrink:0}}>•</span>
              <div>
                <p style={{color:C.txt,fontSize:14,fontWeight:600,marginBottom:4}}>{r.title}</p>
                <p style={{color:C.txt2,fontSize:13,lineHeight:1.6}}>{r.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:C.card,border:'1px solid rgba(217,119,6,0.3)',borderLeft:'4px solid '+C.amb,borderRadius:12,padding:28,marginBottom:20}}>
          <h2 style={{color:C.amb,fontSize:16,fontWeight:700,marginBottom:18}}>⚠ Immediate Red Flags</h2>
          {data.redFlags.map((r,i)=>(
            <div key={i} style={{display:'flex',gap:12,marginBottom:16,paddingBottom:16,borderBottom:i<data.redFlags.length-1?'1px solid rgba(255,255,255,0.05)':'none'}}>
              <span style={{color:C.amb,fontWeight:700,marginTop:2,fontSize:14,flexShrink:0}}>•</span>
              <div>
                <p style={{color:C.txt,fontSize:14,fontWeight:600,marginBottom:4}}>{r.title}</p>
                <p style={{color:C.txt2,fontSize:13,lineHeight:1.6}}>{r.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:C.card,border:'1px solid rgba(0,212,255,0.2)',borderLeft:'4px solid '+C.cyan,borderRadius:12,padding:28}}>
          <h2 style={{color:C.cyan,fontSize:16,fontWeight:700,marginBottom:18}}>🔒 Emergency Help</h2>
          {data.emergencyHelp.map((r,i)=>(
            <div key={i} style={{display:'flex',gap:12,marginBottom:16,paddingBottom:16,borderBottom:i<data.emergencyHelp.length-1?'1px solid rgba(255,255,255,0.05)':'none'}}>
              <span style={{color:C.cyan,marginTop:2,fontSize:14,flexShrink:0}}>🆘</span>
              <div>
                <p style={{color:C.txt,fontSize:14,fontWeight:600,marginBottom:3}}>{r.title}</p>
                <p style={{color:C.cyan,fontSize:13,fontWeight:600,marginBottom:4}}>{r.contact}</p>
                <p style={{color:C.txt2,fontSize:13,lineHeight:1.6}}>{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
