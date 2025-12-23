/**
 * Cloudinary Helper
 *
 * Replace 'YOUR_CLOUD_NAME' with your actual Cloudinary Cloud Name.
 * You can find this in your Cloudinary Dashboard.
 */
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME



/**
 * Generates an optimized Cloudinary URL
 * @param publicId - The public ID of the asset (e.g. 'volvo/lights-out')
 * @param type - 'image' or 'video'
 * @returns The full Cloudinary URL
 */
export const getCloudinaryUrl = (publicId: string, type: 'image' | 'video' = 'image') => {
  // Base URL for Cloudinary
  const base = `https://res.cloudinary.com/${CLOUD_NAME}/${type}/upload`

  // Optimization transformations
  // f_auto: automatic format (webp/avif)
  // q_auto: automatic quality
  const transforms = 'f_auto,q_auto'

  return `${base}/${transforms}/v1/${publicId}`
}

