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
import { Separator } from "../ui/separator";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

const SideBar = () => {

	const [trigger, setTrigger] = useState(false)

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
				<Avatar className="flex justify-center">
					<AvatarImage src={user?.avatar} />
					<AvatarFallback className="flex items-center">
						<Frame size={14} />
					</AvatarFallback>
				</Avatar>

				<span
					className={`${!toggleSidebar && "hidden"} 
						duration-500`}>
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
							className={`w-full text-xs flex duration-500
              ${
								toggleSidebar
									? "justify-start"
									: "justify-center"
							} `}>
							{<item.icon />}
							<span
								className={`opacity-0 transition-opacity duration-300
                  ease-in-out delay-100 
                  ${
                    toggleSidebar 
                      ? "opacity-100 indent-2 delay-0 duration-300"
                      : ""
                  }`}>
								{toggleSidebar && item.slug}
							</span>
						</Button>
					);
				})}
			</nav>

			<Separator />

			<div className="mt-auto flex items-center ">
				<Button
					variant="ghost"
					onClick={() => setTrigger(true)}
					className={`w-full gap-2
            ${
							toggleSidebar
								? "justify-start"
								: "justify-center"
						}`}>
					<LogOut className="h-4 w-4" />
					<span
						className={`opacity-0 transition-opacity 
              duration-500 text-xs indent-2 ease-in-out ${
							toggleSidebar ? "opacity-100 delay-0" : ""
						}`}>
						{toggleSidebar && "Logout"}
					</span>
				</Button>

				<Dialog open={trigger} onOpenChange={setTrigger}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Warning 🤚</DialogTitle>
						</DialogHeader>
						<DialogDescription>
							Make sure before logging out
						</DialogDescription>
						<DialogFooter>
							<Button
								size={"sm"}
								onClick={() => accountService.logout()}
								>
								Sure
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<div
				className={`toggle-icon absolute bottom-10 flex 
          text-sm items-center w-full cursor-pointer ease-in-out
          ${
						toggleSidebar
							? "justify-start left-3 delay-75 "
							: "justify-center w-full mx-auto"
					}`}>
				<SidebarIcon
					onClick={() => setToggleSidebar((prev) => !prev)}
					size={18}
				/>
				<span className={`${!toggleSidebar ?
           "opacity-0 transition-opacity duration-300"
          : "opacity-100 text-xs transition-opacity" +
					"ease-in-out delay-75 indent-5 duration-300"}`}>
					{toggleSidebar && "Toggle sidebar"}
				</span>
			</div>
		</div>
	);
}

export default SideBar;