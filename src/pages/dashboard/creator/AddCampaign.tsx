import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiImage, FiArrowRight } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAuth } from '../../../context/AuthContext'
import { mockCampaigns } from '../../../data/mockData'

export default function AddCampaign() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '', story: '', category: 'Technology', fundingGoal: '', minContribution: '',
    deadline: '', rewardInfo: '', imageUrl: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.story.trim()) errs.story = 'Campaign story is required'
    if (!form.fundingGoal || parseInt(form.fundingGoal) < 100) errs.fundingGoal = 'Min funding goal is 100 credits'
    if (!form.minContribution || parseInt(form.minContribution) < 1) errs.minContribution = 'Min contribution must be at least 1'
    if (!form.deadline) errs.deadline = 'Deadline is required'
    else if (new Date(form.deadline) <= new Date()) errs.deadline = 'Deadline must be in the future'
    if (!form.rewardInfo.trim()) errs.rewardInfo = 'Reward info is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    mockCampaigns.push({
      id: `c_${Date.now()}`,
      title: form.title,
      story: form.story,
      category: form.category,
      fundingGoal: parseInt(form.fundingGoal),
      minContribution: parseInt(form.minContribution),
      deadline: form.deadline,
      rewardInfo: form.rewardInfo,
      imageUrl: form.imageUrl || `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop`,
      creatorName: user!.name,
      creatorEmail: user!.email,
      status: 'pending',
      amountRaised: 0,
      createdAt: new Date().toISOString().split('T')[0],
    })
    setLoading(false)
    toast.success('Campaign submitted for admin review!')
    navigate('/dashboard/my-campaigns')
  }

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(p => ({ ...p, [key]: e.target.value }))
    setErrors(p => { const n = { ...p }; delete n[key]; return n })
  }

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.375rem' }}>Add New Campaign</h1>
        <p style={{ color: '#6060a0', fontSize: '0.875rem' }}>Your campaign will be reviewed by an admin before going live.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', maxWidth: 900 }}>
          {/* Full width fields */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Campaign Title</label>
            <input className="form-input" placeholder="e.g. Help us build a solar-powered water pump" value={form.title} onChange={set('title')} />
            {errors.title && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.title}</p>}
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Campaign Story</label>
            <textarea className="form-input" rows={5} placeholder="Tell your supporters why this campaign matters…" value={form.story} onChange={set('story')} style={{ resize: 'vertical' }} />
            {errors.story && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.story}</p>}
          </div>

          {/* Two-column fields */}
          <div>
            <label className="form-label">Category</label>
            <select className="form-input" value={form.category} onChange={set('category')}>
              {['Technology', 'Art', 'Community', 'Health', 'Education', 'Environment'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="form-label">Funding Goal (credits)</label>
            <input type="number" className="form-input" placeholder="e.g. 5000" value={form.fundingGoal} onChange={set('fundingGoal')} min={100} />
            {errors.fundingGoal && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.fundingGoal}</p>}
          </div>

          <div>
            <label className="form-label">Minimum Contribution (credits)</label>
            <input type="number" className="form-input" placeholder="e.g. 10" value={form.minContribution} onChange={set('minContribution')} min={1} />
            {errors.minContribution && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.minContribution}</p>}
          </div>

          <div>
            <label className="form-label">Deadline</label>
            <input type="date" className="form-input" value={form.deadline} onChange={set('deadline')} min={new Date().toISOString().split('T')[0]} />
            {errors.deadline && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.deadline}</p>}
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Reward Info</label>
            <textarea className="form-input" rows={3} placeholder="What do supporters receive for pledging?" value={form.rewardInfo} onChange={set('rewardInfo')} style={{ resize: 'vertical' }} />
            {errors.rewardInfo && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.rewardInfo}</p>}
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Campaign Image URL <span style={{ color: '#3a3a55', textTransform: 'none' }}>(optional)</span></label>
            <div style={{ position: 'relative' }}>
              <FiImage style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#4a4a65' }} size={16} />
              <input type="url" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="https://images.unsplash.com/…" value={form.imageUrl} onChange={set('imageUrl')} />
            </div>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '0.875rem 2.5rem', fontSize: '0.95rem', opacity: loading ? 0.7 : 1, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              {loading ? 'Submitting…' : <><FiArrowRight size={16} /> Submit Campaign for Review</>}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
