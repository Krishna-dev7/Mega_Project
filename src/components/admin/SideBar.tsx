"use client"

import { Frame,
  Home, 
  LineChart,

 } from "lucide-react";
import { Button } from "@/components/ui/button";


const SideBar = () => {

  return <div className="w-64 border-r bg-background p-6 space-y-6 flex flex-col">
  <div className="flex items-center gap-2 font-semibold text-xl">
    <Frame  className="h-6 w-6" />
    <span>Xenith</span>
  </div>

  <nav className="space-y-2">
    <Button variant="default" className="w-full justify-start gap-2">
      <Home className="h-4 w-4" />
      Home
    </Button>
    <Button variant="ghost" className="w-full justify-start gap-2">
      <LineChart className="h-4 w-4" />
      Analytics
    </Button>
    <Button variant="ghost" className="w-full justify-start gap-2">
      <Search className="h-4 w-4" />
      Explore
    </Button>
    <Button variant="ghost" className="w-full justify-start gap-2">
      <ShoppingCart className="h-4 w-4" />
      Shop
    </Button>
    <Button variant="ghost" className="w-full justify-start gap-2">
      <MessageSquare className="h-4 w-4" />
      Chat
    </Button>
  </nav>

  <div className="space-y-2">
    <div className="text-xs uppercase text-muted-foreground font-medium">Tools</div>
    <nav className="space-y-2">
      <Button variant="ghost" className="w-full justify-start gap-2">
        <Settings className="h-4 w-4" />
        Settings
      </Button>
      <Button variant="ghost" className="w-full justify-start gap-2">
        <Users className="h-4 w-4" />
        Manage Users
      </Button>
    </nav>
  </div>

  <div className="mt-auto">
    <Button variant="ghost" className="w-full justify-start gap-2">
      <LogOut className="h-4 w-4" />
      Log out
    </Button>
  </div>
</div>
}


export default SideBar;