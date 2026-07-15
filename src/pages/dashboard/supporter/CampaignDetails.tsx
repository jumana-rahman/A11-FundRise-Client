import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiTarget, FiZap, FiUser, FiArrowLeft, FiGift } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAuth } from '../../../context/AuthContext'
import { api } from '../../../lib/api'

export default function CampaignDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, updateCredits } = useAuth()
  const [amount, setAmount] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [campaign, setCampaign] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    api.get<any>(`/api/campaigns/${id}`)
      .then(res => { setCampaign(res); setLoading(false) })
      .catch(() => { setLoading(false) })
  }, [id])

  if (loading) return <div style={{ color: '#6060a0', padding: '2rem' }}>Loading campaign...</div>
  if (!campaign) return <div style={{ color: '#ff6b6b', padding: '2rem' }}>Campaign not found.</div>

  const pct = Math.min(100, Math.round((campaign.amountRaised / campaign.fundingGoal) * 100))
  const daysLeft = Math.max(0, Math.ceil((new Date(campaign.deadline).getTime() - Date.now()) / 86400000))

  const handleContribute = async (e: React.FormEvent) => {
    e.preventDefault()
    const num = parseInt(amount)
    if (!num || num < campaign.minimumContribution) {
      toast.error(`Minimum contribution is ${campaign.minimumContribution} credits`)
      return
    }
    if ((user?.credits ?? 0) < num) {
      toast.error('Insufficient credits. Please purchase more.')
      return
    }
    setSubmitting(true)
    try {
      await api.post('/api/contributions', {
        campaignId: campaign._id,
        campaignTitle: campaign.campaignTitle,
        contributionAmount: num,
        creatorEmail: campaign.creatorEmail,
        creatorName: campaign.creatorName,
      })
      updateCredits(-num)
      setAmount('')
      toast.success(`Contributed ${num} credits! Awaiting creator approval.`)
    } catch (err: any) {
      toast.error(err.message || 'Failed to contribute')
    }
    setSubmitting(false)
  }

  return (
    <div>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', color: '#7070a0', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <FiArrowLeft size={16} /> Back to Campaigns
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ borderRadius: '1rem', overflow: 'hidden', marginBottom: '1.5rem', position: 'relative' }}>
              <img src={campaign.campaignImageUrl} alt={campaign.campaignTitle} style={{ width: '100%', height: 320, objectFit: 'cover' }} />
              <span style={{ position: 'absolute', top: 12, left: 12, background: '#00d4aa18', border: '1px solid #00d4aa40', color: '#00d4aa', padding: '0.25rem 0.75rem', borderRadius: 99, fontSize: '0.75rem', fontWeight: 600 }}>{campaign.category}</span>
            </div>

            <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.75rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>{campaign.campaignTitle}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#7070a0', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              <FiUser size={14} /> by {campaign.creatorName}
            </div>

            <div className="progress-bar" style={{ marginBottom: '0.75rem' }}>
              <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1.2 }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Raised', value: `${campaign.amountRaised.toLocaleString()} credits`, icon: <FiZap size={16} />, color: '#00d4aa' },
                { label: 'Goal', value: `${campaign.fundingGoal.toLocaleString()} credits`, icon: <FiTarget size={16} />, color: '#a78bfa' },
                { label: 'Days Left', value: `${daysLeft} days`, icon: <FiCalendar size={16} />, color: '#60a5fa' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#13131e', border: '1px solid #1e1e30', borderRadius: '0.625rem', padding: '0.875rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: s.color, marginBottom: '0.35rem' }}>{s.icon}<span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{s.label}</span></div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '1.05rem', color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.75rem' }}>About This Campaign</h3>
              <p style={{ color: '#9090b0', lineHeight: 1.8, fontSize: '0.9rem' }}>{campaign.campaignStory}</p>
            </div>

            <div style={{ background: '#13131e', border: '1px solid #1e1e30', borderRadius: '0.75rem', padding: '1.125rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffd93d', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                <FiGift size={14} /> Reward for Supporters
              </div>
              <p style={{ color: '#9090b0', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{campaign.rewardInfo}</p>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '1rem', padding: '1.5rem', position: 'sticky', top: 80 }}>
            <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.375rem' }}>Back This Campaign</h3>
            <p style={{ color: '#6060a0', fontSize: '0.8rem', marginBottom: '1.25rem' }}>Minimum contribution: <span style={{ color: '#00d4aa', fontFamily: 'JetBrains Mono' }}>{campaign.minimumContribution}</span> credits</p>

            <div style={{ background: '#0e0e18', borderRadius: '0.625rem', padding: '0.875rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6060a0', fontSize: '0.8rem' }}>Your balance</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <FiZap size={13} style={{ color: '#00d4aa' }} />
                <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, color: '#00d4aa' }}>{user?.credits ?? 0}</span>
              </div>
            </div>

            <form onSubmit={handleContribute}>
              <label className="form-label">Contribution Amount (credits)</label>
              <input type="number" className="form-input" placeholder={`Min. ${campaign.minimumContribution}`} value={amount} onChange={e => setAmount(e.target.value)} min={campaign.minimumContribution} max={user?.credits} style={{ marginBottom: '1rem' }} />
              <button type="submit" className="btn-primary" disabled={submitting} style={{ width: '100%', padding: '0.875rem', fontSize: '0.9rem' }}>
                {submitting ? 'Submitting...' : <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}><FiZap size={14} /> Contribute Now</span>}
              </button>
            </form>

            <p style={{ fontSize: '0.75rem', color: '#3a3a55', textAlign: 'center', marginTop: '0.875rem' }}>
              Contributions are held pending creator review.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
