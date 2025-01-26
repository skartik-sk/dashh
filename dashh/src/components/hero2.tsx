import Link from "next/link"
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <div>
      <div className="w-full mt-12">
        {/* Grid Pattern Background */}
        {/* shifted to layout of main page */}
        
        
        {/* Content Container */}
        <div className="relative mx-auto max-w-6xl px-4 py-20">
          {/* Top Banner */}
          <div className="relative mb-16 mx-auto max-w-3xl">
            <div className="rounded bg-[#011714] bg-opacity-50 p-2 text-center text-emerald-400 transition-all hover:bg-opacity-90 text-sm">
              <p>On-chain advertising platform to create a transparent, and secure ecosystem for  influencers</p>
            </div>
            <div className="absolute bottom-0 lef h-px bg-emerald-400 transform left-1/2 w-[87%] -translate-x-1/2"></div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              The Complete<br />
              guide to Engage & Earn
            </h1>
            
            <p className="mb-12 max-w-3xl text-lg text-gray-400 sm:text-xl">
              The all-in-one web-3 platform for decentralized micro-influencer marketing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <Link
                  href="#"
                  className="group inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#ff9a9e] via-[#ff6b95] to-[#a855f7] px-5 py-2 text-sm font-thin text-white transition-all hover:brightness-110 hover:shadow-[0_0_20px_rgba(255,106,149,0.8)] hover:-translate-y-1"
                  >
                  Get started for free
                  <ArrowRight className="transition-transform group-hover:translate-x-1 h-4 w-4" />
                  </Link>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

