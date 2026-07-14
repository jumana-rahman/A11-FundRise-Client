import { motion } from 'framer-motion'
import { useAuth } from '../../../context/AuthContext'
import { mockWithdrawals } from '../../../data/mockData'

export default function CreatorPaymentHistory() {
  const { user } = useAuth()
  const withdrawals = mockWithdrawals.filter(w => w.creatorEmail === user?.email)

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Payment History</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>All your withdrawal requests and their statuses.</p>
      </div>

      {withdrawals.length === 0 ? (
        <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '3rem', textAlign: 'center', color: '#5a5a78' }}>
          No withdrawal history yet.
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Credits</th>
                    <th>Amount ($)</th>
                    <th>Method</th>
                    <th>Account</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map(w => (
                    <tr key={w.id}>
                      <td><span style={{ fontFamily: 'JetBrains Mono', color: '#a78bfa', fontWeight: 600 }}>{w.withdrawalCredit}</span></td>
                      <td><span style={{ fontFamily: 'JetBrains Mono', color: '#ffd93d', fontWeight: 700 }}>${w.withdrawalAmount}</span></td>
                      <td>{w.paymentSystem}</td>
                      <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.78rem', color: '#5a5a78' }}>{w.accountNumber}</td>
                      <td style={{ color: '#6060a0', fontFamily: 'JetBrains Mono', fontSize: '0.75rem' }}>{w.withdrawDate}</td>
                      <td><span className={`badge ${w.status === 'approved' ? 'badge-approved' : 'badge-pending'}`}>{w.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ marginTop: '1rem', background: '#0e0e18', border: '1px solid #1a1a28', borderRadius: '0.5rem', padding: '0.875rem 1.25rem', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#6060a0', fontSize: '0.85rem' }}>Total withdrawn</span>
            <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, color: '#ffd93d' }}>
              ${withdrawals.filter(w => w.status === 'approved').reduce((s, w) => s + w.withdrawalAmount, 0).toFixed(2)}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
