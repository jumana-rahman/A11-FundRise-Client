import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiUsers, FiTarget, FiZap, FiCreditCard } from 'react-icons/fi'
import { api } from '../../../lib/api'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
}

export default function AdminHome() {
  const [stats, setStats] = useState({ totalSupporters: 0, totalCreators: 0, totalCredits: 0, totalPayments: 0 })
  const [recentCampaigns, setRecentCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get<any>('/api/users/admin/stats'),
      api.get<any[]>('/api/campaigns/admin/all'),
    ]).then(([s, c]) => {
      setStats(s)
      setRecentCampaigns((Array.isArray(c) ? c : []).slice(0, 5))
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const statCards = [
    { label: 'Total Supporters', value: stats.totalSupporters, icon: <FiUsers />, color: '#00d4aa' },
    { label: 'Total Creators', value: stats.totalCreators, icon: <FiTarget />, color: '#a78bfa' },
    { label: 'Platform Credits', value: stats.totalCredits, icon: <FiZap />, color: '#ffd93d' },
    { label: 'Payments Processed', value: stats.totalPayments, icon: <FiCreditCard />, color: '#60a5fa' },
  ]

  return (
    <div>
      <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Admin Dashboard</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem', marginBottom: '1.75rem' }}>Platform overview and management.</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {statCards.map((s, i) => (
          <motion.div key={i} custom={i + 1} initial="hidden" animate="visible" variants={fadeUp} className="stat-card">
            <div style={{ width: 40, height: 40, background: `${s.color}18`, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, fontSize: '1.1rem', marginBottom: '1rem' }}>{s.icon}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '2rem', color: s.color }}>{s.value.toLocaleString()}</div>
            <div style={{ fontSize: '0.8rem', color: '#6060a0' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}>
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>Recent Campaigns</h2>
        {loading ? (
          <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '2.5rem', textAlign: 'center', color: '#5a5a78' }}>Loading...</div>
        ) : recentCampaigns.length === 0 ? (
          <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '2.5rem', textAlign: 'center', color: '#5a5a78' }}>No campaigns yet.</div>
        ) : (
          <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Campaign</th>
                    <th>Creator</th>
                    <th>Goal</th>
                    <th>Raised</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCampaigns.map((c: any) => (
                    <tr key={c._id}>
                      <td style={{ fontWeight: 500, color: '#e8e8f0', maxWidth: 240 }}>
                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 240 }}>{c.campaignTitle}</div>
                      </td>
                      <td style={{ color: '#9090b0' }}>{c.creatorName}</td>
                      <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>{c.fundingGoal.toLocaleString()}</td>
                      <td><span style={{ fontFamily: 'JetBrains Mono', color: '#00d4aa', fontSize: '0.8rem' }}>{c.amountRaised.toLocaleString()}</span></td>
                      <td><span className={`badge badge-${c.status}`}>{c.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
