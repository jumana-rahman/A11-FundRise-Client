import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiZap, FiDollarSign, FiAlertTriangle } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAuth } from '../../../context/AuthContext'
import { mockCampaigns, mockWithdrawals } from '../../../data/mockData'

const MIN_CREDITS = 200

export default function Withdrawals() {
  const { user } = useAuth()
  const myCampaigns = mockCampaigns.filter(c => c.creatorEmail === user?.email)
  const totalRaised = myCampaigns.reduce((s, c) => s + c.amountRaised, 0)
  const alreadyWithdrawn = mockWithdrawals.filter(w => w.creatorEmail === user?.email && w.status === 'approved').reduce((s, w) => s + w.withdrawalCredit, 0)
  const availableCredits = Math.max(0, totalRaised - alreadyWithdrawn)
  const dollarValue = (availableCredits / 20).toFixed(2)

  const [credits, setCredits] = useState('')
  const [paymentSystem, setPaymentSystem] = useState('Stripe')
  const [accountNumber, setAccountNumber] = useState('')
  const [loading, setLoading] = useState(false)

  const withdrawAmount = credits ? (parseInt(credits) / 20).toFixed(2) : '0.00'
  const canWithdraw = availableCredits >= MIN_CREDITS

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault()
    const num = parseInt(credits)
    if (!num || num < MIN_CREDITS) { toast.error(`Minimum withdrawal is ${MIN_CREDITS} credits`); return }
    if (num > availableCredits) { toast.error('Amount exceeds available credits'); return }
    if (!accountNumber) { toast.error('Account number is required'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    mockWithdrawals.push({
      id: `w_${Date.now()}`,
      creatorEmail: user!.email,
      creatorName: user!.name,
      withdrawalCredit: num,
      withdrawalAmount: num / 20,
      paymentSystem,
      accountNumber,
      withdrawDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    })
    setLoading(false)
    setCredits('')
    setAccountNumber('')
    toast.success('Withdrawal request submitted!')
  }

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Withdrawals</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>20 credits = $1. Minimum withdrawal: {MIN_CREDITS} credits ($10).</p>
      </div>

      {/* Earnings summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Credits Raised', value: totalRaised.toLocaleString(), suffix: ' cr', color: '#00d4aa' },
          { label: 'Available to Withdraw', value: availableCredits.toLocaleString(), suffix: ' cr', color: '#a78bfa' },
          { label: 'Withdrawal Value', value: `$${dollarValue}`, suffix: '', color: '#ffd93d' },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="stat-card">
            <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '1.75rem', color: s.color }}>{s.value}{s.suffix}</div>
            <div style={{ fontSize: '0.8rem', color: '#6060a0', marginTop: '0.25rem' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Withdrawal form */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '1rem', padding: '1.75rem', maxWidth: 520 }}>
        <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem' }}>Request Withdrawal</h3>

        {!canWithdraw ? (
          <div style={{ background: '#ff6b6b10', border: '1px solid #ff6b6b25', borderRadius: '0.625rem', padding: '1rem', color: '#ff6b6b', fontSize: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <FiAlertTriangle size={16} style={{ marginTop: '0.15rem', flexShrink: 0 }} /> <span>You need at least <strong>{MIN_CREDITS} credits</strong> to make a withdrawal. Current balance: {availableCredits} credits.</span>
          </div>
        ) : (
          <form onSubmit={handleWithdraw} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="form-label">Credits to Withdraw</label>
              <div style={{ position: 'relative' }}>
                <FiZap style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#4a4a65' }} size={16} />
                <input type="number" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder={`Min ${MIN_CREDITS}`} value={credits}
                  onChange={e => setCredits(e.target.value)} min={MIN_CREDITS} max={availableCredits} />
              </div>
            </div>

            <div style={{ background: '#0e0e18', border: '1px solid #2a2a40', borderRadius: '0.5rem', padding: '0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6060a0', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FiDollarSign size={14} /> Withdrawal Amount
              </span>
              <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 800, color: '#ffd93d', fontSize: '1.25rem' }}>${withdrawAmount}</span>
            </div>

            <div>
              <label className="form-label">Payment Method</label>
              <select className="form-input" value={paymentSystem} onChange={e => setPaymentSystem(e.target.value)}>
                {['Stripe', 'Bkash', 'Rocket', 'Nagad', 'PayPal'].map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div>
              <label className="form-label">Account Number / Email</label>
              <input type="text" className="form-input" placeholder="e.g. ****4242 or you@example.com" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
            </div>

            <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '0.875rem', fontSize: '0.9rem', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Submitting…' : `Withdraw $${withdrawAmount}`}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}
