"use client";
import Profile from "@/components/customUI/headersUi/Profile";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import {
  useAppSelector
} from "@/store/store";
import { User } from "lucide-react";

const UserSheet: React.FC = () => {
	const auth = useAppSelector((store) => store.auth);

	return (
		<Sheet>
			<SheetTrigger>
				<span className="text-gray-700 
          hover:text-gray-900 transition-colors">
					<User className="w-4 h-4" />
				</span>
			</SheetTrigger>
			<SheetContent className="h-full text-xs 
        flex flex-col justify-between">
				<SheetTitle>
					{" "}
					Hello {auth.authStatus
						? auth.username
						: "Panda"}{" "}
					🖖{" "}
				</SheetTitle>
				<SheetHeader className="text-xs -mt-1 
          text-start text-gray-400 ">
					Your Detail
				</SheetHeader>

				<Profile />

				<SheetFooter className=" sm:text-smtext-pretty text-fuchsia-400">
					<p className="mx-auto">
						&copy;&nbsp;Built with love 
						by Krishna & Suraj
						❤️
					</p>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default UserSheet;
