import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCreditCard } from 'react-icons/fi'
import { api } from '../../../lib/api'

export default function PaymentHistory() {
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<any[]>('/api/payments/mine')
      .then(res => { setPayments(Array.isArray(res) ? res : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Payment History</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>All credit purchases made on your account.</p>
      </div>

      {loading ? (
        <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '3rem', textAlign: 'center', color: '#5a5a78' }}>Loading...</div>
      ) : payments.length === 0 ? (
        <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '3rem', textAlign: 'center', color: '#5a5a78' }}>
          No payment history yet. <a href="/dashboard/purchase-credit" style={{ color: '#00d4aa', textDecoration: 'none' }}>Purchase credits</a> to get started.
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Credits</th>
                    <th>Amount Paid</th>
                    <th>Method</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p: any) => (
                    <tr key={p._id}>
                      <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: '#5a5a78' }}>{p._id}</td>
                      <td><span style={{ fontFamily: 'JetBrains Mono', color: '#00d4aa', fontWeight: 600 }}>+{p.credits}</span></td>
                      <td style={{ fontFamily: 'JetBrains Mono', color: '#e8e8f0', fontWeight: 600 }}>${p.amount}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <FiCreditCard size={13} style={{ color: '#7070a0' }} />
                          <span>{p.method}</span>
                        </div>
                      </td>
                      <td style={{ color: '#6060a0', fontFamily: 'JetBrains Mono', fontSize: '0.78rem' }}>{new Date(p.date).toLocaleDateString()}</td>
                      <td><span className="badge badge-approved">{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem', background: '#0e0e18', border: '1px solid #1a1a28', borderRadius: '0.625rem', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#6060a0', fontSize: '0.85rem' }}>Total spent</span>
            <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, color: '#e8e8f0', fontSize: '1.1rem' }}>${payments.reduce((s: number, p: any) => s + p.amount, 0)}</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
