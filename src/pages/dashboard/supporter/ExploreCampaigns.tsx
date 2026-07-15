import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiArrowRight } from 'react-icons/fi'
import { api } from '../../../lib/api'

export default function ExploreCampaigns() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const categories = ['All', 'Technology', 'Art', 'Community', 'Health']

  useEffect(() => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (category !== 'All') params.set('category', category)
    api.get<any[]>(`/api/campaigns?${params.toString()}`)
      .then(res => { setCampaigns(Array.isArray(res) ? res : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [search, category])

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Explore Campaigns</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>Discover active campaigns and back what matters to you.</p>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, position: 'relative', minWidth: 200 }}>
          <FiSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#4a4a65' }} size={16} />
          <input type="text" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="Search campaigns or creators..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} style={{ padding: '0.5rem 1rem', borderRadius: '2rem', border: `1px solid ${category === cat ? '#00d4aa' : '#2a2a40'}`, background: category === cat ? '#00d4aa15' : 'transparent', color: category === cat ? '#00d4aa' : '#7070a0', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#5a5a78' }}>Loading campaigns...</div>
      ) : campaigns.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#5a5a78' }}>No campaigns found matching your filters.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {campaigns.map((c: any, i: number) => {
            const pct = Math.min(100, Math.round((c.amountRaised / c.fundingGoal) * 100))
            const daysLeft = Math.max(0, Math.ceil((new Date(c.deadline).getTime() - Date.now()) / 86400000))
            return (
              <motion.div key={c._id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="campaign-card">
                <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                  <img src={c.campaignImageUrl} alt={c.campaignTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #111118 0%, transparent 50%)' }} />
                  <span style={{ position: 'absolute', top: 10, left: 10, background: '#00d4aa18', border: '1px solid #00d4aa30', color: '#00d4aa', padding: '0.15rem 0.5rem', borderRadius: 99, fontSize: '0.68rem', fontWeight: 600 }}>{c.category}</span>
                </div>
                <div style={{ padding: '1.125rem' }}>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem', lineHeight: 1.4 }}>{c.campaignTitle}</h3>
                  <p style={{ color: '#6060a0', fontSize: '0.78rem', marginBottom: '0.875rem' }}>by {c.creatorName}</p>
                  <div className="progress-bar" style={{ marginBottom: '0.5rem' }}>
                    <div className="progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.875rem' }}>
                    <span style={{ color: '#00d4aa', fontFamily: 'JetBrains Mono', fontWeight: 600 }}>{c.amountRaised.toLocaleString()} raised</span>
                    <span style={{ color: '#5a5a78' }}>{daysLeft}d left · {pct}%</span>
                  </div>
                  <Link to={`/dashboard/campaign/${c._id}`} className="btn-outline" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', width: '100%', fontSize: '0.82rem', padding: '0.55rem 1rem' }}>
                    View Details <FiArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
