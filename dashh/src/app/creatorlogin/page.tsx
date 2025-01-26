import React from 'react'

const Page = () => {
  return (
    <div>Page</div>
  )
}

export default Page
// "use client"

// import { useState } from 'react'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Wallet, Lock } from "lucide-react"
// import { useRouter } from 'next/navigation'


// export default page
// export default function CreatorLogin() {
//   const [solAddress, setSolAddress] = useState('')
//   const [password, setPassword] = useState('')
//   const router = useRouter();
//   if (!window) {
//     return {
//       notFound: true,
//     }
//   }
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Here you would typically handle the login logic
//     // console.log('Login attempted with:', { solAddress, password });
//     router.push('/dashboard');

//   }

//   return (
//     <div className=" my-12 bg-black flex items-center justify-center p-4">
//       <Card className="w-full max-w-md bg-black text-white border-gray-800">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold text-center">Creator Login</CardTitle>
//           <CardDescription className="text-gray-400 text-center">
//             Enter your SOL address and password to access your creator dashboard
//           </CardDescription>
//         </CardHeader>
//         <form onSubmit={handleSubmit}>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="sol-address" className="text-gray-300">SOL Address</Label>
//               <div className="relative">
//                 <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
//                 <Input
//                   id="sol-address"
//                   placeholder="Enter your SOL address"
//                   value={solAddress}
//                   onChange={(e) => setSolAddress(e.target.value)}
//                   className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password" className="text-gray-300">Password</Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
//                 />
//               </div>
//             </div>
//           </CardContent>
//           <CardFooter>
//             <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
//               Log In
//             </Button>
//           </CardFooter>
//         </form>
//         <div className="text-center pb-6">
//           <a href="#" className="text-sm text-purple-400 hover:text-purple-300">Forgot password?</a>
//         </div>
//       </Card>
//     </div>
//   )
// }