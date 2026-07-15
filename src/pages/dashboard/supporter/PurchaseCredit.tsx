import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiZap, FiCheck, FiStar, FiLoader, FiCreditCard, FiCheckCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAuth } from '../../../context/AuthContext'
import { api } from '../../../lib/api'

const packages = [
  { credits: 100, price: 10, label: 'Starter', popular: false, color: '#60a5fa' },
  { credits: 300, price: 25, label: 'Builder', popular: true, color: '#00d4aa' },
  { credits: 800, price: 60, label: 'Champion', popular: false, color: '#a78bfa' },
  { credits: 1500, price: 110, label: 'Elite', popular: false, color: '#ffd93d' },
]

export default function PurchaseCredit() {
  const { user, updateCredits, refreshUser } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selected, setSelected] = useState<number | null>(null)
  const [processing, setProcessing] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    const cancelled = searchParams.get('cancelled')

    if (cancelled) {
      toast.error('Payment cancelled')
      setSearchParams({})
    }

    if (sessionId) {
      setVerifying(true)
      api.post('/api/payments/verify-session', { sessionId })
        .then(async (res: any) => {
          setVerified(true)
          updateCredits(res.credits)
          await refreshUser()
          toast.success(`${res.credits} credits added to your account!`)
          setSearchParams({})
        })
        .catch((err: any) => {
          toast.error(err.message || 'Payment verification failed')
          setSearchParams({})
        })
        .finally(() => setVerifying(false))
    }
  }, [searchParams])

  const handlePurchase = async () => {
    if (selected === null) { toast.error('Select a package first'); return }
    const pkg = packages[selected]
    setProcessing(true)
    try {
      const res = await api.post<any>('/api/payments/create-checkout-session', { credits: pkg.credits })
      if (res.url) {
        window.location.href = res.url
      } else {
        toast.error('Failed to create checkout session')
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to start checkout')
      setProcessing(false)
    }
  }

  if (verifying) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', gap: '1rem' }}>
        <FiLoader size={32} className="animate-spin" style={{ color: '#00d4aa' }} />
        <p style={{ color: '#6060a0', fontSize: '0.9rem' }}>Verifying your payment...</p>
      </div>
    )
  }

  if (verified) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', gap: '1rem' }}>
        <FiCheckCircle size={48} style={{ color: '#00d4aa' }} />
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.5rem' }}>Payment Successful!</h2>
        <p style={{ color: '#6060a0', fontSize: '0.9rem' }}>Your credits have been added to your account.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#0e1e1a', border: '1px solid #00d4aa30', borderRadius: '0.625rem', padding: '0.75rem 1.25rem' }}>
          <FiZap size={18} style={{ color: '#00d4aa' }} />
          <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '1.25rem', color: '#00d4aa' }}>{user?.credits ?? 0}</span>
          <span style={{ color: '#5a5a78' }}>credits</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Purchase Credits</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>Credits are used to back campaigns. 10 credits = $1</p>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #0e1e1a, #0a1420)', border: '1px solid #00d4aa20', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p style={{ color: '#6060a0', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Your current balance</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiZap size={24} style={{ color: '#00d4aa' }} />
            <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 800, fontSize: '2.5rem', color: '#00d4aa' }}>{user?.credits ?? 0}</span>
            <span style={{ color: '#5a5a78', fontSize: '1rem' }}>credits</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', color: '#5a5a78', fontSize: '0.8rem' }}>
          <div>~ ${((user?.credits ?? 0) / 10).toFixed(2)} value</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {packages.map((pkg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            onClick={() => setSelected(i)}
            style={{ background: '#111118', border: `2px solid ${selected === i ? pkg.color : pkg.popular ? '#00d4aa20' : '#1e1e30'}`, borderRadius: '1rem', padding: '1.5rem', cursor: 'pointer', position: 'relative', transition: 'all 0.2s', transform: selected === i ? 'scale(1.02)' : 'scale(1)' }}
          >
            {pkg.popular && (
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #00d4aa, #00a8ff)', color: '#08080f', padding: '0.2rem 0.875rem', borderRadius: 99, fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <FiStar size={10} /> Most Popular
              </div>
            )}
            {selected === i && (
              <div style={{ position: 'absolute', top: 12, right: 12, width: 20, height: 20, background: pkg.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiCheck size={12} style={{ color: '#08080f' }} />
              </div>
            )}
            <div style={{ fontSize: '0.75rem', color: pkg.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.625rem' }}>{pkg.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '0.375rem' }}>
              <FiZap size={18} style={{ color: pkg.color }} />
              <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 800, fontSize: '2rem', color: pkg.color }}>{pkg.credits.toLocaleString()}</span>
            </div>
            <div style={{ color: '#6060a0', fontSize: '0.8rem', marginBottom: '1rem' }}>credits</div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', color: '#e8e8f0' }}>${pkg.price}</div>
            <div style={{ fontSize: '0.72rem', color: '#4a4a65', marginTop: '0.25rem' }}>${(pkg.price / pkg.credits * 10).toFixed(2)} per 10 credits</div>
          </motion.div>
        ))}
      </div>

      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '1rem', padding: '1.5rem', maxWidth: 480 }}>
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem' }}>
            Purchase {packages[selected].credits} credits for ${packages[selected].price}
          </h3>

          <button onClick={handlePurchase} disabled={processing} className="btn-primary" style={{ width: '100%', padding: '0.875rem', fontSize: '0.95rem', opacity: processing ? 0.7 : 1 }}>
            {processing ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}><FiLoader size={14} className="animate-spin" /> Redirecting to Stripe...</span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}><FiCreditCard size={14} /> Pay ${packages[selected].price} via Stripe</span>
            )}
          </button>
          <p style={{ fontSize: '0.72rem', color: '#3a3a55', textAlign: 'center', marginTop: '0.625rem' }}>Secured by Stripe. You'll be redirected to Stripe Checkout.</p>
        </motion.div>
      )}
    </div>
  )
}
