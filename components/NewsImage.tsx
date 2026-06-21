'use client'

import Image from 'next/image'

export default function NewsImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-300"
      unoptimized
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
    />
  )
}
