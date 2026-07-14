import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { mockWithdrawals, mockCampaigns } from '../../../data/mockData'

export default function WithdrawalRequests() {
  const [withdrawals, setWithdrawals] = useState([...mockWithdrawals])

  const approvePayout = (id: string) => {
    const w = mockWithdrawals.find(w => w.id === id)
    if (!w) return
    w.status = 'approved'
    const campaigns = mockCampaigns.filter(c => c.creatorEmail === w.creatorEmail)
    let remaining = w.withdrawalCredit
    for (const c of campaigns) {
      if (remaining <= 0) break
      const deduct = Math.min(c.amountRaised, remaining)
      c.amountRaised -= deduct
      remaining -= deduct
    }
    setWithdrawals(prev => prev.map(wr => wr.id === id ? { ...wr, status: 'approved' } : wr))
    toast.success(`$${w.withdrawalAmount} withdrawal approved!`)
  }

  const pending = withdrawals.filter(w => w.status === 'pending')
  const approved = withdrawals.filter(w => w.status === 'approved')

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Withdrawal Requests</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>{pending.length} pending · {approved.length} processed</p>
      </div>

      {pending.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '1.75rem' }}>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1rem', marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Pending Requests
            <span style={{ background: '#ffd93d20', color: '#ffd93d', padding: '0.15rem 0.5rem', borderRadius: 99, fontSize: '0.72rem' }}>{pending.length}</span>
          </h2>
          <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead><tr><th>Creator</th><th>Credits</th><th>Amount</th><th>Method</th><th>Account</th><th>Date</th><th>Action</th></tr></thead>
                <tbody>
                  {pending.map(w => (
                    <tr key={w.id}>
                      <td style={{ fontWeight: 500 }}>{w.creatorName}</td>
                      <td><span style={{ fontFamily: 'JetBrains Mono', color: '#a78bfa' }}>{w.withdrawalCredit}</span></td>
                      <td><span style={{ fontFamily: 'JetBrains Mono', color: '#ffd93d', fontWeight: 700 }}>${w.withdrawalAmount}</span></td>
                      <td>{w.paymentSystem}</td>
                      <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.78rem', color: '#5a5a78' }}>{w.accountNumber}</td>
                      <td style={{ color: '#6060a0', fontFamily: 'JetBrains Mono', fontSize: '0.75rem' }}>{w.withdrawDate}</td>
                      <td>
                        <button onClick={() => approvePayout(w.id)} style={{ background: '#00d4aa18', color: '#00d4aa', border: '1px solid #00d4aa30', borderRadius: '0.375rem', padding: '0.3rem 0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 600 }}>
                          <FiCheck size={12} /> Mark Paid
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {approved.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1rem', marginBottom: '0.875rem' }}>Processed Payments</h2>
          <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead><tr><th>Creator</th><th>Credits</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th></tr></thead>
                <tbody>
                  {approved.map(w => (
                    <tr key={w.id}>
                      <td>{w.creatorName}</td>
                      <td style={{ fontFamily: 'JetBrains Mono', color: '#7070a0' }}>{w.withdrawalCredit}</td>
                      <td><span style={{ fontFamily: 'JetBrains Mono', color: '#ffd93d', fontWeight: 600 }}>${w.withdrawalAmount}</span></td>
                      <td>{w.paymentSystem}</td>
                      <td style={{ color: '#5a5a78', fontFamily: 'JetBrains Mono', fontSize: '0.75rem' }}>{w.withdrawDate}</td>
                      <td><span className="badge badge-approved">Paid</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
