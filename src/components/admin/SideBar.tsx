"use client"

import { 
  Frame,
  LogOut,
 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/store";
import { CurrentAccount } from "@/services/AccountService";
import { Avatar } from "../ui/avatar";
import { 
  AvatarFallback, 
  AvatarImage } from "@radix-ui/react-avatar";
import adminNavItems from "@/helpers/adminConfig";
import { usePathname, useRouter } from "next/navigation";


const SideBar = () => {

  const user:CurrentAccount 
    = useAppSelector( 
        store => store.auth.data)
  
    const currentURI = usePathname()
    const router = useRouter()

  return <div 
    className="w-64 min-h-screen border-r bg-background
    p-6 space-y-6 flex flex-col">
      <div className="flex items-center gap-2 font-semibold
        capitalize text-xl">

        <Avatar>
          <AvatarImage src={user.account?.avatar} />
          <AvatarFallback className="flex items-center">
            <Frame size={20} />
          </AvatarFallback>
        </Avatar>

        <span>{user.account?.username}</span>
      </div>

      <nav className="space-y-2">
        { adminNavItems.map( (item, index) => {
          return <Button 
          key={index}
          onClick={() => router.push(item.url)}
          variant={
            currentURI == item.url
            ? "default"
            : "ghost"
          }
          className="w-full justify-start gap-2">
            {<item.icon/>} 
            {item.slug}
        </Button>
        }) }
      </nav>

      <div className="mt-auto">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>
</div>
}


export default SideBar;