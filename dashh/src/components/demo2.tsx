import TiltCard from './tilt-card2'

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-screen  ">
      <div className="flex items-center justify-center">
        <TiltCard
          imageUrl="https://www.dialect.to/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffirst-block.fad681f9.png&w=1920&q=75"
          alt="Dialect first block"
          maxTilt={15}
        />
        {/* <TiltCard
          imageUrl="/placeholder.svg?height=400&width=600&text=Transparent+Background"
          alt="Transparent background example"
          maxTilt={15}
        /> */}
      </div>
    </div>
  )
}

