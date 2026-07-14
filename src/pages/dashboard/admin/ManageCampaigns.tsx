import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheck, FiX, FiTrash2 } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { mockCampaigns } from '../../../data/mockData'

export default function ManageCampaigns() {
  const [campaigns, setCampaigns] = useState([...mockCampaigns])

  const approve = (id: string) => {
    const c = mockCampaigns.find(c => c.id === id)
    if (c) c.status = 'approved'
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' } : c))
    toast.success('Campaign approved!')
  }

  const reject = (id: string) => {
    const c = mockCampaigns.find(c => c.id === id)
    if (c) c.status = 'rejected'
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: 'rejected' } : c))
    toast.success('Campaign rejected.')
  }

  const deleteCampaign = (id: string) => {
    if (!confirm('Delete this campaign permanently?')) return
    const idx = mockCampaigns.findIndex(c => c.id === id)
    if (idx !== -1) mockCampaigns.splice(idx, 1)
    setCampaigns(prev => prev.filter(c => c.id !== id))
    toast.success('Campaign deleted.')
  }

  const pending = campaigns.filter(c => c.status === 'pending')
  const others = campaigns.filter(c => c.status !== 'pending')

  const statusColor = (s: string) => s === 'approved' ? '#00d4aa' : s === 'pending' ? '#ffd93d' : '#ff6b6b'

  const Table = ({ items }: { items: typeof campaigns }) => (
    <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Creator</th>
              <th>Category</th>
              <th>Goal</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(c => (
              <tr key={c.id}>
                <td style={{ maxWidth: 200 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <img src={c.imageUrl} alt="" style={{ width: 36, height: 36, borderRadius: '0.375rem', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160 }}>{c.title}</div>
                  </div>
                </td>
                <td style={{ color: '#9090b0' }}>{c.creatorName}</td>
                <td style={{ color: '#7070a0', fontSize: '0.8rem' }}>{c.category}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>{c.fundingGoal.toLocaleString()}</td>
                <td><span style={{ background: `${statusColor(c.status)}18`, color: statusColor(c.status), padding: '0.2rem 0.6rem', borderRadius: 99, fontSize: '0.7rem', fontWeight: 600, textTransform: 'capitalize' }}>{c.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {c.status === 'pending' && (
                      <>
                        <button onClick={() => approve(c.id)} style={{ background: '#00d4aa18', color: '#00d4aa', border: '1px solid #00d4aa30', borderRadius: '0.375rem', padding: '0.3rem 0.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}>
                          <FiCheck size={12} /> Approve
                        </button>
                        <button onClick={() => reject(c.id)} style={{ background: '#ff6b6b15', color: '#ff6b6b', border: '1px solid #ff6b6b30', borderRadius: '0.375rem', padding: '0.3rem 0.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}>
                          <FiX size={12} /> Reject
                        </button>
                      </>
                    )}
                    <button onClick={() => deleteCampaign(c.id)} className="btn-danger" style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <FiTrash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Manage Campaigns</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>{campaigns.length} total campaigns</p>
      </div>

      {pending.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '1.75rem' }}>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1rem', marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Pending Approval
            <span style={{ background: '#ffd93d20', color: '#ffd93d', padding: '0.15rem 0.5rem', borderRadius: 99, fontSize: '0.72rem' }}>{pending.length}</span>
          </h2>
          <Table items={pending} />
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1rem', marginBottom: '0.875rem' }}>All Campaigns</h2>
        <Table items={others} />
      </motion.div>
    </div>
  )
}
