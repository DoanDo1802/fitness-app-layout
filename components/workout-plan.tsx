"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/button"
import { CheckCircle2, Circle, Dumbbell } from "lucide-react"

const workoutDays = [
  {
    day: "Monday",
    focus: "Upper Body",
    completed: true,
    exercises: [
      { name: "Bench Press", sets: 3, reps: 10, completed: true },
      { name: "Pull-ups", sets: 3, reps: 8, completed: true },
      { name: "Shoulder Press", sets: 3, reps: 12, completed: true },
      { name: "Bicep Curls", sets: 3, reps: 15, completed: true },
      { name: "Tricep Extensions", sets: 3, reps: 15, completed: true },
    ],
  },
  {
    day: "Tuesday",
    focus: "Rest Day",
    completed: true,
    exercises: [],
  },
  {
    day: "Wednesday",
    focus: "Lower Body",
    completed: true,
    exercises: [
      { name: "Squats", sets: 4, reps: 10, completed: true },
      { name: "Deadlifts", sets: 3, reps: 8, completed: true },
      { name: "Lunges", sets: 3, reps: 12, completed: true },
      { name: "Calf Raises", sets: 3, reps: 15, completed: true },
      { name: "Leg Extensions", sets: 3, reps: 15, completed: true },
      { name: "Hamstring Curls", sets: 3, reps: 15, completed: true },
    ],
  },
  {
    day: "Thursday",
    focus: "Upper Body",
    completed: false,
    exercises: [
      { name: "Incline Bench Press", sets: 3, reps: 10, completed: false },
      { name: "Rows", sets: 3, reps: 12, completed: false },
      { name: "Lateral Raises", sets: 3, reps: 15, completed: false },
      { name: "Face Pulls", sets: 3, reps: 15, completed: false },
      { name: "Skull Crushers", sets: 3, reps: 12, completed: false },
    ],
  },
  {
    day: "Friday",
    focus: "Rest Day",
    completed: false,
    exercises: [],
  },
  {
    day: "Saturday",
    focus: "Lower Body",
    completed: false,
    exercises: [
      { name: "Front Squats", sets: 3, reps: 10, completed: false },
      { name: "Romanian Deadlifts", sets: 3, reps: 10, completed: false },
      { name: "Walking Lunges", sets: 3, reps: 10, completed: false },
      { name: "Leg Press", sets: 3, reps: 12, completed: false },
      { name: "Standing Calf Raises", sets: 4, reps: 15, completed: false },
    ],
  },
  {
    day: "Sunday",
    focus: "Rest Day",
    completed: false,
    exercises: [],
  },
]

export function WorkoutPlan() {
  const [activeDay, setActiveDay] = useState("Thursday")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Plan</CardTitle>
        <CardDescription>Your personalized workout schedule for this week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="hidden md:block">
          <div className="grid grid-cols-7 gap-4 mb-6">
            {workoutDays.map((day) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                className={`relative p-3 rounded-md text-center transition-colors ${
                  activeDay === day.day
                    ? "bg-primary/10 text-primary"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                <div className="font-medium">{day.day.substring(0, 3)}</div>
                <div className="text-xs mt-1">{day.focus}</div>
                {day.completed && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                )}
              </button>
            ))}
          </div>

          {workoutDays.map(
            (day) =>
              day.day === activeDay && (
                <div key={day.day}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {day.day}: {day.focus}
                      </h3>
                      {day.exercises.length > 0 ? (
                        <p className="text-sm text-muted-foreground">{day.exercises.length} exercises</p>
                      ) : (
                        <p className="text-sm text-muted-foreground">Take a well-deserved break today</p>
                      )}
                    </div>
                    {day.exercises.length > 0 && (
                      <Badge
                        variant={day.completed ? "outline" : "default"}
                        className={
                          day.completed
                            ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20"
                            : "bg-[#5E60CE]"
                        }
                      >
                        {day.completed ? "Completed" : "Today's Workout"}
                      </Badge>
                    )}
                  </div>

                  {day.exercises.length > 0 && (
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {day.exercises.map((exercise, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {exercise.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground" />
                            )}
                            <div>
                              <p
                                className={`font-medium ${exercise.completed ? "line-through text-muted-foreground" : ""}`}
                              >
                                {exercise.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {exercise.sets} sets × {exercise.reps} reps
                              </p>
                            </div>
                          </div>
                          <Dumbbell className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ),
          )}
        </div>

        <Tabs defaultValue={activeDay} onValueChange={setActiveDay} className="md:hidden w-full">
          <TabsList className="grid w-full grid-cols-7 mb-4">
            {workoutDays.map((day) => (
              <TabsTrigger key={day.day} value={day.day} className="relative">
                <span className="hidden sm:inline">{day.day.substring(0, 3)}</span>
                <span className="sm:hidden">{day.day.substring(0, 1)}</span>
                {day.completed && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {workoutDays.map((day) => (
            <TabsContent key={day.day} value={day.day}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-lg font-semibold">
                    {day.day}: {day.focus}
                  </h3>
                  {day.exercises.length > 0 ? (
                    <p className="text-sm text-muted-foreground">{day.exercises.length} exercises</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Take a well-deserved break today</p>
                  )}
                </div>
                {day.exercises.length > 0 && (
                  <Badge
                    variant={day.completed ? "outline" : "default"}
                    className={
                      day.completed
                        ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20"
                        : "bg-[#5E60CE]"
                    }
                  >
                    {day.completed ? "Completed" : "Today's Workout"}
                  </Badge>
                )}
              </div>

              {day.exercises.length > 0 && (
                <div className="space-y-3">
                  {day.exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {exercise.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div>
                          <p
                            className={`font-medium ${exercise.completed ? "line-through text-muted-foreground" : ""}`}
                          >
                            {exercise.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {exercise.sets} sets × {exercise.reps} reps
                          </p>
                        </div>
                      </div>
                      <Dumbbell className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

