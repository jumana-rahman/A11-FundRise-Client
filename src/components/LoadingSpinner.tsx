import { motion } from 'framer-motion'
import { FiZap } from 'react-icons/fi'

interface Props {
  size?: number
  text?: string
  fullScreen?: boolean
}

export default function LoadingSpinner({ size = 32, text, fullScreen }: Props) {
  const spinner = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <FiZap size={size * 0.6} style={{ color: '#00d4aa' }} />
      </motion.div>
      {text && <p style={{ color: '#6060a0', fontSize: '0.85rem' }}>{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#08080f', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
        {spinner}
      </div>
    )
  }

  return spinner
}
