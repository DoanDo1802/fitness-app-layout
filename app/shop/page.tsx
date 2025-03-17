import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Trophy, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const shopItems = [
  {
    id: 1,
    name: "Premium Workout Plan",
    description: "Personalized 12-week program",
    points: 500,
    image: "/placeholder.svg?height=200&width=200",
    category: "plans",
  },
  {
    id: 2,
    name: "Exclusive Profile Badge",
    description: "Show off your dedication",
    points: 300,
    image: "/placeholder.svg?height=200&width=200",
    category: "badges",
  },
  {
    id: 3,
    name: "Nutrition Guide",
    description: "Meal plans and recipes",
    points: 450,
    image: "/placeholder.svg?height=200&width=200",
    category: "plans",
  },
  {
    id: 4,
    name: "Virtual Personal Trainer",
    description: "1-hour video consultation",
    points: 800,
    image: "/placeholder.svg?height=200&width=200",
    category: "services",
  },
  {
    id: 5,
    name: "Elite Member Status",
    description: "Unlock premium features",
    points: 1000,
    image: "/placeholder.svg?height=200&width=200",
    category: "memberships",
  },
  {
    id: 6,
    name: "Custom Workout Playlist",
    description: "Curated by fitness experts",
    points: 250,
    image: "/placeholder.svg?height=200&width=200",
    category: "services",
  },
  {
    id: 7,
    name: "Recovery Guide",
    description: "Optimize your rest days",
    points: 350,
    image: "/placeholder.svg?height=200&width=200",
    category: "plans",
  },
  {
    id: 8,
    name: "Champion Badge",
    description: "Rare collectible badge",
    points: 600,
    image: "/placeholder.svg?height=200&width=200",
    category: "badges",
  },
]

export default function ShopPage() {
  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Rewards Shop</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#5E60CE]/10 text-[#5E60CE]">
            <Trophy className="h-4 w-4" />
            <span className="font-semibold">1,250 points</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search rewards..." className="pl-9" />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {shopItems.map((item) => (
              <Card key={item.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-square w-full bg-muted/50">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-between p-4 pt-0">
                  <div className="font-semibold text-[#5E60CE]">{item.points} points</div>
                  <Button size="sm" className="bg-[#F94C10] hover:bg-[#F94C10]/90">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Redeem
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {["plans", "badges", "services", "memberships"].map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {shopItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <Card key={item.id} className="overflow-hidden transition-all hover:shadow-md">
                    <div className="aspect-square w-full bg-muted/50">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                      <div className="font-semibold text-[#5E60CE]">{item.points} points</div>
                      <Button size="sm" className="bg-[#F94C10] hover:bg-[#F94C10]/90">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Redeem
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

