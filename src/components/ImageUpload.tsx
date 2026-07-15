import { useState, useRef } from 'react'
import { FiImage, FiX, FiLoader } from 'react-icons/fi'
import { uploadToImgBB } from '../lib/imgbb'

interface Props {
  value: string
  onChange: (url: string) => void
  label?: string
  className?: string
}

export default function ImageUpload({ value, onChange, label = 'Upload Image', className }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB')
      return
    }

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    setError('')
    setUploading(true)
    try {
      const url = await uploadToImgBB(file)
      onChange(url)
    } catch (err: any) {
      setError(err.message || 'Upload failed')
    }
    setUploading(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleRemove = () => {
    onChange('')
    setError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  if (value) {
    return (
      <div style={{ position: 'relative', borderRadius: '0.625rem', overflow: 'hidden', border: '1px solid #2a2a40' }}>
        <img src={value} alt="Uploaded" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
        <button onClick={handleRemove} style={{ position: 'absolute', top: 8, right: 8, background: '#00000090', border: 'none', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
          <FiX size={14} />
        </button>
      </div>
    )
  }

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className={className}
        style={{
          width: '100%', padding: '2rem', background: '#0e0e18', border: '2px dashed #2a2a40',
          borderRadius: '0.625rem', cursor: uploading ? 'wait' : 'pointer', display: 'flex',
          flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#5a5a78',
          fontSize: '0.85rem', transition: 'all 0.2s',
        }}
        onMouseEnter={e => { if (!uploading) e.currentTarget.style.borderColor = '#00d4aa50' }}
        onMouseLeave={e => { if (!uploading) e.currentTarget.style.borderColor = '#2a2a40' }}
      >
        {uploading ? (
          <FiLoader size={24} className="animate-spin" style={{ color: '#00d4aa' }} />
        ) : (
          <FiImage size={24} style={{ color: '#00d4aa' }} />
        )}
        <span>{uploading ? 'Uploading...' : label}</span>
        <span style={{ fontSize: '0.7rem', color: '#3a3a55' }}>JPG, PNG, GIF up to 5MB</span>
      </button>
      {error && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.3rem' }}>{error}</p>}
    </div>
  )
}
