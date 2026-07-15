import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiImage, FiArrowRight } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAuth } from '../../../context/AuthContext'
import { api } from '../../../lib/api'

export default function AddCampaign() {
  const { } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    campaignTitle: '', campaignStory: '', category: 'Technology', fundingGoal: '', minimumContribution: '',
    deadline: '', rewardInfo: '', campaignImageUrl: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.campaignTitle.trim()) errs.campaignTitle = 'Title is required'
    if (!form.campaignStory.trim()) errs.campaignStory = 'Campaign story is required'
    if (!form.fundingGoal || parseInt(form.fundingGoal) < 100) errs.fundingGoal = 'Min funding goal is 100 credits'
    if (!form.minimumContribution || parseInt(form.minimumContribution) < 1) errs.minimumContribution = 'Min contribution must be at least 1'
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
    try {
      await api.post('/api/campaigns', {
        campaignTitle: form.campaignTitle,
        campaignStory: form.campaignStory,
        category: form.category,
        fundingGoal: parseInt(form.fundingGoal),
        minimumContribution: parseInt(form.minimumContribution),
        deadline: form.deadline,
        rewardInfo: form.rewardInfo,
        campaignImageUrl: form.campaignImageUrl || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      })
      toast.success('Campaign submitted for admin review!')
      navigate('/dashboard/my-campaigns')
    } catch (err: any) {
      toast.error(err.message || 'Failed to create campaign')
    }
    setLoading(false)
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
          <div style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Campaign Title</label>
            <input className="form-input" placeholder="e.g. Help us build a solar-powered water pump" value={form.campaignTitle} onChange={set('campaignTitle')} />
            {errors.campaignTitle && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.campaignTitle}</p>}
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Campaign Story</label>
            <textarea className="form-input" rows={5} placeholder="Tell your supporters why this campaign matters..." value={form.campaignStory} onChange={set('campaignStory')} style={{ resize: 'vertical' }} />
            {errors.campaignStory && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.campaignStory}</p>}
          </div>

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
            <input type="number" className="form-input" placeholder="e.g. 10" value={form.minimumContribution} onChange={set('minimumContribution')} min={1} />
            {errors.minimumContribution && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.minimumContribution}</p>}
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
              <input type="url" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="https://images.unsplash.com/..." value={form.campaignImageUrl} onChange={set('campaignImageUrl')} />
            </div>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '0.875rem 2.5rem', fontSize: '0.95rem', opacity: loading ? 0.7 : 1, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              {loading ? 'Submitting...' : <><FiArrowRight size={16} /> Submit Campaign for Review</>}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
