import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import { FiArrowRight, FiStar, FiUsers, FiTrendingUp, FiShield, FiDollarSign, FiTarget, FiAward } from 'react-icons/fi'
import { mockCampaigns } from '../data/mockData'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const heroSlides = [
  {
    title: 'Fund the Future',
    subtitle: 'Back bold ideas that reshape the world — from independent creators who dare to dream bigger.',
    cta: 'Explore Campaigns',
    ctaLink: '/explore',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&h=700&fit=crop',
    tag: 'Community Impact',
  },
  {
    title: 'Launch Your Vision',
    subtitle: 'Transform your creative project into reality with backing from thousands of passionate supporters worldwide.',
    cta: 'Start a Campaign',
    ctaLink: '/register',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1400&h=700&fit=crop',
    tag: 'For Creators',
  },
  {
    title: 'Every Credit Counts',
    subtitle: 'Even the smallest contribution creates ripples. Join a global community turning possibilities into reality.',
    cta: 'Get Started',
    ctaLink: '/register',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1400&h=700&fit=crop',
    tag: 'Make a Difference',
  },
]

const testimonials = [
  {
    name: 'Amara Okafor',
    role: 'Backer & Community Organizer',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop',
    quote: "FundRise gave our neighborhood garden project wings. Within 3 weeks we had 200 backers and more momentum than we ever imagined. It's not just funding — it's community.",
    rating: 5,
  },
  {
    name: 'Kenji Watanabe',
    role: 'Independent Game Developer',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    quote: "I launched my retro RPG campaign with zero budget for marketing. FundRise's platform did the heavy lifting. Fully funded in 11 days. The creator tools are genuinely excellent.",
    rating: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Environmental Researcher',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    quote: "Our ocean cleanup initiative needed visibility, not just money. FundRise delivered both. The supporter community is incredibly engaged and I get feedback directly from backers.",
    rating: 5,
  },
  {
    name: 'Carlos Mendez',
    role: 'Documentary Filmmaker',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    quote: "Three campaigns, three successes. FundRise is the most transparent, backer-friendly platform I've used. The payout system is fast and the admin team is responsive.",
    rating: 5,
  },
]

const categories = [
  { name: 'Technology', count: 284, icon: '⚡', color: '#00d4aa' },
  { name: 'Art & Design', count: 197, icon: '🎨', color: '#a78bfa' },
  { name: 'Community', count: 341, icon: '🌱', color: '#34d399' },
  { name: 'Health', count: 156, icon: '💙', color: '#60a5fa' },
  { name: 'Education', count: 223, icon: '📚', color: '#fbbf24' },
  { name: 'Environment', count: 118, icon: '🌍', color: '#4ade80' },
]

const stats = [
  { value: '$4.2M', label: 'Total Funded', icon: <FiDollarSign /> },
  { value: '12,400+', label: 'Active Backers', icon: <FiUsers /> },
  { value: '890', label: 'Campaigns Launched', icon: <FiTarget /> },
  { value: '94%', label: 'Success Rate', icon: <FiAward /> },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

export default function Home() {
  const topCampaigns = [...mockCampaigns]
    .filter(c => c.status === 'approved')
    .sort((a, b) => b.amountRaised - a.amountRaised)
    .slice(0, 6)

  return (
    <div style={{ background: '#08080f', minHeight: '100vh' }}>
      {/* Hero Slider */}
      <section style={{ position: 'relative' }}>
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          style={{ height: '88vh', minHeight: 500 }}
        >
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
                <img src={slide.image} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.25)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #08080fdd 0%, #08080f88 100%)' }} />
                {/* Geometric accent */}
                <div style={{ position: 'absolute', top: '15%', right: '8%', width: 300, height: 300, border: '1px solid #00d4aa15', transform: 'rotate(15deg)', borderRadius: 16 }} />
                <div style={{ position: 'absolute', top: '25%', right: '12%', width: 200, height: 200, border: '1px solid #00d4aa10', transform: 'rotate(30deg)', borderRadius: 12 }} />

                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 8%' }}>
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    style={{ maxWidth: 700 }}
                  >
                    <span style={{ display: 'inline-block', background: '#00d4aa15', border: '1px solid #00d4aa30', color: '#00d4aa', padding: '0.3rem 1rem', borderRadius: 99, fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {slide.tag}
                    </span>
                    <h1 style={{ fontFamily: 'Poppins', fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
                      <span className="gradient-text">{slide.title}</span>
                    </h1>
                    <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#9090b0', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 560 }}>
                      {slide.subtitle}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <Link to={slide.ctaLink} className="btn-primary" style={{ textDecoration: 'none', fontSize: '1rem', padding: '0.875rem 2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        {slide.cta} <FiArrowRight />
                      </Link>
                      <Link to="/explore" className="btn-outline" style={{ textDecoration: 'none', fontSize: '1rem', padding: '0.875rem 2rem' }}>
                        Browse All
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Stats Bar */}
      <section style={{ background: '#0e0e18', borderTop: '1px solid #1e1e30', borderBottom: '1px solid #1e1e30' }}>
        <div className="stats-grid" style={{ maxWidth: 1280, margin: '0 auto', padding: '1.5rem' }}>
          {stats.map((s, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', color: '#00d4aa', marginBottom: '0.25rem', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.75rem', background: 'linear-gradient(135deg, #00d4aa, #00a8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: '#5a5a78', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Top Funded Campaigns */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '5rem 1.5rem' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} style={{ marginBottom: '3rem' }}>
          <span style={{ display: 'inline-block', color: '#00d4aa', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Top Performers</span>
          <h2 style={{ fontFamily: 'Poppins', fontSize: 'clamp(1.8rem, 3vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Most Funded Campaigns
          </h2>
          <p style={{ color: '#7070a0', fontSize: '1.05rem', maxWidth: 520 }}>The campaigns raising the most support from our community right now.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {topCampaigns.map((c, i) => {
            const pct = Math.min(100, Math.round((c.amountRaised / c.fundingGoal) * 100))
            const daysLeft = Math.max(0, Math.ceil((new Date(c.deadline).getTime() - Date.now()) / 86400000))
            return (
              <motion.div key={c.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="campaign-card card-glow">
                <div style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                  <img src={c.imageUrl} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #111118 0%, transparent 60%)' }} />
                  <span style={{ position: 'absolute', top: 12, left: 12, background: '#00d4aa20', border: '1px solid #00d4aa40', color: '#00d4aa', padding: '0.2rem 0.6rem', borderRadius: 99, fontSize: '0.7rem', fontWeight: 600 }}>
                    {c.category}
                  </span>
                  {i === 0 && <span style={{ position: 'absolute', top: 12, right: 12, background: 'linear-gradient(135deg, #ffd93d, #ff8c00)', color: '#08080f', padding: '0.2rem 0.6rem', borderRadius: 99, fontSize: '0.7rem', fontWeight: 700 }}>🏆 Top Funded</span>}
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1rem', marginBottom: '0.375rem', lineHeight: 1.4 }}>{c.title}</h3>
                  <p style={{ color: '#7070a0', fontSize: '0.8rem', marginBottom: '1rem' }}>by {c.creatorName}</p>

                  <div className="progress-bar" style={{ marginBottom: '0.625rem' }}>
                    <motion.div className="progress-fill" initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.05 }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, color: '#00d4aa', fontSize: '1.1rem' }}>{c.amountRaised.toLocaleString()}</div>
                      <div style={{ fontSize: '0.7rem', color: '#5a5a78' }}>of {c.fundingGoal.toLocaleString()} credits</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, color: pct >= 100 ? '#00d4aa' : '#e8e8f0', fontSize: '1rem' }}>{pct}%</div>
                      <div style={{ fontSize: '0.7rem', color: '#5a5a78' }}>{daysLeft}d left</div>
                    </div>
                  </div>

                  <Link to={`/explore/${c.id}`} className="btn-outline" style={{ textDecoration: 'none', display: 'block', textAlign: 'center', width: '100%' }}>
                    View Campaign
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to="/explore" className="btn-primary" style={{ textDecoration: 'none', fontSize: '1rem', padding: '0.875rem 2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Explore All Campaigns <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ background: '#0a0a14', borderTop: '1px solid #1a1a28', borderBottom: '1px solid #1a1a28', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#00d4aa', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.75rem' }}>Simple Process</span>
            <h2 style={{ fontFamily: 'Poppins', fontSize: 'clamp(1.8rem, 3vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>How It Works</h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {[
              { step: '01', title: 'Create an Account', desc: 'Register as a Supporter or Creator in seconds. No credit card required to get started.', icon: '👤', color: '#00d4aa' },
              { step: '02', title: 'Discover Campaigns', desc: 'Browse hundreds of vetted campaigns across tech, art, health, and community categories.', icon: '🔍', color: '#a78bfa' },
              { step: '03', title: 'Contribute Credits', desc: 'Purchase credits and back the projects that excite you. Minimum contributions start low.', icon: '⚡', color: '#60a5fa' },
              { step: '04', title: 'Watch It Grow', desc: 'Track your contributions, receive updates from creators, and see your impact in real time.', icon: '📈', color: '#34d399' },
            ].map((step, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '1rem', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 16, right: 16, fontFamily: 'JetBrains Mono', fontSize: '3.5rem', fontWeight: 900, color: step.color, opacity: 0.06, lineHeight: 1 }}>{step.step}</div>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{step.icon}</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: step.color, marginBottom: '0.5rem', fontWeight: 600 }}>STEP {step.step}</div>
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.625rem' }}>{step.title}</h3>
                <p style={{ color: '#6060a0', fontSize: '0.875rem', lineHeight: 1.65 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore by Category */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '5rem 1.5rem' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} style={{ marginBottom: '3rem' }}>
          <span style={{ color: '#00d4aa', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.75rem' }}>Find Your Cause</span>
          <h2 style={{ fontFamily: 'Poppins', fontSize: 'clamp(1.8rem, 3vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>Explore by Category</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
          {categories.map((cat, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Link to="/explore" style={{ textDecoration: 'none', display: 'block', background: '#111118', border: `1px solid ${cat.color}22`, borderRadius: '0.875rem', padding: '1.5rem 1.25rem', transition: 'all 0.25s', cursor: 'pointer' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `${cat.color}10`; el.style.borderColor = `${cat.color}55`; el.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#111118'; el.style.borderColor = `${cat.color}22`; el.style.transform = 'translateY(0)' }}
              >
                <div style={{ fontSize: '2.25rem', marginBottom: '0.875rem' }}>{cat.icon}</div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.95rem', color: '#e8e8f0', marginBottom: '0.25rem' }}>{cat.name}</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: cat.color }}>{cat.count} campaigns</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" style={{ background: '#0a0a14', borderTop: '1px solid #1a1a28', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#00d4aa', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.75rem' }}>Community Voices</span>
            <h2 style={{ fontFamily: 'Poppins', fontSize: 'clamp(1.8rem, 3vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>What Our Community Says</h2>
          </motion.div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            style={{ paddingBottom: '3rem' }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '1rem', padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem' }}>
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <FiStar key={j} style={{ color: '#ffd93d', fill: '#ffd93d', width: 14, height: 14 }} />
                    ))}
                  </div>
                  <p style={{ color: '#9090b0', fontSize: '0.9rem', lineHeight: 1.75, flex: 1, marginBottom: '1.5rem', fontStyle: 'italic' }}>"{t.quote}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <img src={t.photo} alt={t.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid #00d4aa30' }} />
                    <div>
                      <div style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#5a5a78' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Platform Impact / CTA */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '5rem 1.5rem' }}>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ background: 'linear-gradient(135deg, #0e1e1a, #0e1420)', border: '1px solid #00d4aa20', borderRadius: '1.5rem', padding: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative elements */}
          <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, border: '1px solid #00d4aa12', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, border: '1px solid #00a8ff10', borderRadius: '50%' }} />

          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#00d4aa15', border: '1px solid #00d4aa30', color: '#00d4aa', padding: '0.35rem 1rem', borderRadius: 99, fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            <FiTrendingUp size={14} /> Platform Impact
          </span>
          <h2 style={{ fontFamily: 'Poppins', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Ready to Make Your <span className="gradient-text">Mark?</span>
          </h2>
          <p style={{ color: '#7070a0', fontSize: '1.1rem', maxWidth: 520, margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Join 12,400+ supporters and creators already changing the world through the power of community funding.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn-primary" style={{ textDecoration: 'none', fontSize: '1rem', padding: '0.875rem 2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Start Today <FiArrowRight />
            </Link>
            <Link to="/explore" className="btn-outline" style={{ textDecoration: 'none', fontSize: '1rem', padding: '0.875rem 2.5rem' }}>
              Explore Campaigns
            </Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {[['✅', 'No fees to browse'], ['🔒', 'Secure payments'], ['⚡', '50 free credits on signup']].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#5a5a78', fontSize: '0.85rem' }}>
                <span>{icon}</span> {text}
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}
