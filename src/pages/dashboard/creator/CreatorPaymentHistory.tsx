import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '../../../lib/api'

export default function CreatorPaymentHistory() {
  const [withdrawals, setWithdrawals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<any[]>('/api/withdrawals/history')
      .then(res => { setWithdrawals(Array.isArray(res) ? res : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const totalWithdrawn = withdrawals.filter(w => w.status === 'approved').reduce((s, w) => s + w.withdrawalAmount, 0)

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Payment History</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>All withdrawal payments made to your account.</p>
      </div>

      {loading ? (
        <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '3rem', textAlign: 'center', color: '#5a5a78' }}>Loading...</div>
      ) : withdrawals.length === 0 ? (
        <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '3rem', textAlign: 'center', color: '#5a5a78' }}>No withdrawal history yet.</div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Credits</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map((w: any) => (
                    <tr key={w._id}>
                      <td><span style={{ fontFamily: 'JetBrains Mono', color: '#ffd93d', fontWeight: 600 }}>{w.withdrawalCredit}</span></td>
                      <td style={{ fontFamily: 'JetBrains Mono', fontWeight: 600 }}>${w.withdrawalAmount}</td>
                      <td>{w.paymentSystem}</td>
                      <td style={{ color: '#6060a0', fontFamily: 'JetBrains Mono', fontSize: '0.78rem' }}>{new Date(w.withdrawDate).toLocaleDateString()}</td>
                      <td><span className={`badge badge-${w.status}`}>{w.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem', background: '#0e0e18', border: '1px solid #1a1a28', borderRadius: '0.625rem', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#6060a0', fontSize: '0.85rem' }}>Total withdrawn</span>
            <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, color: '#00d4aa', fontSize: '1.1rem' }}>${totalWithdrawn.toFixed(2)}</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
