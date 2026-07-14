import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAuth } from '../../../context/AuthContext'
import { mockCampaigns, mockContributions } from '../../../data/mockData'

export default function MyCampaigns() {
  const { user } = useAuth()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ title: '', story: '', rewardInfo: '' })
  const [campaigns, setCampaigns] = useState(() =>
    mockCampaigns.filter(c => c.creatorEmail === user?.email).sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime())
  )

  const openEdit = (c: typeof campaigns[0]) => {
    setEditingId(c.id)
    setEditForm({ title: c.title, story: c.story, rewardInfo: c.rewardInfo })
  }

  const saveEdit = () => {
    const idx = mockCampaigns.findIndex(c => c.id === editingId)
    if (idx !== -1) {
      mockCampaigns[idx] = { ...mockCampaigns[idx], ...editForm }
      setCampaigns(prev => prev.map(c => c.id === editingId ? { ...c, ...editForm } : c))
    }
    toast.success('Campaign updated!')
    setEditingId(null)
  }

  const deleteCampaign = (id: string) => {
    if (!confirm('Delete this campaign? Approved supporters will be refunded.')) return
    const idx = mockCampaigns.findIndex(c => c.id === id)
    if (idx !== -1) mockCampaigns.splice(idx, 1)
    mockContributions.filter(c => c.campaignId === id && c.status === 'approved').forEach(c => { c.status = 'rejected' })
    setCampaigns(prev => prev.filter(c => c.id !== id))
    toast.success('Campaign deleted and supporters refunded.')
  }

  const statusColor = (s: string) => s === 'approved' ? '#00d4aa' : s === 'pending' ? '#ffd93d' : '#ff6b6b'

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>My Campaigns</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>{campaigns.length} campaigns</p>
      </div>

      {campaigns.length === 0 ? (
        <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '3rem', textAlign: 'center', color: '#5a5a78' }}>
          You haven't created any campaigns yet.
        </div>
      ) : (
        <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Category</th>
                  <th>Goal</th>
                  <th>Raised</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 500, maxWidth: 200 }}>
                      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>{c.title}</div>
                    </td>
                    <td style={{ color: '#9090b0' }}>{c.category}</td>
                    <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.82rem' }}>{c.fundingGoal.toLocaleString()}</td>
                    <td><span style={{ fontFamily: 'JetBrains Mono', color: '#00d4aa', fontWeight: 600 }}>{c.amountRaised.toLocaleString()}</span></td>
                    <td style={{ color: '#6060a0', fontFamily: 'JetBrains Mono', fontSize: '0.75rem' }}>{c.deadline}</td>
                    <td><span style={{ background: `${statusColor(c.status)}18`, color: statusColor(c.status), padding: '0.2rem 0.6rem', borderRadius: 99, fontSize: '0.7rem', fontWeight: 600, textTransform: 'capitalize' }}>{c.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => openEdit(c)} style={{ background: '#a78bfa18', color: '#a78bfa', border: '1px solid #a78bfa30', borderRadius: '0.375rem', padding: '0.3rem 0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem' }}>
                          <FiEdit2 size={12} />
                        </button>
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
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editingId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setEditingId(null)}
            style={{ position: 'fixed', inset: 0, background: '#00000090', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
            <motion.div initial={{ scale: 0.93 }} animate={{ scale: 1 }} exit={{ scale: 0.93 }} onClick={e => e.stopPropagation()}
              style={{ background: '#13131e', border: '1px solid #2a2a40', borderRadius: '1rem', padding: '2rem', width: '100%', maxWidth: 560 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>Edit Campaign</h3>
                <button onClick={() => setEditingId(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7070a0' }}><FiX size={18} /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="form-label">Title</label>
                  <input className="form-input" value={editForm.title} onChange={e => setEditForm(p => ({ ...p, title: e.target.value }))} />
                </div>
                <div>
                  <label className="form-label">Campaign Story</label>
                  <textarea className="form-input" rows={4} value={editForm.story} onChange={e => setEditForm(p => ({ ...p, story: e.target.value }))} style={{ resize: 'vertical' }} />
                </div>
                <div>
                  <label className="form-label">Reward Info</label>
                  <textarea className="form-input" rows={3} value={editForm.rewardInfo} onChange={e => setEditForm(p => ({ ...p, rewardInfo: e.target.value }))} style={{ resize: 'vertical' }} />
                </div>
                <button onClick={saveEdit} className="btn-primary" style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem' }}>Save Changes</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
