import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiLock, FiImage, FiEye, FiEyeOff, FiZap, FiCheck, FiArrowUp } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import toast from 'react-hot-toast'
import { useAuth, type UserRole } from '../context/AuthContext'

export default function Register() {
  const { register, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', photoUrl: '', role: 'supporter' as UserRole })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 6) errs.password = 'At least 6 characters'
    else if (!/[A-Z]/.test(form.password)) errs.password = 'Must contain at least one uppercase letter'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    const result = await register(form)
    setLoading(false)
    if (result.success) {
      toast.success(`Welcome! You received ${form.role === 'supporter' ? 50 : 20} free credits`)
      navigate('/dashboard')
    } else {
      toast.error(result.error || 'Registration failed')
    }
  }

  const handleGoogle = async () => {
    setLoading(true)
    await loginWithGoogle()
    setLoading(false)
    toast.success('Registered with Google!')
    navigate('/dashboard')
  }

  const field = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(p => ({ ...p, [key]: e.target.value }))
    setErrors(p => { const n = { ...p }; delete n[key]; return n })
  }

  const strengthChecks = [
    { label: 'At least 6 characters', met: form.password.length >= 6 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(form.password) },
    { label: 'One number', met: /\d/.test(form.password) },
  ]

  return (
    <div style={{ background: '#08080f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: 400, height: 400, background: 'radial-gradient(circle, #a78bfa08, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 300, height: 300, background: 'radial-gradient(circle, #00d4aa06, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 480, background: '#111118', border: '1px solid #1e1e30', borderRadius: '1.25rem', padding: 'clamp(1.75rem, 4vw, 2.5rem)' }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '1.5rem' }}>
            <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #00d4aa, #00a8ff)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiZap style={{ color: '#08080f', width: 22, height: 22 }} />
            </div>
            <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.4rem', background: 'linear-gradient(135deg, #00d4aa, #00a8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FundRise</span>
          </Link>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.4rem' }}>Create your account</h1>
          <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>Supporters get 50 free credits · Creators get 20</p>
        </div>

        {/* Role selector */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {(['supporter', 'creator'] as UserRole[]).map(role => (
            <button key={role} type="button" onClick={() => setForm(p => ({ ...p, role }))}
              style={{ padding: '1rem', border: `2px solid ${form.role === role ? '#00d4aa' : '#1e1e30'}`, borderRadius: '0.75rem', background: form.role === role ? '#00d4aa10' : '#13131e', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem', display: 'flex', justifyContent: 'center', color: form.role === role ? '#00d4aa' : '#9090b0' }}>{role === 'supporter' ? <FiZap size={24} /> : <FiArrowUp size={24} />}</div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.875rem', color: form.role === role ? '#00d4aa' : '#9090b0', textTransform: 'capitalize' }}>{role}</div>
              <div style={{ fontSize: '0.7rem', color: '#5a5a78', marginTop: '0.2rem' }}>{role === 'supporter' ? '50 free credits' : '20 free credits'}</div>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="form-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <FiUser style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#4a4a65', width: 16, height: 16 }} />
              <input type="text" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="Your full name" value={form.name} onChange={field('name')} />
            </div>
            {errors.name && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.name}</p>}
          </div>

          <div>
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <FiMail style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#4a4a65', width: 16, height: 16 }} />
              <input type="email" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="you@example.com" value={form.email} onChange={field('email')} />
            </div>
            {errors.email && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.email}</p>}
          </div>

          <div>
            <label className="form-label">Profile Picture URL <span style={{ color: '#3a3a55', textTransform: 'none' }}>(optional)</span></label>
            <div style={{ position: 'relative' }}>
              <FiImage style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#4a4a65', width: 16, height: 16 }} />
              <input type="url" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="https://..." value={form.photoUrl} onChange={field('photoUrl')} />
            </div>
          </div>

          <div>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <FiLock style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#4a4a65', width: 16, height: 16 }} />
              <input type={showPass ? 'text' : 'password'} className="form-input" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} placeholder="••••••••" value={form.password} onChange={field('password')} />
              <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#4a4a65' }}>
                {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {form.password.length > 0 && (
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {strengthChecks.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', color: c.met ? '#00d4aa' : '#5a5a78' }}>
                    <FiCheck size={10} style={{ opacity: c.met ? 1 : 0.3 }} /> {c.label}
                  </div>
                ))}
              </div>
            )}
            {errors.password && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.password}</p>}
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '0.875rem', fontSize: '0.95rem', opacity: loading ? 0.7 : 1, marginTop: '0.5rem' }}>
            {loading ? 'Creating account...' : `Create Account as ${form.role.charAt(0).toUpperCase() + form.role.slice(1)}`}
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
          <FcGoogle size={20} /> Continue with Google
        </button>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#5a5a78', fontSize: '0.875rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#00d4aa', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  )
}
