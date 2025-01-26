"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Card } from "@/components/ui/card"

interface TiltCardProps {
  imageUrl: string
  alt: string
  maxTilt?: number
}

export default function TiltCard({ imageUrl, alt, maxTilt = 10 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const tiltX = ((y - centerY) / centerY) * maxTilt
      const tiltY = ((centerX - x) / centerX) * maxTilt

      setTilt({ x: tiltX, y: tiltY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => {
      setIsHovering(false)
      setTilt({ x: 0, y: 0 })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isHovering, maxTilt])

  return (
    <Card
      ref={cardRef}
      className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-out bg-transparent w-[70%] h-[70%] "
      style={{
        willChange: "'transform'",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1, 1, 1) translateZ(0)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full p-4 object-cover bg-transparent "
      />
    </Card>
  )
}

