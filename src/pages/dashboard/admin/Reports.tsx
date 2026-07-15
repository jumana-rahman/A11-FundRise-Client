import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiAlertTriangle, FiCheckCircle, FiTrash2 } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { api } from '../../../lib/api'

export default function Reports() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadReports = () => {
    api.get<any[]>('/api/reports')
      .then(res => { setReports(Array.isArray(res) ? res : []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { loadReports() }, [])

  const handleResolve = async (id: string, action: string) => {
    try {
      await api.patch(`/api/reports/${id}/resolve`, { action })
      toast.success(`Report resolved - campaign ${action === 'delete' ? 'deleted' : 'suspended'}`)
      loadReports()
    } catch (err: any) { toast.error(err.message) }
  }

  const openReports = reports.filter(r => r.status === 'open')
  const resolvedReports = reports.filter(r => r.status === 'resolved')

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Reports</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>{openReports.length} open reports, {resolvedReports.length} resolved.</p>
      </div>

      {loading ? (
        <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '3rem', textAlign: 'center', color: '#5a5a78' }}>Loading...</div>
      ) : (
        <>
          {openReports.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff6b6b' }}>
                <FiAlertTriangle size={18} /> Open Reports
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {openReports.map((r: any) => (
                  <div key={r._id} style={{ background: '#111118', border: '1px solid #ff6b6b30', borderRadius: '0.875rem', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div>
                        <h3 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.95rem', color: '#e8e8f0', marginBottom: '0.25rem' }}>{r.campaignTitle}</h3>
                        <p style={{ color: '#6060a0', fontSize: '0.78rem' }}>Reported by {r.reporterName} on {new Date(r.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p style={{ color: '#9090b0', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.6 }}>{r.reason}</p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleResolve(r._id, 'suspend')} style={{ background: '#ffd93d18', color: '#ffd93d', border: '1px solid #ffd93d30', borderRadius: '0.375rem', padding: '0.35rem 0.75rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <FiAlertTriangle size={12} /> Suspend Campaign
                      </button>
                      <button onClick={() => handleResolve(r._id, 'delete')} style={{ background: '#ff6b6b15', color: '#ff6b6b', border: '1px solid #ff6b6b30', borderRadius: '0.375rem', padding: '0.35rem 0.75rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <FiTrash2 size={12} /> Delete Campaign
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00d4aa' }}>
              <FiCheckCircle size={18} /> Resolved Reports
            </h2>
            {resolvedReports.length === 0 ? (
              <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '2.5rem', textAlign: 'center', color: '#5a5a78' }}>No resolved reports yet.</div>
            ) : (
              <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table">
                    <thead><tr><th>Campaign</th><th>Reporter</th><th>Reason</th><th>Date</th><th>Status</th></tr></thead>
                    <tbody>
                      {resolvedReports.map((r: any) => (
                        <tr key={r._id}>
                          <td style={{ fontWeight: 500, color: '#e8e8f0' }}>{r.campaignTitle}</td>
                          <td style={{ color: '#9090b0' }}>{r.reporterName}</td>
                          <td style={{ color: '#6060a0', maxWidth: 240 }}>
                            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 240 }}>{r.reason}</div>
                          </td>
                          <td style={{ color: '#6060a0', fontFamily: 'JetBrains Mono', fontSize: '0.78rem' }}>{new Date(r.date).toLocaleDateString()}</td>
                          <td><span className="badge badge-approved">{r.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </div>
  )
}
