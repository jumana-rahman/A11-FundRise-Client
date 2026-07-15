import { useState } from 'react'

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
}

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop'

export default function ImageWithFallback({ src, fallback = DEFAULT_FALLBACK, alt, style, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallback)
      setHasError(true)
    }
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      style={style}
      onError={handleError}
      {...props}
    />
  )
}
