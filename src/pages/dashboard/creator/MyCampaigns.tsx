import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { api } from '../../../lib/api'

export default function MyCampaigns() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ campaignTitle: '', campaignStory: '', rewardInfo: '' })
  const [loading, setLoading] = useState(true)

  const loadCampaigns = () => {
    api.get<any[]>('/api/campaigns/creator/mine')
      .then(res => {
        const sorted = (Array.isArray(res) ? res : []).sort((a: any, b: any) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime())
        setCampaigns(sorted); setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => { loadCampaigns() }, [])

  const openEdit = (c: any) => {
    setEditingId(c._id)
    setEditForm({ campaignTitle: c.campaignTitle, campaignStory: c.campaignStory, rewardInfo: c.rewardInfo })
  }

  const saveEdit = async () => {
    try {
      await api.put(`/api/campaigns/${editingId}`, editForm)
      setCampaigns(prev => prev.map(c => c._id === editingId ? { ...c, ...editForm } : c))
      toast.success('Campaign updated!')
      setEditingId(null)
    } catch (err: any) {
      toast.error(err.message || 'Failed to update')
    }
  }

  const deleteCampaign = async (id: string) => {
    if (!confirm('Delete this campaign? Approved supporters will be refunded.')) return
    try {
      await api.del(`/api/campaigns/${id}`)
      setCampaigns(prev => prev.filter(c => c._id !== id))
      toast.success('Campaign deleted. Supporters refunded.')
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete')
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>My Campaigns</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>{campaigns.length} total campaigns. Sorted by deadline (newest first).</p>
      </div>

      {loading ? (
        <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '3rem', textAlign: 'center', color: '#5a5a78' }}>Loading...</div>
      ) : campaigns.length === 0 ? (
        <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '3rem', textAlign: 'center', color: '#5a5a78' }}>
          No campaigns yet. <a href="/dashboard/add-campaign" style={{ color: '#00d4aa', textDecoration: 'none' }}>Create your first campaign</a>.
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
                  {campaigns.map((c: any) => {
                    const pct = Math.min(100, Math.round((c.amountRaised / c.fundingGoal) * 100))
                    return (
                      <tr key={c._id}>
                        <td style={{ fontWeight: 500, color: '#e8e8f0', maxWidth: 200 }}>
                          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>{c.campaignTitle}</div>
                        </td>
                        <td><span style={{ color: '#00d4aa', fontSize: '0.78rem' }}>{c.category}</span></td>
                        <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>{c.fundingGoal.toLocaleString()}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontFamily: 'JetBrains Mono', color: '#00d4aa', fontSize: '0.8rem' }}>{c.amountRaised.toLocaleString()}</span>
                            <span style={{ fontSize: '0.7rem', color: '#5a5a78' }}>({pct}%)</span>
                          </div>
                        </td>
                        <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.78rem', color: '#6060a0' }}>{c.deadline}</td>
                        <td><span className={`badge badge-${c.status}`}>{c.status}</span></td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.4rem' }}>
                            <button onClick={() => openEdit(c)} style={{ background: '#00d4aa18', color: '#00d4aa', border: '1px solid #00d4aa30', borderRadius: '0.375rem', padding: '0.3rem 0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                              <FiEdit2 size={13} />
                            </button>
                            <button onClick={() => deleteCampaign(c._id)} style={{ background: '#ff6b6b15', color: '#ff6b6b', border: '1px solid #ff6b6b30', borderRadius: '0.375rem', padding: '0.3rem 0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                              <FiTrash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {editingId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setEditingId(null)}
            style={{ position: 'fixed', inset: 0, background: '#00000090', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
            <motion.div initial={{ scale: 0.93 }} animate={{ scale: 1 }} exit={{ scale: 0.93 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#13131e', border: '1px solid #2a2a40', borderRadius: '1rem', padding: '2rem', width: '100%', maxWidth: 520 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem' }}>Edit Campaign</h3>
                <button onClick={() => setEditingId(null)} style={{ background: 'none', border: 'none', color: '#7070a0', cursor: 'pointer' }}><FiX size={20} /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="form-label">Title</label>
                  <input className="form-input" value={editForm.campaignTitle} onChange={e => setEditForm(p => ({ ...p, campaignTitle: e.target.value }))} />
                </div>
                <div>
                  <label className="form-label">Story</label>
                  <textarea className="form-input" rows={4} value={editForm.campaignStory} onChange={e => setEditForm(p => ({ ...p, campaignStory: e.target.value }))} style={{ resize: 'vertical' }} />
                </div>
                <div>
                  <label className="form-label">Reward Info</label>
                  <textarea className="form-input" rows={3} value={editForm.rewardInfo} onChange={e => setEditForm(p => ({ ...p, rewardInfo: e.target.value }))} style={{ resize: 'vertical' }} />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={saveEdit} className="btn-primary" style={{ flex: 1 }}>Save Changes</button>
                  <button onClick={() => setEditingId(null)} className="btn-outline" style={{ flex: 1 }}>Cancel</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
