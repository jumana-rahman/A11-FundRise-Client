import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiTrash2 } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { api } from '../../../lib/api'

export default function ManageUsers() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this user?')) return
    try {
      await api.del(`/api/users/admin/${id}`)
      setUsers(prev => prev.filter(u => u._id !== id))
      toast.success('User deleted')
    } catch (err: any) {
      toast.error(err.message || 'Failed')
    }
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
                        <button onClick={() => handleDelete(u._id)} style={{ background: '#ff6b6b15', color: '#ff6b6b', border: '1px solid #ff6b6b30', borderRadius: '0.375rem', padding: '0.3rem 0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
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
    </div>
  )
}
