const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY || ''

export async function uploadToImgBB(file: File): Promise<string> {
  if (!IMGBB_API_KEY) {
    throw new Error('imgBB API key not configured. Set VITE_IMGBB_API_KEY in your .env file.')
  }

  const formData = new FormData()
  formData.append('image', file)

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    throw new Error('Image upload failed')
  }

  const data = await res.json()
  if (!data.success) {
    throw new Error(data.error?.message || 'Image upload failed')
  }

  return data.data.url
}
