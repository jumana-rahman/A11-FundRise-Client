import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiArrowRight } from 'react-icons/fi'
import { api } from '../lib/api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ImageWithFallback from '../components/ImageWithFallback'

export default function Explore() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>()
  const categories = ['All', 'Technology', 'Art', 'Community', 'Health', 'Education', 'Environment']

  useEffect(() => {
    clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(debounceTimer.current)
  }, [search])

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (debouncedSearch) params.set('search', debouncedSearch)
    if (category !== 'All') params.set('category', category)
    api.get<any[]>(`/api/campaigns?${params.toString()}`)
      .then(res => { setCampaigns(Array.isArray(res) ? res : []); setLoading(false) })
      .catch(() => { setCampaigns([]); setLoading(false) })
  }, [debouncedSearch, category])

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', background: '#08080f', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '2.5rem' }}>
            <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '0.5rem' }}>Explore Campaigns</h1>
            <p style={{ color: '#7070a0' }}>Discover {campaigns.length} active campaigns across every category.</p>
          </motion.div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, position: 'relative', minWidth: 200 }}>
              <FiSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#4a4a65' }} size={16} />
              <input type="text" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="Search campaigns…" value={search} onChange={e => setSearch(e.target.value)} />
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '1rem', overflow: 'hidden' }}>
                  <div style={{ height: 200, background: '#1a1a28', animation: 'pulse 1.5s infinite' }} />
                  <div style={{ padding: '1.25rem' }}>
                    <div style={{ height: 16, background: '#1a1a28', borderRadius: 4, marginBottom: 8, width: '70%', animation: 'pulse 1.5s infinite' }} />
                    <div style={{ height: 12, background: '#1a1a28', borderRadius: 4, width: '40%', animation: 'pulse 1.5s infinite' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : campaigns.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#5a5a78' }}>No campaigns found matching your filters.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {campaigns.map((c: any, i: number) => {
                const pct = Math.min(100, Math.round(((c.amountRaised || 0) / (c.fundingGoal || 1)) * 100))
                const daysLeft = Math.max(0, Math.ceil((new Date(c.deadline).getTime() - Date.now()) / 86400000))
                return (
                  <motion.div key={c._id || i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="campaign-card card-glow">
                    <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                      <ImageWithFallback src={c.campaignImageUrl || c.imageUrl || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop'} alt={c.campaignTitle || c.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #111118 0%, transparent 50%)' }} />
                      <span style={{ position: 'absolute', top: 10, left: 10, background: '#00d4aa18', border: '1px solid #00d4aa30', color: '#00d4aa', padding: '0.15rem 0.5rem', borderRadius: 99, fontSize: '0.68rem', fontWeight: 600 }}>{c.category}</span>
                    </div>
                    <div style={{ padding: '1.25rem' }}>
                      <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{c.campaignTitle || c.title}</h3>
                      <p style={{ color: '#6060a0', fontSize: '0.78rem', marginBottom: '0.875rem' }}>by {c.creatorName}</p>
                      <div className="progress-bar" style={{ marginBottom: '0.5rem' }}>
                        <div className="progress-fill" style={{ width: `${pct}%` }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '1rem' }}>
                        <span style={{ color: '#00d4aa', fontFamily: 'JetBrains Mono', fontWeight: 600 }}>{(c.amountRaised || 0).toLocaleString()} raised</span>
                        <span style={{ color: '#5a5a78' }}>{daysLeft}d left · {pct}%</span>
                      </div>
                      <Link to={`/login`} className="btn-outline" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', width: '100%', fontSize: '0.82rem', padding: '0.55rem 1rem' }}>
                        View Details <FiArrowRight size={13} />
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
