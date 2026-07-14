import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiFacebook, FiTwitter, FiZap } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer style={{ background: '#050508', borderTop: '1px solid #1a1a28', padding: '3rem 1.5rem 1.5rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '0.75rem' }}>
              <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #00d4aa, #00a8ff)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiZap style={{ color: '#08080f', width: 18, height: 18 }} />
              </div>
              <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.1rem', background: 'linear-gradient(135deg, #00d4aa, #00a8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                FundRise
              </span>
            </Link>
            <p style={{ color: '#5a5a78', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: 260 }}>
              Empowering creators and supporters to bring bold ideas to life through community-powered funding.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              {[
                { icon: <FiGithub />, href: 'https://github.com' },
                { icon: <FiLinkedin />, href: 'https://linkedin.com' },
                { icon: <FiFacebook />, href: 'https://facebook.com' },
                { icon: <FiTwitter />, href: 'https://twitter.com' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  style={{ width: 36, height: 36, background: '#13131e', border: '1px solid #1e1e30', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7070a0', transition: 'all 0.2s', textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#00d4aa50'; (e.currentTarget as HTMLElement).style.color = '#00d4aa' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1e1e30'; (e.currentTarget as HTMLElement).style.color = '#7070a0' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.85rem', color: '#9090b0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Platform</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[['Explore Campaigns', '/explore'], ['How It Works', '/#how-it-works'], ['Start a Campaign', '/register'], ['Success Stories', '/#testimonials']].map(([label, href]) => (
                <li key={label}>
                  <Link to={href} style={{ color: '#5a5a78', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#00d4aa')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#5a5a78')}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.85rem', color: '#9090b0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[['About Us', '#'], ['Blog', '#'], ['Careers', '#'], ['Press Kit', '#']].map(([label, href]) => (
                <li key={label}>
                  <a href={href} style={{ color: '#5a5a78', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#00d4aa')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#5a5a78')}
                  >{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.85rem', color: '#9090b0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[['Terms of Service', '#'], ['Privacy Policy', '#'], ['Cookie Policy', '#'], ['Creator Agreement', '#']].map(([label, href]) => (
                <li key={label}>
                  <a href={href} style={{ color: '#5a5a78', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#00d4aa')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#5a5a78')}
                  >{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1a1a28', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ color: '#3a3a55', fontSize: '0.8rem', margin: 0 }}>© 2025 FundRise. All rights reserved.</p>
          <p style={{ color: '#3a3a55', fontSize: '0.8rem', margin: 0 }}>Built with passion for creators worldwide.</p>
        </div>
      </div>
    </footer>
  )
}
