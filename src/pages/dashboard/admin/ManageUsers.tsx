import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiTrash2 } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { mockUsers } from '../../../data/mockData'

export default function ManageUsers() {
  const [users, setUsers] = useState([...mockUsers])

  const deleteUser = (id: string) => {
    if (!confirm('Delete this user permanently?')) return
    setUsers(prev => prev.filter(u => u.id !== id))
    const idx = mockUsers.findIndex(u => u.id === id)
    if (idx !== -1) mockUsers.splice(idx, 1)
    toast.success('User deleted.')
  }

  const changeRole = (id: string, role: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u))
    const user = mockUsers.find(u => u.id === id)
    if (user) user.role = role as typeof user.role
    toast.success('Role updated.')
  }

  const roleColor = (r: string) => r === 'admin' ? '#ff6b6b' : r === 'creator' ? '#a78bfa' : '#00d4aa'

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Manage Users</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>{users.length} registered users</p>
      </div>

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
                {users.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <img src={u.photoUrl} alt={u.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${roleColor(u.role)}30` }} />
                        <span style={{ fontWeight: 500 }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ color: '#7070a0', fontSize: '0.82rem' }}>{u.email}</td>
                    <td><span style={{ fontFamily: 'JetBrains Mono', color: '#00d4aa' }}>{u.credits}</span></td>
                    <td>
                      <select value={u.role} onChange={e => changeRole(u.id, e.target.value)}
                        style={{ background: `${roleColor(u.role)}18`, border: `1px solid ${roleColor(u.role)}40`, color: roleColor(u.role), padding: '0.25rem 0.625rem', borderRadius: '0.375rem', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600, outline: 'none' }}>
                        <option value="supporter">Supporter</option>
                        <option value="creator">Creator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => deleteUser(u.id)} className="btn-danger" style={{ padding: '0.3rem 0.625rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <FiTrash2 size={12} /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
