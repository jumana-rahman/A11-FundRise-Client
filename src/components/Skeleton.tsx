import { motion } from 'framer-motion'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string
  style?: React.CSSProperties
}

export function Skeleton({ width, height = 16, borderRadius = '0.375rem', style }: SkeletonProps) {
  return (
    <motion.div
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width, height, borderRadius, background: '#1e1e30', ...style }}
    />
  )
}

export function CampaignCardSkeleton() {
  return (
    <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', overflow: 'hidden' }}>
      <Skeleton width="100%" height={180} borderRadius={0} />
      <div style={{ padding: '1.125rem' }}>
        <Skeleton width="80%" height={18} style={{ marginBottom: '0.5rem' }} />
        <Skeleton width="40%" height={14} style={{ marginBottom: '1rem' }} />
        <Skeleton width="100%" height={6} borderRadius="99px" style={{ marginBottom: '0.75rem' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton width="30%" height={14} />
          <Skeleton width="20%" height={14} />
        </div>
      </div>
    </div>
  )
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} style={{ padding: '0.875rem 1rem' }}>
          <Skeleton width={i === 0 ? '60%' : '80%'} height={14} />
        </td>
      ))}
    </tr>
  )
}

export function StatCardSkeleton() {
  return (
    <div style={{ background: '#111118', border: '1px solid #1e1e30', borderRadius: '0.875rem', padding: '1.25rem' }}>
      <Skeleton width={40} height={40} borderRadius="0.5rem" style={{ marginBottom: '1rem' }} />
      <Skeleton width="60%" height={28} style={{ marginBottom: '0.5rem' }} />
      <Skeleton width="40%" height={12} />
    </div>
  )
}
