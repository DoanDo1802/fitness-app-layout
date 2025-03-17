import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dumbbell, Clock, Calendar } from "lucide-react"
import { WorkoutPlan } from "@/components/workout-plan"

export default function WorkoutPage() {
  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Workout Plan</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Dumbbell className="mr-2 h-4 w-4" /> Start Today's Workout
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <Calendar className="h-4 w-4 text-[#5E60CE]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Upper Body</div>
            <p className="text-xs text-muted-foreground">45 minutes • 5 exercises</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tomorrow</CardTitle>
            <Calendar className="h-4 w-4 text-[#5E60CE]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Lower Body</div>
            <p className="text-xs text-muted-foreground">50 minutes • 6 exercises</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-[#5E60CE]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/5 Days</div>
            <p className="text-xs text-muted-foreground">2 more workouts to complete this week</p>
          </CardContent>
        </Card>
      </div>

      <WorkoutPlan />
    </div>
  )
}

