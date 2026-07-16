import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff, FiZap } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validate = () => {
    const errs: typeof errors = {}
    if (!email) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address'
    if (!password) errs.password = 'Password is required'
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.success) {
      toast.success('Welcome back!')
      navigate('/dashboard')
    } else {
      toast.error(result.error || 'Login failed')
    }
  }

  const handleGoogle = async () => {
    setLoading(true)
    const result = await loginWithGoogle()
    setLoading(false)
    if (result.success) {
      toast.success('Signed in with Google!')
      navigate('/dashboard')
    }
  }

  return (
    <div style={{ background: '#08080f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', position: 'relative', overflow: 'hidden' }}>
      {/* Bg decorations */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, background: 'radial-gradient(circle, #00d4aa08, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 300, height: 300, background: 'radial-gradient(circle, #00a8ff06, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 440, background: '#111118', border: '1px solid #1e1e30', borderRadius: '1.25rem', padding: 'clamp(1.75rem, 4vw, 2.5rem)', position: 'relative' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '1.5rem' }}>
            <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #00d4aa, #00a8ff)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiZap style={{ color: '#08080f', width: 22, height: 22 }} />
            </div>
            <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.4rem', background: 'linear-gradient(135deg, #00d4aa, #00a8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FundRise</span>
          </Link>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.4rem' }}>Welcome back</h1>
          <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>Sign in to continue to your dashboard</p>
        </div>

        {/* Demo hint */}
        <div style={{ background: '#00d4aa08', border: '1px solid #00d4aa20', borderRadius: '0.625rem', padding: '0.75rem 1rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#7070a0' }}>
          <strong style={{ color: '#00d4aa' }}>Demo accounts:</strong>
          <div style={{ marginTop: '0.3rem', fontFamily: 'JetBrains Mono', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <span>admin@fundrise.com / Admin@1234!</span>
            <span>alex@test.com / Pass1234!</span>
            <span>sarah@test.com / Pass1234!</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
          <div>
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <FiMail style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#4a4a65', width: 16, height: 16 }} />
              <input
                type="email"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })) }}
              />
            </div>
            {errors.email && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.email}</p>}
          </div>

          <div>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <FiLock style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#4a4a65', width: 16, height: 16 }} />
              <input
                type={showPass ? 'text' : 'password'}
                className="form-input"
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                placeholder="••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })) }}
              />
              <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#4a4a65' }}>
                {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {errors.password && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.password}</p>}
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '0.875rem', fontSize: '0.95rem', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.25rem 0' }}>
          <div style={{ flex: 1, height: 1, background: '#1e1e30' }} />
          <span style={{ color: '#3a3a55', fontSize: '0.8rem' }}>or</span>
          <div style={{ flex: 1, height: 1, background: '#1e1e30' }} />
        </div>

        <button onClick={handleGoogle} disabled={loading} style={{ width: '100%', background: '#1a1a2a', border: '1px solid #2a2a40', borderRadius: '0.5rem', padding: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', color: '#e8e8f0', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = '#00d4aa40')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a2a40')}
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#5a5a78', fontSize: '0.875rem' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#00d4aa', textDecoration: 'none', fontWeight: 600 }}>Create one free</Link>
        </p>
      </motion.div>
    </div>
  )
}
