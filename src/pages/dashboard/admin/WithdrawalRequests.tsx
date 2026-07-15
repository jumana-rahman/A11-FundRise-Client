import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { api } from '../../../lib/api'

export default function WithdrawalRequests() {
  const [pending, setPending] = useState<any[]>([])
  const [processed, setProcessed] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = () => {
    Promise.all([
      api.get<any[]>('/api/withdrawals/pending'),
      api.get<any[]>('/api/withdrawals/all'),
    ]).then(([p, a]) => {
      setPending(Array.isArray(p) ? p : [])
      setProcessed(Array.isArray(a) ? a : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  useEffect(() => { loadData() }, [])

  const handleApprove = async (id: string) => {
    try {
      await api.patch(`/api/withdrawals/${id}/approve`)
      toast.success('Payment processed')
      loadData()
    } catch (err: any) { toast.error(err.message) }
  }

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Withdrawal Requests</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>{pending.length} pending requests.</p>
      </div>

      {loading ? (
        <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '3rem', textAlign: 'center', color: '#5a5a78' }}>Loading...</div>
      ) : (
        <>
          {pending.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', color: '#ffd93d' }}>Pending Requests</h2>
              <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table">
                    <thead><tr><th>Creator</th><th>Credits</th><th>Amount</th><th>Method</th><th>Account</th><th>Date</th><th>Action</th></tr></thead>
                    <tbody>
                      {pending.map((w: any) => (
                        <tr key={w._id}>
                          <td style={{ fontWeight: 500, color: '#e8e8f0' }}>{w.creatorName}</td>
                          <td><span style={{ fontFamily: 'JetBrains Mono', color: '#ffd93d' }}>{w.withdrawalCredit}</span></td>
                          <td style={{ fontFamily: 'JetBrains Mono', fontWeight: 600 }}>${w.withdrawalAmount}</td>
                          <td>{w.paymentSystem}</td>
                          <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.78rem' }}>{w.accountNumber}</td>
                          <td style={{ color: '#6060a0', fontFamily: 'JetBrains Mono', fontSize: '0.78rem' }}>{new Date(w.withdrawDate).toLocaleDateString()}</td>
                          <td>
                            <button onClick={() => handleApprove(w._id)} style={{ background: '#00d4aa18', color: '#00d4aa', border: '1px solid #00d4aa30', borderRadius: '0.375rem', padding: '0.3rem 0.625rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}><FiCheck size={12} /> Payment Success</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>Processed Payments</h2>
            <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead><tr><th>Creator</th><th>Credits</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th></tr></thead>
                  <tbody>
                    {processed.map((w: any) => (
                      <tr key={w._id}>
                        <td style={{ fontWeight: 500, color: '#e8e8f0' }}>{w.creatorName}</td>
                        <td><span style={{ fontFamily: 'JetBrains Mono', color: '#ffd93d' }}>{w.withdrawalCredit}</span></td>
                        <td style={{ fontFamily: 'JetBrains Mono' }}>${w.withdrawalAmount}</td>
                        <td>{w.paymentSystem}</td>
                        <td style={{ color: '#6060a0', fontFamily: 'JetBrains Mono', fontSize: '0.78rem' }}>{new Date(w.withdrawDate).toLocaleDateString()}</td>
                        <td><span className={`badge badge-${w.status}`}>{w.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}
