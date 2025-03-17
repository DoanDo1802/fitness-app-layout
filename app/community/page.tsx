import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Medal, Flame } from "lucide-react"
import { CommunityLeaderboard } from "@/components/community-leaderboard"
import { CommunityPosts } from "@/components/community-posts"

export default function CommunityPage() {
  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Community</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Users className="mr-2 h-4 w-4" /> Join Challenge
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border border-primary/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Challenge</CardTitle>
            <Flame className="h-4 w-4 text-[#5E60CE]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30-Day Consistency</div>
            <p className="text-xs text-muted-foreground">Day 7 of 30 • 1,245 participants</p>
            <div className="mt-3 w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-[#5E60CE] rounded-full" style={{ width: "23%" }}></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
            <Trophy className="h-4 w-4 text-[#5E60CE]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#42</div>
            <p className="text-xs text-muted-foreground">Top 5% • Improved 12 positions this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Medal className="h-4 w-4 text-[#5E60CE]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 Badges</div>
            <p className="text-xs text-muted-foreground">Earned "Early Riser" badge yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <CommunityLeaderboard />
        <CommunityPosts />
      </div>
    </div>
  )
}

