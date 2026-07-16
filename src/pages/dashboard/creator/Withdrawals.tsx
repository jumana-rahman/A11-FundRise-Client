import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiDollarSign, FiZap } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { api } from '../../../lib/api'
import { useAuth } from '../../../context/AuthContext'

export default function Withdrawals() {
  const { user } = useAuth()
  const [earnings, setEarnings] = useState({ totalRaised: 0, withdrawalAmount: 0 })
  const [form, setForm] = useState({ withdrawalCredit: '', paymentSystem: 'Stripe', accountNumber: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get<any>('/api/withdrawals/earnings')
      .then(res => setEarnings(res))
      .catch(() => {})
  }, [])

  const creditAmount = parseInt(form.withdrawalCredit) || 0
  const dollarAmount = creditAmount / 20
  const canWithdraw = creditAmount >= 200 && creditAmount <= earnings.totalRaised

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canWithdraw) return
    setLoading(true)
    try {
      await api.post('/api/withdrawals', {
        withdrawalCredit: creditAmount,
        paymentSystem: form.paymentSystem,
        accountNumber: form.accountNumber,
      })
      toast.success('Withdrawal request submitted!')
      setForm({ withdrawalCredit: '', paymentSystem: 'Stripe', accountNumber: '' })
      api.get<any>('/api/withdrawals/earnings').then(res => setEarnings(res))
    } catch (err: any) {
      toast.error(err.message || 'Failed')
    }
    setLoading(false)
  }

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Withdrawals</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>Request withdrawals for your raised credits. 20 credits = $1</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: 'linear-gradient(135deg, #0e1e1a, #0a1420)', border: '1px solid #00d4aa20', borderRadius: '1rem', padding: '1.5rem' }}>
          <p style={{ color: '#6060a0', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Your Credit Balance</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiZap size={24} style={{ color: '#00d4aa' }} />
            <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 800, fontSize: '2rem', color: '#00d4aa' }}>{(user?.credits ?? 0).toLocaleString()}</span>
            <span style={{ color: '#5a5a78' }}>credits</span>
          </div>
          <p style={{ color: '#3a3a55', fontSize: '0.72rem', marginTop: '0.375rem' }}>Spending credits for contributions</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          style={{ background: 'linear-gradient(135deg, #1e1a0e, #1a1408)', border: '1px solid #ffd93d20', borderRadius: '1rem', padding: '1.5rem' }}>
          <p style={{ color: '#6060a0', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Total Raised from Campaigns</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiZap size={24} style={{ color: '#ffd93d' }} />
            <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 800, fontSize: '2rem', color: '#ffd93d' }}>{earnings.totalRaised.toLocaleString()}</span>
            <span style={{ color: '#5a5a78' }}>credits</span>
          </div>
          <p style={{ color: '#3a3a55', fontSize: '0.72rem', marginTop: '0.375rem' }}>Withdrawable at 20 credits = $1</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ background: 'linear-gradient(135deg, #0e1e1a, #0a1420)', border: '1px solid #00d4aa20', borderRadius: '1rem', padding: '1.5rem' }}>
          <p style={{ color: '#6060a0', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Available for Withdrawal</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiDollarSign size={24} style={{ color: '#00d4aa' }} />
            <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 800, fontSize: '2rem', color: '#00d4aa' }}>${earnings.withdrawalAmount.toFixed(2)}</span>
          </div>
          <p style={{ color: '#3a3a55', fontSize: '0.72rem', marginTop: '0.375rem' }}>Min. withdrawal: 200 credits ($10)</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '1rem', padding: '1.5rem', maxWidth: 520 }}>
        <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.25rem' }}>Request Withdrawal</h3>

        <form onSubmit={handleWithdraw} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="form-label">Credits to Withdraw</label>
            <input type="number" className="form-input" placeholder="Min. 200" value={form.withdrawalCredit} onChange={e => setForm(p => ({ ...p, withdrawalCredit: e.target.value }))} min={200} max={earnings.totalRaised} />
          </div>

          <div>
            <label className="form-label">Withdraw Amount ($)</label>
            <input type="text" className="form-input" value={`$${dollarAmount.toFixed(2)}`} readOnly style={{ opacity: 0.7 }} />
          </div>

          <div>
            <label className="form-label">Payment System</label>
            <select className="form-input" value={form.paymentSystem} onChange={e => setForm(p => ({ ...p, paymentSystem: e.target.value }))}>
              {['Stripe', 'Bkash', 'Rocket', 'Nagad', 'Bank Transfer'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="form-label">Account Number</label>
            <input className="form-input" placeholder="Your account number" value={form.accountNumber} onChange={e => setForm(p => ({ ...p, accountNumber: e.target.value }))} />
          </div>

          {canWithdraw ? (
            <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '0.875rem', fontSize: '0.95rem' }}>
              {loading ? 'Processing...' : 'Withdraw'}
            </button>
          ) : (
            <div style={{ textAlign: 'center', padding: '0.875rem', background: '#ff6b6b10', border: '1px solid #ff6b6b30', borderRadius: '0.625rem', color: '#ff6b6b', fontSize: '0.875rem', fontWeight: 600 }}>
              Insufficient credit
            </div>
          )}
        </form>
      </motion.div>
    </div>
  )
}
