// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Eye, Zap } from "lucide-react"

// export function FullyBlackThemeDashboard() {
//   const [leaderboard, setLeaderboard] = useState([
//     { address: "7fUAJdStEuGbc3sM84cKRL6yYaaSstyLSU", views: 1024 },
//     { address: "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin", views: 986 },
//     { address: "2FrmqYoYZejWKwPXaFywdgaHmUMFPuSPh6k1veRkwB1B", views: 879 },
//     { address: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1", views: 765 },
//     { address: "6PR9qrHtpVtYGdEKqyvFQdLTZs8xwbRRorUiHMEDpvTk", views: 654 },
//     { address: "8PR9qrHtpVtYGdEKqyvFQdLTZs8xwbRRorUiHMEDpvTl", views: 543 },
//     { address: "3FrmqYoYZejWKwPXaFywdgaHmUMFPuSPh6k1veRkwB1C", views: 432 },
//     { address: "1xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFim", views: 321 },
//     { address: "4Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j2", views: 210 },
//     { address: "0fUAJdStEuGbc3sM84cKRL6yYaaSstyLSV", views: 109 },
//   ])

//   return (
//     <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         <div className="md:col-span-2">
//           <Card className="h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)] flex flex-col bg-black border-gray-800">
//             <CardHeader>
//               <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-white">
//                 <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
//                 Leaderboard
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="flex-grow overflow-hidden">
//               <div className="h-full overflow-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="border-b border-gray-800">
//                       <TableHead className="w-16 sticky top-0 bg-black z-10 text-gray-400">Rank</TableHead>
//                       <TableHead className="sticky top-0 bg-black z-10 text-gray-400">SOL Address</TableHead>
//                       <TableHead className="text-right sticky top-0 bg-black z-10 text-gray-400">Views</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {leaderboard.map((item, index) => (
//                       <TableRow key={item.address} className="border-b border-gray-800">
//                         <TableCell className="font-medium text-gray-300">{index + 1}</TableCell>
//                         <TableCell className="font-mono text-xs sm:text-sm break-all text-gray-400">{item.address}</TableCell>
//                         <TableCell className="text-right text-gray-300">{item.views.toLocaleString()}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//         <div className="md:col-span-2 lg:col-span-1">
//           <Card className="bg-black text-white h-full border-gray-800">
//             <CardHeader>
//               <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
//                 <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
//                 Solana Stats
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <h3 className="text-lg font-semibold mb-1 text-gray-400">Total Views</h3>
//                 <p className="text-2xl sm:text-3xl font-bold text-white">5,923</p>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold mb-1 text-gray-400">Top Performer</h3>
//                 <p className="font-mono text-xs sm:text-sm mb-1 break-all text-gray-500">7fUAJdStEuGbc3sM84cKRL6yYaaSstyLSU</p>
//                 <Badge variant="secondary" className="bg-purple-900 text-purple-100 hover:bg-purple-800">
//                   1,024 views
//                 </Badge>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold mb-1 text-gray-400">Network Status</h3>
//                 <Badge variant="secondary" className="bg-green-900 text-green-100 hover:bg-green-800">
//                   Active
//                 </Badge>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }