import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiFlag, FiTrash2, FiPauseCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { mockReports, mockCampaigns } from '../../../data/mockData'

export default function Reports() {
  const [reports, setReports] = useState([...mockReports])

  const suspend = (id: string) => {
    const r = reports.find(r => r.id === id)
    if (!r) return
    const c = mockCampaigns.find(c => c.id === r.campaignId)
    if (c) c.status = 'rejected'
    setReports(prev => prev.map(rep => rep.id === id ? { ...rep, status: 'resolved' } : rep))
    toast.success('Campaign suspended.')
  }

  const deleteReport = (id: string) => {
    const r = reports.find(r => r.id === id)
    if (!r) return
    const idx = mockCampaigns.findIndex(c => c.id === r.campaignId)
    if (idx !== -1) mockCampaigns.splice(idx, 1)
    setReports(prev => prev.map(rep => rep.id === id ? { ...rep, status: 'resolved' } : rep))
    toast.success('Campaign deleted and report resolved.')
  }

  const openReports = reports.filter(r => r.status === 'open')
  const resolved = reports.filter(r => r.status === 'resolved')

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Reports</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>{openReports.length} open reports requiring review.</p>
      </div>

      {openReports.length === 0 ? (
        <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '3rem', textAlign: 'center', color: '#5a5a78' }}>
          <FiFlag size={32} style={{ marginBottom: '0.75rem', opacity: 0.4 }} />
          <div>No open reports. The platform is clean!</div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.75rem' }}>
          {openReports.map(r => (
            <div key={r.id} style={{ background: '#111118', border: '1px solid #ff6b6b25', borderRadius: '0.875rem', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.875rem' }}>
                <div>
                  <div style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{r.campaignTitle}</div>
                  <div style={{ fontSize: '0.78rem', color: '#5a5a78' }}>Reported by <span style={{ color: '#9090b0' }}>{r.reporterName}</span> · {r.date}</div>
                </div>
                <span style={{ background: '#ff6b6b15', color: '#ff6b6b', padding: '0.2rem 0.625rem', borderRadius: 99, fontSize: '0.7rem', fontWeight: 600 }}>Open</span>
              </div>
              <div style={{ background: '#0e0e18', border: '1px solid #1a1a28', borderRadius: '0.5rem', padding: '0.875rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.72rem', color: '#5a5a78', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.375rem' }}>Reason</div>
                <p style={{ fontSize: '0.875rem', color: '#c0c0d8', lineHeight: 1.6, margin: 0 }}>{r.reason}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.625rem' }}>
                <button onClick={() => suspend(r.id)} style={{ background: '#ffd93d15', color: '#ffd93d', border: '1px solid #ffd93d30', borderRadius: '0.375rem', padding: '0.4rem 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 600 }}>
                  <FiPauseCircle size={13} /> Suspend Campaign
                </button>
                <button onClick={() => deleteReport(r.id)} className="btn-danger" style={{ padding: '0.4rem 1rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem' }}>
                  <FiTrash2 size={13} /> Delete Campaign
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {resolved.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1rem', marginBottom: '0.875rem', color: '#6060a0' }}>Resolved Reports</h2>
          <div style={{ background: '#0e0e18', border: '1px solid #1a1a28', borderRadius: '0.875rem', overflow: 'hidden' }}>
            <table className="data-table">
              <thead><tr><th>Campaign</th><th>Reporter</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {resolved.map(r => (
                  <tr key={r.id}>
                    <td style={{ color: '#7070a0' }}>{r.campaignTitle}</td>
                    <td style={{ color: '#5a5a78' }}>{r.reporterName}</td>
                    <td style={{ color: '#4a4a65', fontFamily: 'JetBrains Mono', fontSize: '0.75rem' }}>{r.date}</td>
                    <td><span className="badge badge-approved">Resolved</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  )
}
