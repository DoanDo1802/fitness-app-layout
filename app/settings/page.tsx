"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, User, Shield, Moon, Sun, Palette, ChevronRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type SettingsSection = "profile" | "notifications" | "appearance" | "privacy"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile")

  const navigationItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
  ]

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <div className="flex flex-col space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {/* Mobile Tabs */}
      <Tabs defaultValue="profile" className="md:hidden w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSection />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsSection />
        </TabsContent>

        <TabsContent value="appearance">
          <AppearanceSection />
        </TabsContent>

        <TabsContent value="privacy">
          <PrivacySection />
        </TabsContent>
      </Tabs>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-[280px_1fr] gap-8">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="flex flex-col">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as SettingsSection)}
                    className={cn(
                      "flex items-center justify-between px-6 py-3.5 border-l-2 transition-all",
                      isActive
                        ? "border-l-primary bg-primary/5 text-primary font-medium"
                        : "border-l-transparent hover:border-l-border hover:bg-muted/50 text-foreground",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="h-4 w-4" />}
                  </button>
                )
              })}
            </nav>
          </CardContent>
        </Card>

        <div>
          {activeSection === "profile" && (
            <SettingsContainer title="Profile" description="Manage your profile information and preferences">
              <ProfileSection />
            </SettingsContainer>
          )}

          {activeSection === "notifications" && (
            <SettingsContainer title="Notifications" description="Configure how you receive notifications">
              <NotificationsSection />
            </SettingsContainer>
          )}

          {activeSection === "appearance" && (
            <SettingsContainer title="Appearance" description="Customize how the app looks and feels">
              <AppearanceSection />
            </SettingsContainer>
          )}

          {activeSection === "privacy" && (
            <SettingsContainer
              title="Privacy & Security"
              description="Manage your privacy settings and account security"
            >
              <PrivacySection />
            </SettingsContainer>
          )}
        </div>
      </div>
    </div>
  )
}

function SettingsContainer({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

function ProfileSection() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        <div className="flex flex-col items-center space-y-2">
          <Avatar className="h-24 w-24 border-4 border-background shadow-md">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" className="mt-2">
            Change Avatar
          </Button>
        </div>

        <div className="space-y-6 flex-1">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input id="displayName" defaultValue="JohnDoe" />
            <p className="text-xs text-muted-foreground">
              This is how your name will appear in the app and to other users
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" placeholder="Tell us about yourself" className="min-h-[120px]" />
        <p className="text-xs text-muted-foreground">Brief description for your profile. URLs are hyperlinked.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="john.doe@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-[#5E60CE] hover:bg-[#5E60CE]/90">Save Changes</Button>
      </div>
    </div>
  )
}

function NotificationsSection() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1 space-y-1">
            <Label className="text-base">Workout Reminders</Label>
            <p className="text-sm text-muted-foreground">Receive reminders about your scheduled workouts</p>
          </div>
          <Switch defaultChecked />
        </div>

        <Separator />

        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1 space-y-1">
            <Label className="text-base">Community Updates</Label>
            <p className="text-sm text-muted-foreground">Get notified about new challenges and community events</p>
          </div>
          <Switch defaultChecked />
        </div>

        <Separator />

        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1 space-y-1">
            <Label className="text-base">Achievement Alerts</Label>
            <p className="text-sm text-muted-foreground">Be notified when you earn badges or achievements</p>
          </div>
          <Switch defaultChecked />
        </div>

        <Separator />

        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1 space-y-1">
            <Label className="text-base">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
          </div>
          <Switch />
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-[#5E60CE] hover:bg-[#5E60CE]/90">Save Preferences</Button>
      </div>
    </div>
  )
}

function AppearanceSection() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1 space-y-1">
            <Label className="text-base">Dark Mode</Label>
            <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-muted-foreground" />
            <Switch defaultChecked />
            <Moon className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1 space-y-1">
            <Label className="text-base">Compact View</Label>
            <p className="text-sm text-muted-foreground">Show more content with less spacing</p>
          </div>
          <Switch />
        </div>

        <Separator />

        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1 space-y-1">
            <Label className="text-base">Animations</Label>
            <p className="text-sm text-muted-foreground">Enable smooth transitions and animations</p>
          </div>
          <Switch defaultChecked />
        </div>

        <Separator />

        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1 space-y-1">
            <Label className="text-base">Accent Color</Label>
            <p className="text-sm text-muted-foreground">Choose your preferred accent color</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-[#5E60CE] cursor-pointer ring-2 ring-offset-2 ring-[#5E60CE]"></div>
            <div className="h-5 w-5 rounded-full bg-[#F94C10] cursor-pointer"></div>
            <div className="h-5 w-5 rounded-full bg-[#38B000] cursor-pointer"></div>
            <div className="h-5 w-5 rounded-full bg-[#0077B6] cursor-pointer"></div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-[#5E60CE] hover:bg-[#5E60CE]/90">Save Preferences</Button>
      </div>
    </div>
  )
}

function PrivacySection() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1 space-y-1">
            <Label className="text-base">Public Profile</Label>
            <p className="text-sm text-muted-foreground">Allow others to see your profile and progress</p>
          </div>
          <Switch defaultChecked />
        </div>

        <Separator />

        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1 space-y-1">
            <Label className="text-base">Share Workout Activity</Label>
            <p className="text-sm text-muted-foreground">Automatically share your completed workouts</p>
          </div>
          <Switch />
        </div>

        <Separator />

        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1 space-y-1">
            <Label className="text-base">Two-Factor Authentication</Label>
            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
          </div>
          <Button variant="outline" size="sm">
            Enable
          </Button>
        </div>

        <Separator />

        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1 space-y-1">
            <Label className="text-base">Data Privacy</Label>
            <p className="text-sm text-muted-foreground">Control how your data is used and shared</p>
          </div>
          <Button variant="outline" size="sm">
            Manage
          </Button>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-destructive/20">
        <div className="space-y-2">
          <h3 className="text-base font-medium text-destructive">Danger Zone</h3>
          <p className="text-sm text-muted-foreground">
            Once you delete your account, there is no going back. Please be certain.
          </p>
        </div>
        <Button variant="destructive" size="sm" className="mt-4">
          Delete Account
        </Button>
      </div>
    </div>
  )
}

