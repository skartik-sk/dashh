'use client'

import Image from "next/image"
import { Clock, Trophy } from "lucide-react"

interface Player {
  id: number
  name: string
  avatar: string
  pointsToEarn: number
  prize: number
}

const topPlayers: Player[] = [
  { id: 2, name: "Skulldugger", avatar: "/placeholder.svg?height=64&width=64", pointsToEarn: 500, prize: 5000 },
  { id: 1, name: "Klaxxon", avatar: "/placeholder.svg?height=80&width=80", pointsToEarn: 1500, prize: 10000 },
  { id: 3, name: "Ultralex", avatar: "/placeholder.svg?height=64&width=64", pointsToEarn: 250, prize: 2500 },
]
// worked on the leader board functionality
export function DynamicFullScreenLeaderboard() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col p-4 sm:p-6">
      <div className="flex-grow flex flex-col max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between mb-8 space-y-6 sm:space-y-0">
          {/* Top 3 Players */}
          {topPlayers.sort((a, b) => b.prize - a.prize).map((player, index) => (
            <div key={player.id} className="flex-1 text-center">
              <div className={`w-${index === 1 ? "'20'" : "'16'"} h-${index === 1 ? "'20'" : "'16'"} mx-auto mb-2 relative`}>
                <Image
                  src={player.avatar}
                  alt={player.name}
                  width={index === 1 ? 80 : 64}
                  height={index === 1 ? 80 : 64}
                  className="rounded-lg"
                />
              </div>
              <h3 className="font-bold">{player.name}</h3>
              <div className="text-gray-400 text-sm">Earn {player.pointsToEarn} points</div>
              <div className="text-blue-400 font-bold">{player.prize.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Prize</div>
            </div>
          ))}
        </div>

        {/* Countdown Timer */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            <span>Ends in</span>
          </div>
          <div className="text-xl font-bold">00d 00h 43m 51s</div>
        </div>

        {/* User Stats */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6 text-center">
          <span className="text-gray-400">You earned </span>
          <span className="text-blue-400 font-bold">50</span>
          <span className="text-gray-400"> today and are ranked - out of 13868 users</span>
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto flex-grow">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="text-left py-2">Place</th>
                <th className="text-left py-2">Username</th>
                <th className="text-right py-2">Points</th>
                <th className="text-right py-2">Prize</th>
              </tr>
            </thead>
            <tbody>
              {[4, 5, 6, 7, 8, 9, 10].map((place) => (
                <tr key={place} className="border-t border-gray-800">
                  <td className="py-2">
                    <Trophy className="w-4 h-4 text-gray-400 inline mr-2" />
                    {place}
                  </td>
                  <td>Protesian</td>
                  <td className="text-right">156</td>
                  <td className="text-right text-blue-400">750</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}