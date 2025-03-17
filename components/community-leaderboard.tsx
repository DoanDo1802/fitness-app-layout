import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const leaderboardData = [
  { rank: 1, name: "Alex Johnson", points: 2450, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 2, name: "Sarah Williams", points: 2340, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 3, name: "Michael Chen", points: 2210, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 4, name: "Emma Davis", points: 2150, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 5, name: "James Wilson", points: 2080, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 42, name: "You", points: 1250, avatar: "/placeholder.svg?height=40&width=40", isUser: true },
]

export function CommunityLeaderboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>Top performers in the community</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboardData.map((user, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                user.isUser ? "bg-[#5E60CE]/10 border border-[#5E60CE]/20" : "hover:bg-muted/50"
              } ${index === 5 ? "mt-6" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-full ${
                    user.rank === 1
                      ? "bg-yellow-500/20 text-yellow-500"
                      : user.rank === 2
                        ? "bg-gray-300/20 text-gray-400"
                        : user.rank === 3
                          ? "bg-amber-600/20 text-amber-600"
                          : "bg-muted text-muted-foreground"
                  }`}
                >
                  {user.rank}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                </div>
              </div>
              <div className="font-semibold text-sm">
                {user.points} <span className="text-xs text-muted-foreground">pts</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

