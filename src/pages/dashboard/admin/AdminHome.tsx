import { motion } from 'framer-motion'
import { FiUsers, FiZap, FiCreditCard, FiActivity } from 'react-icons/fi'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { mockUsers, mockCampaigns, mockPayments } from '../../../data/mockData'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
}

const chartData = [
  { month: 'Feb', raised: 820, payments: 5 },
  { month: 'Mar', raised: 1340, payments: 9 },
  { month: 'Apr', raised: 2100, payments: 14 },
  { month: 'May', raised: 1800, payments: 11 },
  { month: 'Jun', raised: 3200, payments: 18 },
  { month: 'Jul', raised: 4100, payments: 22 },
]

export default function AdminHome() {
  const supporters = mockUsers.filter(u => u.role === 'supporter').length
  const creators = mockUsers.filter(u => u.role === 'creator').length
  const totalCredits = mockUsers.reduce((s, u) => s + u.credits, 0)
  const totalPayments = mockPayments.length

  const stats = [
    { label: 'Total Supporters', value: supporters, icon: <FiUsers />, color: '#00d4aa' },
    { label: 'Total Creators', value: creators, icon: <FiActivity />, color: '#a78bfa' },
    { label: 'Platform Credits', value: totalCredits.toLocaleString(), icon: <FiZap />, color: '#ffd93d' },
    { label: 'Payments Processed', value: totalPayments, icon: <FiCreditCard />, color: '#60a5fa' },
  ]

  return (
    <div>
      <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Admin Overview</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem', marginBottom: '1.75rem' }}>Platform health at a glance.</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((s, i) => (
          <motion.div key={i} custom={i + 1} initial="hidden" animate="visible" variants={fadeUp} className="stat-card">
            <div style={{ width: 40, height: 40, background: `${s.color}18`, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, fontSize: '1.1rem', marginBottom: '1rem' }}>{s.icon}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '2rem', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.8rem', color: '#6060a0' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}
        style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem' }}>Platform Activity (Last 6 Months)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e30" />
            <XAxis dataKey="month" tick={{ fill: '#5a5a78', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#5a5a78', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#13131e', border: '1px solid #2a2a40', borderRadius: 8, color: '#e8e8f0', fontSize: 12 }} cursor={{ fill: '#00d4aa08' }} />
            <Bar dataKey="raised" name="Credits Raised" fill="#00d4aa" radius={[4, 4, 0, 0]} />
            <Bar dataKey="payments" name="Payments" fill="#a78bfa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent campaigns */}
      <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}>
        <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>Recent Campaigns</h3>
        <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead><tr><th>Title</th><th>Creator</th><th>Category</th><th>Raised</th><th>Status</th></tr></thead>
              <tbody>
                {mockCampaigns.slice(0, 5).map(c => (
                  <tr key={c.id}>
                    <td style={{ maxWidth: 200 }}><div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>{c.title}</div></td>
                    <td style={{ color: '#9090b0' }}>{c.creatorName}</td>
                    <td style={{ color: '#7070a0', fontSize: '0.8rem' }}>{c.category}</td>
                    <td><span style={{ fontFamily: 'JetBrains Mono', color: '#00d4aa' }}>{c.amountRaised.toLocaleString()}</span></td>
                    <td><span className={`badge badge-${c.status}`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
