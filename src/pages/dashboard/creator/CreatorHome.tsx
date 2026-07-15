import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTarget, FiActivity, FiZap, FiEye, FiCheck, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAuth } from '../../../context/AuthContext'
import { api } from '../../../lib/api'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
}

export default function CreatorHome() {
  const { } = useAuth()
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [pendingContribs, setPendingContribs] = useState<any[]>([])
  const [selectedContrib, setSelectedContrib] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      const [camps, contribs] = await Promise.all([
        api.get<any[]>('/api/campaigns/creator/mine'),
        api.get<any[]>('/api/contributions/pending'),
      ])
      setCampaigns(Array.isArray(camps) ? camps : [])
      setPendingContribs(Array.isArray(contribs) ? contribs : [])
    } catch {}
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const now = new Date()
  const activeCampaigns = campaigns.filter(c => c.status === 'approved' && new Date(c.deadline) > now)
  const totalRaised = campaigns.reduce((s, c) => s + (c.amountRaised || 0), 0)

  const handleApprove = async (id: string) => {
    try {
      await api.patch(`/api/contributions/${id}/approve`)
      toast.success('Contribution approved!')
      setSelectedContrib(null)
      loadData()
    } catch (err: any) {
      toast.error(err.message || 'Failed')
    }
  }

  const handleReject = async (id: string) => {
    try {
      await api.patch(`/api/contributions/${id}/reject`)
      toast.success('Contribution rejected. Credits refunded.')
      setSelectedContrib(null)
      loadData()
    } catch (err: any) {
      toast.error(err.message || 'Failed')
    }
  }

  const stats = [
    { label: 'Total Campaigns', value: campaigns.length, icon: <FiTarget />, color: '#a78bfa' },
    { label: 'Active Campaigns', value: activeCampaigns.length, icon: <FiActivity />, color: '#00d4aa' },
    { label: 'Total Raised', value: totalRaised, icon: <FiZap />, color: '#ffd93d', suffix: ' credits' },
  ]

  return (
    <div>
      <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Creator Dashboard</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem', marginBottom: '1.75rem' }}>Manage your campaigns and review contributions.</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((s, i) => (
          <motion.div key={i} custom={i + 1} initial="hidden" animate="visible" variants={fadeUp} className="stat-card">
            <div style={{ width: 40, height: 40, background: `${s.color}18`, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, fontSize: '1.1rem', marginBottom: '1rem' }}>{s.icon}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '2rem', color: s.color }}>{s.value.toLocaleString()}{s.suffix}</div>
            <div style={{ fontSize: '0.8rem', color: '#6060a0' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}>
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>
          Contributions to Review
          {pendingContribs.length > 0 && <span style={{ marginLeft: '0.5rem', background: '#ff6b6b20', color: '#ff6b6b', padding: '0.15rem 0.5rem', borderRadius: 99, fontSize: '0.72rem' }}>{pendingContribs.length} pending</span>}
        </h2>

        {loading ? (
          <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '2.5rem', textAlign: 'center', color: '#5a5a78' }}>Loading...</div>
        ) : pendingContribs.length === 0 ? (
          <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '2.5rem', textAlign: 'center', color: '#5a5a78' }}>No pending contributions to review.</div>
        ) : (
          <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Supporter</th>
                    <th>Campaign</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingContribs.map((c: any) => (
                    <tr key={c._id}>
                      <td style={{ fontWeight: 500 }}>{c.supporterName}</td>
                      <td style={{ color: '#9090b0', maxWidth: 180 }}>
                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 180 }}>{c.campaignTitle}</div>
                      </td>
                      <td><span style={{ fontFamily: 'JetBrains Mono', color: '#00d4aa', fontWeight: 600 }}>{c.contributionAmount}</span></td>
                      <td style={{ color: '#5a5a78', fontFamily: 'JetBrains Mono', fontSize: '0.75rem' }}>{new Date(c.currentDate).toLocaleDateString()}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <button onClick={() => setSelectedContrib(c)} style={{ background: '#00d4aa18', color: '#00d4aa', border: '1px solid #00d4aa30', borderRadius: '0.375rem', padding: '0.3rem 0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem' }}>
                            <FiEye size={12} />
                          </button>
                          <button onClick={() => handleApprove(c._id)} style={{ background: '#00d4aa18', color: '#00d4aa', border: '1px solid #00d4aa30', borderRadius: '0.375rem', padding: '0.3rem 0.625rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 600 }}>
                            <FiCheck size={12} /> Approve
                          </button>
                          <button onClick={() => handleReject(c._id)} style={{ background: '#ff6b6b15', color: '#ff6b6b', border: '1px solid #ff6b6b30', borderRadius: '0.375rem', padding: '0.3rem 0.625rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 600 }}>
                            <FiX size={12} /> Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {selectedContrib && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedContrib(null)}
            style={{ position: 'fixed', inset: 0, background: '#00000090', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
            <motion.div initial={{ scale: 0.93, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.93, y: 16 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#13131e', border: '1px solid #2a2a40', borderRadius: '1rem', padding: '2rem', width: '100%', maxWidth: 480 }}>
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.25rem' }}>Contribution Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {[
                  ['Supporter', selectedContrib.supporterName],
                  ['Campaign', selectedContrib.campaignTitle],
                  ['Amount', `${selectedContrib.contributionAmount} credits`],
                  ['Date', new Date(selectedContrib.currentDate).toLocaleDateString()],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', gap: '1rem' }}>
                    <span style={{ fontSize: '0.78rem', color: '#5a5a78', width: 80, flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
                    <span style={{ fontSize: '0.875rem', color: '#c8c8d8' }}>{value}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => handleApprove(selectedContrib._id)} className="btn-primary" style={{ flex: 1 }}>Approve</button>
                <button onClick={() => handleReject(selectedContrib._id)} className="btn-danger" style={{ flex: 1 }}>Reject</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
