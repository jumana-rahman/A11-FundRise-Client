import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCheck, FiX, FiTrash2 } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { api } from '../../../lib/api'

export default function ManageCampaigns() {
  const [pending, setPending] = useState<any[]>([])
  const [all, setAll] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = () => {
    Promise.all([
      api.get<any[]>('/api/campaigns/admin/pending'),
      api.get<any[]>('/api/campaigns/admin/all'),
    ]).then(([p, a]) => {
      setPending(Array.isArray(p) ? p : [])
      setAll(Array.isArray(a) ? a : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  useEffect(() => { loadData() }, [])

  const handleApprove = async (id: string) => {
    try {
      await api.patch(`/api/campaigns/${id}/approve`)
      toast.success('Campaign approved')
      loadData()
    } catch (err: any) { toast.error(err.message) }
  }

  const handleReject = async (id: string) => {
    try {
      await api.patch(`/api/campaigns/${id}/reject`)
      toast.success('Campaign rejected')
      loadData()
    } catch (err: any) { toast.error(err.message) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this campaign?')) return
    try {
      await api.del(`/api/campaigns/${id}`)
      toast.success('Campaign deleted')
      loadData()
    } catch (err: any) { toast.error(err.message) }
  }

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Manage Campaigns</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>{pending.length} pending approval, {all.length} total campaigns.</p>
      </div>

      {loading ? (
        <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '3rem', textAlign: 'center', color: '#5a5a78' }}>Loading...</div>
      ) : (
        <>
          {pending.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', color: '#ffd93d' }}>Pending Approval</h2>
              <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table">
                    <thead><tr><th>Campaign</th><th>Creator</th><th>Goal</th><th>Actions</th></tr></thead>
                    <tbody>
                      {pending.map((c: any) => (
                        <tr key={c._id}>
                          <td style={{ fontWeight: 500, color: '#e8e8f0' }}>{c.campaignTitle}</td>
                          <td style={{ color: '#9090b0' }}>{c.creatorName}</td>
                          <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>{c.fundingGoal.toLocaleString()}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                              <button onClick={() => handleApprove(c._id)} style={{ background: '#00d4aa18', color: '#00d4aa', border: '1px solid #00d4aa30', borderRadius: '0.375rem', padding: '0.3rem 0.625rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}><FiCheck size={12} /> Approve</button>
                              <button onClick={() => handleReject(c._id)} style={{ background: '#ff6b6b15', color: '#ff6b6b', border: '1px solid #ff6b6b30', borderRadius: '0.375rem', padding: '0.3rem 0.625rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}><FiX size={12} /> Reject</button>
                            </div>
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
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>All Campaigns</h2>
            <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead><tr><th>Campaign</th><th>Creator</th><th>Goal</th><th>Raised</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {all.map((c: any) => (
                      <tr key={c._id}>
                        <td style={{ fontWeight: 500, color: '#e8e8f0', maxWidth: 200 }}>
                          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>{c.campaignTitle}</div>
                        </td>
                        <td style={{ color: '#9090b0' }}>{c.creatorName}</td>
                        <td style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>{c.fundingGoal.toLocaleString()}</td>
                        <td><span style={{ fontFamily: 'JetBrains Mono', color: '#00d4aa', fontSize: '0.8rem' }}>{c.amountRaised.toLocaleString()}</span></td>
                        <td><span className={`badge badge-${c.status}`}>{c.status}</span></td>
                        <td>
                          <button onClick={() => handleDelete(c._id)} style={{ background: '#ff6b6b15', color: '#ff6b6b', border: '1px solid #ff6b6b30', borderRadius: '0.375rem', padding: '0.3rem 0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <FiTrash2 size={13} />
                          </button>
                        </td>
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
