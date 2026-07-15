import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiList, FiClock, FiZap, FiTrendingUp } from 'react-icons/fi'
import { useAuth } from '../../../context/AuthContext'
import { api } from '../../../lib/api'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
}

export default function SupporterHome() {
  const { user } = useAuth()
  const [contributions, setContributions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<any>('/api/contributions/mine?page=1&limit=100')
      .then(res => { setContributions(res.contributions || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const myContribs = contributions
  const pending = myContribs.filter((c: any) => c.status === 'pending').length
  const totalContributed = myContribs.filter((c: any) => c.status === 'approved').reduce((sum: number, c: any) => sum + c.contributionAmount, 0)
  const approved = myContribs.filter((c: any) => c.status === 'approved')

  const stats = [
    { label: 'Total Contributions', value: myContribs.length, icon: <FiList />, color: '#00d4aa', bg: '#00d4aa' },
    { label: 'Pending Contributions', value: pending, icon: <FiClock />, color: '#ffd93d', bg: '#ffd93d' },
    { label: 'Credits Contributed', value: totalContributed, icon: <FiZap />, color: '#a78bfa', bg: '#a78bfa' },
    { label: 'Campaigns Backed', value: new Set(myContribs.map((c: any) => c.campaignId)).size, icon: <FiTrendingUp />, color: '#60a5fa', bg: '#60a5fa' },
  ]

  return (
    <div>
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>
          Welcome back, {user?.name?.split(' ')[0]}
        </h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem', marginBottom: '1.75rem' }}>Here's your contribution overview.</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((s, i) => (
          <motion.div key={i} custom={i + 1} initial="hidden" animate="visible" variants={fadeUp} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ width: 40, height: 40, background: `${s.bg}18`, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, fontSize: '1.1rem' }}>
                {s.icon}
              </div>
            </div>
            <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '2rem', color: s.color }}>{s.value.toLocaleString()}</div>
            <div style={{ fontSize: '0.8rem', color: '#6060a0', marginTop: '0.25rem' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}>
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>Approved Contributions</h2>
        {loading ? (
          <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.75rem', padding: '2.5rem', textAlign: 'center', color: '#5a5a78' }}>Loading...</div>
        ) : approved.length === 0 ? (
          <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.75rem', padding: '2.5rem', textAlign: 'center', color: '#5a5a78' }}>
            No approved contributions yet. <a href="/dashboard/explore" style={{ color: '#00d4aa', textDecoration: 'none' }}>Explore campaigns</a> to get started!
          </div>
        ) : (
          <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Campaign</th>
                    <th>Creator</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {approved.map((c: any) => (
                    <tr key={c._id}>
                      <td style={{ fontWeight: 500, color: '#e8e8f0', maxWidth: 240 }}>{c.campaignTitle}</td>
                      <td>{c.creatorName}</td>
                      <td><span style={{ fontFamily: 'JetBrains Mono', color: '#00d4aa' }}>{c.contributionAmount}</span></td>
                      <td><span className="badge badge-approved">{c.status}</span></td>
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
