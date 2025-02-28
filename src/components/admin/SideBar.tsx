"use client"

import { 
  Frame,
  LogOut,
  Sidebar,
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
import { useState } from "react";
import { Sidebar as SidebarIcon } from "lucide-react";

const SideBar = () => {

  const user:CurrentAccount 
    = useAppSelector( 
        store => store.auth.data)
  
    const currentURI = usePathname()
    const router = useRouter()
    const [
      toggleSidebar, 
      setToggleSidebar
    ] = useState(true);

  return <div 
    className={` ${toggleSidebar ? "w-64" : "w-16"} 
      min-h-screen border-r bg-background
       space-y-6 flex flex-col relative`}>
      <div className={`flex items-center gap-2 
        font-semibold capitalize text-xl 
        ${toggleSidebar 
          ? 'justify-start'
          : 'justify-center mx-auto'
        }`}>

        <Avatar>
          <AvatarImage src={user.account?.avatar} />
          <AvatarFallback className="flex items-center">
            <Frame size={20} />
          </AvatarFallback>
        </Avatar>

        <span
          className={`${!toggleSidebar && 'hidden'}`}
        >{toggleSidebar 
          && user.account?.username}</span>
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
            className={`w-full gap-2
              ${toggleSidebar 
                ? "justify-start"
                : "justify-center"
              } `}>
              {<item.icon/>} 
              {toggleSidebar && item.slug}
        </Button>
        }) }
      </nav>

      <div className="mt-auto flex items-center ">
        <Button variant="ghost"
           className={`w-full gap-2
            ${toggleSidebar 
              ? "justify-start"
              : "justify-center"
            }`}>
            <LogOut className="h-4 w-4" />
            <span className={`${!toggleSidebar && 'hidden'}`}
              >{toggleSidebar && "Logout"}</span>
        </Button>
      </div>

      <div 
        className={`toggle-icon absolute bottom-10 flex gap-5 
          text-sm items-center w-full cursor-pointer 
          ${toggleSidebar 
            ? "justify-start left-3"
            : "justify-center w-full mx-auto"
          }`}>
        <SidebarIcon 
          onClick={() => setToggleSidebar(prev => !prev)}
          size={18} /> 
        <span 
          className={`${!toggleSidebar && 'hidden'}`}
          >{toggleSidebar && "Toggle sidebar"}</span>
      </div>
      
</div>
}


export default SideBar;