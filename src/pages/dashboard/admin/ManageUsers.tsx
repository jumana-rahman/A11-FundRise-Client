import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2, FiAlertTriangle, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { api } from '../../../lib/api'

export default function ManageUsers() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<any>(null)
  const [deleting, setDeleting] = useState(false)

  const loadUsers = () => {
    api.get<any[]>('/api/users/admin/all')
      .then(res => { setUsers(Array.isArray(res) ? res : []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { loadUsers() }, [])

  const handleRoleChange = async (id: string, role: string) => {
    try {
      await api.patch(`/api/users/admin/${id}/role`, { role })
      setUsers(prev => prev.map(u => u._id === id ? { ...u, role } : u))
      toast.success('Role updated')
    } catch (err: any) {
      toast.error(err.message || 'Failed')
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await api.del(`/api/users/admin/${deleteTarget._id}`)
      setUsers(prev => prev.filter(u => u._id !== deleteTarget._id))
      toast.success(`${deleteTarget.name} deleted`)
      setDeleteTarget(null)
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete user')
    }
    setDeleting(false)
  }

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Manage Users</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>{users.length} registered users.</p>
      </div>

      {loading ? (
        <div style={{ background: '#111118', border: '1px dashed #2a2a40', borderRadius: '0.875rem', padding: '3rem', textAlign: 'center', color: '#5a5a78' }}>Loading...</div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Credits</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u: any) => (
                    <tr key={u._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img src={u.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                          <span style={{ fontWeight: 500, color: '#e8e8f0' }}>{u.name}</span>
                        </div>
                      </td>
                      <td style={{ color: '#9090b0', fontFamily: 'JetBrains Mono', fontSize: '0.78rem' }}>{u.email}</td>
                      <td><span style={{ fontFamily: 'JetBrains Mono', color: '#00d4aa', fontWeight: 600 }}>{u.credits}</span></td>
                      <td>
                        <select value={u.role} onChange={e => handleRoleChange(u._id, e.target.value)}
                          style={{ background: '#0e0e18', border: '1px solid #2a2a40', borderRadius: '0.375rem', color: '#e8e8f0', padding: '0.3rem 0.5rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                          {['supporter', 'creator', 'admin'].map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </td>
                      <td>
                        <button onClick={() => setDeleteTarget(u)} style={{ background: '#ff6b6b15', color: '#ff6b6b', border: '1px solid #ff6b6b30', borderRadius: '0.375rem', padding: '0.35rem 0.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#ff6b6b25'; e.currentTarget.style.borderColor = '#ff6b6b50' }}
                          onMouseLeave={e => { e.currentTarget.style.background = '#ff6b6b15'; e.currentTarget.style.borderColor = '#ff6b6b30' }}>
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
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', inset: 0, background: '#00000080', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}
            onClick={() => !deleting && setDeleteTarget(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#111118', border: '1px solid #2a2a40', borderRadius: '1rem', padding: 0, width: '100%', maxWidth: 420, overflow: 'hidden' }}
            >
              {/* Header */}
              <div style={{ padding: '1.5rem 1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 44, height: 44, background: '#ff6b6b15', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FiAlertTriangle size={22} style={{ color: '#ff6b6b' }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>Delete User</h3>
                    <p style={{ color: '#5a5a78', fontSize: '0.8rem', margin: 0, marginTop: '0.15rem' }}>This action cannot be undone</p>
                  </div>
                </div>
                <button onClick={() => !deleting && setDeleteTarget(null)} style={{ background: 'none', border: 'none', color: '#5a5a78', cursor: 'pointer', padding: 4 }}>
                  <FiX size={18} />
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: '1.25rem 1.5rem' }}>
                <p style={{ color: '#9090b0', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
                  Are you sure you want to delete this user? All their data including campaigns, contributions, and payment history will be permanently removed.
                </p>

                {/* User card */}
                <div style={{ marginTop: '1rem', background: '#0e0e18', border: '1px solid #1e1e30', borderRadius: '0.75rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <img
                    src={deleteTarget.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'}
                    alt=""
                    style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff6b6b30' }}
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.9rem', color: '#e8e8f0' }}>{deleteTarget.name}</div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: '#6060a0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{deleteTarget.email}</div>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, color: deleteTarget.role === 'admin' ? '#ff6b6b' : deleteTarget.role === 'creator' ? '#a78bfa' : '#00d4aa', background: deleteTarget.role === 'admin' ? '#ff6b6b15' : deleteTarget.role === 'creator' ? '#a78bfa15' : '#00d4aa15', padding: '0.2rem 0.6rem', borderRadius: '0.25rem', letterSpacing: '0.05em' }}>
                      {deleteTarget.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ padding: '0 1.5rem 1.5rem', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                  style={{ padding: '0.625rem 1.25rem', background: '#1a1a2a', border: '1px solid #2a2a40', borderRadius: '0.5rem', color: '#9090b0', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#3a3a55'; e.currentTarget.style.color = '#e8e8f0' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a40'; e.currentTarget.style.color = '#9090b0' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  style={{ padding: '0.625rem 1.25rem', background: deleting ? '#ff6b6b60' : '#ff6b6b', border: 'none', borderRadius: '0.5rem', color: '#fff', fontSize: '0.875rem', fontWeight: 600, cursor: deleting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s', opacity: deleting ? 0.7 : 1 }}
                  onMouseEnter={e => { if (!deleting) e.currentTarget.style.background = '#ff5252' }}
                  onMouseLeave={e => { if (!deleting) e.currentTarget.style.background = '#ff6b6b' }}
                >
                  {deleting ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ width: 14, height: 14, border: '2px solid #ffffff40', borderTopColor: '#fff', borderRadius: '50%' }} />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <FiTrash2 size={14} />
                      Delete User
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
