"use client"

import { Button } from "@/components/ui/button";
import adminNavItems from "@/helpers/adminConfig";
import { UserSchema } from "@/models/user.models";
import accountService from "@/services/AccountService";
import { useAppSelector } from "@/store/store";
import {
	AvatarFallback,
	AvatarImage,
} from "@radix-ui/react-avatar";
import {
	Frame,
	LogOut,
	Sidebar as SidebarIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar } from "../ui/avatar";

const SideBar = () => {

  const user:(UserSchema | null)
    = useAppSelector( 
        store => store.auth.data)
  
    const currentURI = usePathname()
    const router = useRouter()
    const [
      toggleSidebar, 
      setToggleSidebar
    ] = useState(true);

  return (
		<div
			className={` ${toggleSidebar ? "w-64" : "w-16"} 
      min-h-screen border-r bg-background
       space-y-6 flex flex-col relative duration-500 ease-in-out
       transition-all`}>
			<div
				className={`flex items-center gap-2 
        font-semibold capitalize text-xl 
        ${
					toggleSidebar
						? "justify-start"
						: "justify-center mx-auto"
				}`}>
				<Avatar>
					<AvatarImage src={user?.avatar} />
					<AvatarFallback className="flex items-center">
						<Frame size={20} />
					</AvatarFallback>
				</Avatar>

				<span
					className={`${!toggleSidebar && "hidden"} duration-1000`}>
					{toggleSidebar && user?.username}
				</span>
			</div>

			<nav className="space-y-2">
				{adminNavItems.map((item, index) => {
					return (
						<Button
							key={index}
							onClick={() => router.push(item.url)}
							variant={
								currentURI == item.url ? "default" : "ghost"
							}
							className={`w-full gap-2 duration-500
              ${
								toggleSidebar
									? "justify-start"
									: "justify-center"
							} `}>
							{<item.icon />}
							<span
								className={`opacity-0 transition-opacity duration-500 
                  ease-in-out delay-100 
                  ${
                    toggleSidebar 
                      ? "opacity-100 delay-0 duration-500"
                      : ""
                  }`}>
								{toggleSidebar && item.slug}
							</span>
						</Button>
					);
				})}
			</nav>

			<div className="mt-auto flex items-center ">
				<Button
					variant="ghost"
					onClick={() => accountService.logout()}
					className={`w-full gap-2
            ${
							toggleSidebar
								? "justify-start"
								: "justify-center"
						}`}>
					<LogOut className="h-4 w-4" />
					<span
						className={`opacity-0 transition-opacity 
              duration-500 ease-in-out ${
							toggleSidebar ? "opacity-100 delay-0" : ""
						}`}>
						{toggleSidebar && "Logout"}
					</span>
				</Button>
			</div>

			<div
				className={`toggle-icon absolute bottom-10 flex gap-5 
          text-sm items-center w-full cursor-pointer 
          ${
						toggleSidebar
							? "justify-start left-3"
							: "justify-center w-full mx-auto"
					}`}>
				<SidebarIcon
					onClick={() => setToggleSidebar((prev) => !prev)}
					size={18}
				/>
				<span className={`${!toggleSidebar ?
           "opacity-0 transition-opacity duration-300"
          : "opacity-100 transition-opacity delay-75 duration-300"}`}>
					{toggleSidebar && "Toggle sidebar"}
				</span>
			</div>
		</div>
	);
}

export default SideBar;