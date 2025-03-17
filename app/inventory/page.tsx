"use client"

import { useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, useGLTF, PresentationControls } from "@react-three/drei"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/button"
import { ShoppingBag, Package, Rotate3d, Trophy } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Sample inventory items
const inventoryItems = [
  {
    id: 1,
    name: "Premium Dumbbell",
    description: "High-quality steel dumbbell",
    category: "equipment",
    rarity: "rare",
    model: "/assets/3d/duck.glb", // Using the sample duck model for demonstration
    preview: "/placeholder.svg?height=80&width=80",
    acquired: "2 days ago",
  },
  {
    id: 2,
    name: "Champion Trophy",
    description: "Earned for completing the 30-day challenge",
    category: "trophies",
    rarity: "legendary",
    model: "/assets/3d/duck.glb", // Using the sample duck model for demonstration
    preview: "/placeholder.svg?height=80&width=80",
    acquired: "1 week ago",
  },
  {
    id: 3,
    name: "Yoga Mat",
    description: "Premium non-slip yoga mat",
    category: "equipment",
    rarity: "common",
    model: "/assets/3d/duck.glb", // Using the sample duck model for demonstration
    preview: "/placeholder.svg?height=80&width=80",
    acquired: "3 days ago",
  },
  {
    id: 4,
    name: "Fitness Badge",
    description: "Awarded for consistency",
    category: "badges",
    rarity: "uncommon",
    model: "/assets/3d/duck.glb", // Using the sample duck model for demonstration
    preview: "/placeholder.svg?height=80&width=80",
    acquired: "2 weeks ago",
  },
  {
    id: 5,
    name: "Protein Shaker",
    description: "BPA-free shaker bottle",
    category: "equipment",
    rarity: "common",
    model: "/assets/3d/duck.glb", // Using the sample duck model for demonstration
    preview: "/placeholder.svg?height=80&width=80",
    acquired: "5 days ago",
  },
  {
    id: 6,
    name: "Elite Medal",
    description: "For exceptional performance",
    category: "trophies",
    rarity: "epic",
    model: "/assets/3d/duck.glb", // Using the sample duck model for demonstration
    preview: "/placeholder.svg?height=80&width=80",
    acquired: "1 month ago",
  },
]

// 3D Model component
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={2} position={[0, -1, 0]} />
}

// Rarity colors
const rarityColors = {
  common: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  uncommon: "bg-green-500/10 text-green-500 border-green-500/20",
  rare: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  epic: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  legendary: "bg-amber-500/10 text-amber-500 border-amber-500/20",
}

export default function InventoryPage() {
  const [selectedItem, setSelectedItem] = useState(inventoryItems[0])
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredItems =
    activeCategory === "all" ? inventoryItems : inventoryItems.filter((item) => item.category === activeCategory)

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Inventory</h1>
          <p className="text-muted-foreground mt-1">View and showcase your collection</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <ShoppingBag className="mr-2 h-4 w-4" /> Shop More
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_350px]">
        {/* 3D Viewer */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedItem.name}</CardTitle>
                <CardDescription>{selectedItem.description}</CardDescription>
              </div>
              <Badge
                variant="outline"
                className={cn("ml-2", rarityColors[selectedItem.rarity as keyof typeof rarityColors])}
              >
                {selectedItem.rarity}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[500px] w-full bg-muted/30 relative">
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
                    <Model url={selectedItem.model} />
                  </PresentationControls>
                  <Environment preset="city" />
                </Suspense>
              </Canvas>
              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-md flex items-center gap-2">
                <Rotate3d className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Drag to rotate</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory */}
        <Card>
          <CardHeader>
            <CardTitle>My Items</CardTitle>
            <CardDescription>{filteredItems.length} items in your inventory</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" onValueChange={setActiveCategory}>
              <div className="px-6">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="equipment">Equipment</TabsTrigger>
                  <TabsTrigger value="trophies">Trophies</TabsTrigger>
                  <TabsTrigger value="badges">Badges</TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="h-[400px] px-6 pb-6">
                <div className="space-y-2">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors",
                        selectedItem.id === item.id
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-muted/50 border border-transparent",
                      )}
                    >
                      <div className="h-16 w-16 rounded-md bg-muted/50 flex items-center justify-center overflow-hidden">
                        <img
                          src={item.preview || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{item.name}</p>
                          <Badge
                            variant="outline"
                            className={cn("ml-2 text-xs", rarityColors[item.rarity as keyof typeof rarityColors])}
                          >
                            {item.rarity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Acquired: {item.acquired}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-[#5E60CE]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryItems.length}</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rarest Item</CardTitle>
            <Trophy className="h-4 w-4 text-[#5E60CE]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Legendary</div>
            <p className="text-xs text-muted-foreground">Champion Trophy</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Value</CardTitle>
            <ShoppingBag className="h-4 w-4 text-[#5E60CE]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,450</div>
            <p className="text-xs text-muted-foreground">Fitness points</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

