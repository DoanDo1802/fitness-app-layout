"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, MessageSquare, ThumbsUp, ThumbsDown, Sparkles } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { PresentationControls, useGLTF, Environment, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"

// 3D Model component
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive object={scene} scale={2} position={[0, -1, 0]} />
    </Float>
  )
}

// AI Assistant messages
const assistantMessages = [
  "Great job on your workouts this week! I've noticed you've been consistent with your upper body routine. Would you like me to suggest some complementary lower body exercises for tomorrow?",
  "I see you've been making progress with your bench press. Your form is improving! Would you like some tips to increase your max weight?",
  "You've completed 3 workouts this week. Just 2 more to reach your weekly goal! I can help you schedule the remaining sessions.",
  "Your sleep data shows you're averaging 6.5 hours per night. For optimal recovery, I recommend aiming for 7-8 hours. Would you like some sleep improvement tips?",
]

export function AiAssistant() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleNextMessage = () => {
    setCurrentMessage((prev) => (prev + 1) % assistantMessages.length)
    setShowFeedback(false)
  }

  const handleFeedback = (positive: boolean) => {
    setShowFeedback(true)
    // In a real app, you would send this feedback to your backend
  }

  return (
    <Card className="border border-primary/30 overflow-hidden h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-2 pb-2 border-b">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5E60CE]">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <CardTitle>AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col">
        <div className="h-[300px] bg-muted/30 relative">
          <Canvas>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <PresentationControls
                global
                zoom={0.8}
                rotation={[0, -Math.PI / 4, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
              >
                <Model url="/assets/3d/duck.glb" />
              </PresentationControls>
              <Environment preset="city" />
            </Suspense>
          </Canvas>
          <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm p-2 rounded-full">
            <Sparkles className="h-4 w-4 text-[#5E60CE]" />
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
            <p className="text-base">{assistantMessages[currentMessage]}</p>
          </div>

          {!showFeedback ? (
            <div className="mt-6 flex justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => handleFeedback(true)}
                >
                  <ThumbsUp className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => handleFeedback(false)}
                >
                  <ThumbsDown className="h-5 w-5" />
                </Button>
              </div>
              <Button variant="outline" className="gap-2" onClick={handleNextMessage}>
                <MessageSquare className="h-4 w-4" />
                Next Tip
              </Button>
            </div>
          ) : (
            <div className="mt-6 flex gap-2">
              <Button className="flex-1 bg-[#5E60CE] hover:bg-[#5E60CE]/90">Yes, please</Button>
              <Button className="flex-1" variant="outline">
                No, thanks
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

