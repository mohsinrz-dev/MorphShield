import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../services/api.js'

const C = { bg:'#0a0f1a',card:'#0f1e3a',card2:'#0a1628',cyan:'#00d4ff',brd:'rgba(0,212,255,0.12)',txt:'#fff',txt2:'#7a9cc8',red:'#ef4444' }
const inp = { width:'100%',background:'#0a1628',border:'1px solid rgba(0,212,255,0.12)',borderRadius:8,padding:'11px 12px 11px 36px',color:'#fff',fontSize:14,outline:'none',boxSizing:'border-box',fontFamily:'Inter,sans-serif' }

export default function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [showPw,setShowPw]=useState(false)
  const [trust,setTrust]=useState(false)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  const navigate=useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if(!email.trim()) return setError('Email is required.')
    if(password.length<4) return setError('Password must be at least 4 characters.')
    setLoading(true); setError(null)
    try { await loginUser(email,password); navigate('/') }
    catch(err){ setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div style={{background:C.bg,minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{background:C.card,border:'1px solid '+C.brd,borderRadius:16,padding:'40px 36px',width:'100%',maxWidth:460}}>
        <p style={{color:C.cyan,fontSize:11,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:20}}>✦ Zero-Knowledge Authentication</p>
        <h1 style={{color:C.txt,fontSize:26,fontWeight:700,marginBottom:28}}>Welcome back to MorphShield</h1>
        {error&&<div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:8,padding:'10px 14px',color:C.red,fontSize:13,marginBottom:16}}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label style={{color:C.txt2,fontSize:12,fontWeight:600,display:'block',marginBottom:6}}>Account Email</label>
          <div style={{position:'relative',marginBottom:16}}>
            <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:C.txt2,fontSize:13,pointerEvents:'none'}}>✉</span>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="ada.morgan@familydefense.io" style={inp}/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
            <label style={{color:C.txt2,fontSize:12,fontWeight:600}}>Master Password / Vault PIN</label>
            <a href="#" style={{color:C.cyan,fontSize:11,textDecoration:'none'}}>Forgot PIN or Key?</a>
          </div>
          <div style={{position:'relative',marginBottom:20}}>
            <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:C.txt2,fontSize:13,pointerEvents:'none'}}>🔒</span>
            <input type={showPw?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••••••••" style={{...inp,paddingRight:40}}/>
            <button type="button" onClick={()=>setShowPw(v=>!v)} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:C.txt2,cursor:'pointer',fontSize:14,padding:0}}>{showPw?'🙈':'👁'}</button>
          </div>
          <label style={{display:'flex',alignItems:'center',gap:8,marginBottom:24,cursor:'pointer'}}>
            <input type="checkbox" checked={trust} onChange={e=>setTrust(e.target.checked)} style={{accentColor:C.cyan,width:14,height:14}}/>
            <span style={{color:C.txt,fontSize:13}}>Trust device for 30 days</span>
            <span style={{color:C.txt2,fontSize:11}}>🔐 Biometric Protected</span>
          </label>
          <button type="submit" disabled={loading} style={{width:'100%',background:'linear-gradient(135deg,#00d4ff,#0080ff)',border:'none',borderRadius:10,padding:13,color:'#fff',fontWeight:700,fontSize:15,cursor:'pointer',marginBottom:20,opacity:loading?0.7:1,fontFamily:'Inter,sans-serif'}}>{loading?'Signing in…':'Sign In'}</button>
        </form>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
          <div style={{flex:1,height:1,background:C.brd}}/><span style={{color:C.txt2,fontSize:12}}>or</span><div style={{flex:1,height:1,background:C.brd}}/>
        </div>
        <div style={{display:'flex',gap:10,marginBottom:20}}>
          <button style={{flex:1,background:'#0a1628',border:'1px solid '+C.brd,borderRadius:8,padding:'10px',color:C.txt,fontSize:13,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>G&nbsp;&nbsp;Google Workspace</button>
          <button style={{flex:1,background:'#0a1628',border:'1px solid '+C.brd,borderRadius:8,padding:'10px',color:C.txt,fontSize:13,cursor:'pointer',fontFamily:'Inter,sans-serif'}}> Apple SSO</button>
        </div>
        <p style={{color:C.txt2,fontSize:12,textAlign:'center',lineHeight:1.6,marginBottom:14}}>Protected Circle or Corporate Enclave? Joining an active family defense group? Enter Circle ID.</p>
        <p style={{color:C.txt2,fontSize:12,textAlign:'center'}}>New to MorphShield? <Link to="/get-started" style={{color:C.cyan,textDecoration:'none',fontWeight:600}}>Create a protected account [Free 14-day trial]</Link></p>
      </div>
    </div>
  )
}
