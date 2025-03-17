import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2 } from "lucide-react"

const postsData = [
  {
    id: 1,
    user: {
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    time: "2 hours ago",
    content: "Just completed my first 5K run! So proud of my progress this month 🏃‍♀️",
    image: "/placeholder.svg?height=200&width=400",
    likes: 24,
    comments: 5,
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    time: "Yesterday",
    content: "New personal best on bench press today! 💪 Consistency is key.",
    likes: 42,
    comments: 8,
  },
]

export function CommunityPosts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Posts</CardTitle>
        <CardDescription>See what the community is sharing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {postsData.map((post) => (
            <div key={post.id} className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.user.avatar} alt={post.user.name} />
                  <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{post.user.name}</p>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              </div>

              <p className="text-sm">{post.content}</p>

              {post.image && (
                <div className="rounded-lg overflow-hidden">
                  <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full h-auto object-cover" />
                </div>
              )}

              <div className="flex items-center gap-4 pt-2">
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-[#5E60CE] transition-colors">
                  <Heart className="h-4 w-4" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-[#5E60CE] transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-[#5E60CE] transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>

              {post.id !== postsData.length && <hr className="border-t border-border my-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

