import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useAuth } from '../../../context/AuthContext'
import { mockContributions } from '../../../data/mockData'

const PAGE_SIZE = 5

export default function MyContributions() {
  const { user } = useAuth()
  const [page, setPage] = useState(1)

  const all = mockContributions.filter(c => c.supporterEmail === user?.email)
  const total = all.length
  const totalPages = Math.ceil(total / PAGE_SIZE)
  const paginated = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>My Contributions</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>{total} total contributions across all campaigns.</p>
      </div>

      {total === 0 ? (
        <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '3rem', textAlign: 'center', color: '#5a5a78' }}>
          You haven't made any contributions yet.
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Campaign</th>
                    <th>Creator</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((c, i) => (
                    <tr key={c.id}>
                      <td style={{ color: '#3a3a55', fontFamily: 'JetBrains Mono', fontSize: '0.75rem' }}>{(page - 1) * PAGE_SIZE + i + 1}</td>
                      <td style={{ fontWeight: 500, color: '#e8e8f0', maxWidth: 240 }}>
                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 220 }}>{c.campaignTitle}</div>
                      </td>
                      <td style={{ color: '#9090b0' }}>{c.creatorName}</td>
                      <td><span style={{ fontFamily: 'JetBrains Mono', color: '#00d4aa', fontWeight: 600 }}>{c.contributionAmount}</span></td>
                      <td style={{ color: '#6060a0', fontFamily: 'JetBrains Mono', fontSize: '0.78rem' }}>{c.currentDate}</td>
                      <td><span className={`badge badge-${c.status}`}>{c.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                style={{ width: 36, height: 36, border: '1px solid #2a2a40', borderRadius: '0.5rem', background: 'transparent', color: page === 1 ? '#3a3a55' : '#9090b0', cursor: page === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  style={{ width: 36, height: 36, border: `1px solid ${page === p ? '#00d4aa' : '#2a2a40'}`, borderRadius: '0.5rem', background: page === p ? '#00d4aa15' : 'transparent', color: page === p ? '#00d4aa' : '#7070a0', cursor: 'pointer', fontSize: '0.85rem', fontWeight: page === p ? 700 : 400 }}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                style={{ width: 36, height: 36, border: '1px solid #2a2a40', borderRadius: '0.5rem', background: 'transparent', color: page === totalPages ? '#3a3a55' : '#9090b0', cursor: page === totalPages ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiChevronRight size={16} />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
