import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { UserSchema } from "@/models/user.models";
import accountService from "@/services/AccountService";
import { ColumnDef } from "@tanstack/react-table";

// column definition
const columns: ColumnDef<UserSchema>[] = [
	{
		id: "select",
		accessorKey: "_id",
		header: ({ table }) => {
			return (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() &&
							"indeterminate")
					}
					onCheckedChange={(value) =>
						table.toggleAllPageRowsSelected(!!value)
					}
					aria-label="Select all"
				/>
			);
		},
		cell: ({ row }) => {
			return (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) =>
						row.toggleSelected(!!value)
					}
					aria-label="Select row"
				/>
			);
		},
	},

	{
		id: "avatar",
		header: "Avatar",
		cell: ({ row }) => {
			return (
				<Avatar>
					<AvatarImage
						className="object-cover object-center "
						src={
							row.getValue("avatar") ||
							"https://i.pinimg.com/736x/64/bf/60/64bf60f08e226ae662e83a459a28a9bf.jpg"
						}
					/>
					<AvatarFallback>🔥</AvatarFallback>
				</Avatar>
			);
		},
	},

	{
		id: "Name",
		accessorKey: "username",
		header: "Name",
		cell: ({ row }) => {
			return (
				<p className="username text-white capitalize">
					{row.getValue("Name")}
				</p>
			);
		},
	},

	{
		id: "role",
		accessorKey: "role",
		header: "Role",
		cell: ({ row }) => {
			return (
				<Button
					size={"sm"}
					variant={
						row.getValue("role") === "seller"
							? "default"
							: "secondary"
					}
					className={`${
						row.getValue("role") == "seller"
							? "bg-violet-300 hover:bg-violet-300"
							: ""
					}`}>
					{row.getValue("role")}
				</Button>
			);
		},
	},

	{
		id: "Status",
		accessorKey: "isVerified",
		header: "Status",
		cell: ({ row }) => {
			return (
				<div>
					<span
						className={` text-sm lowercase ${
							row.getValue("Status")
								? "text-green-400 "
								: "text-red-300 "
						}`}>
						{row.getValue("Status")
							? "Verified"
							: "Not verified"}
					</span>
				</div>
			);
		},
		enableColumnFilter: true,
		filterFn: (row, columnId, filterValue) => {
			if(filterValue === "all") return true

			const value = row.getValue(columnId)
				? "verified"
				: "not verified"

			return value.includes(filterValue)
		}
			
			
	},
	{
		id: "Email",
		header: "Email",
		accessorKey: "email",
		cell: ({ row }) => {
			return (
				<div className="email text-ellipsis">
					{row.getValue("Email")}
				</div>
			);
		},
	},
	{
		id: "Actions",
		header: "Actions",
		cell: ({ row }) => {
			return (
				<div className="actions">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<MoreHorizontal />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem>
								<AlertDialog>
									<AlertDialogTrigger>
										delete
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogTitle className="text-orange-400">
											warning
										</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone. This
											will permanently delete your account
											and remove your data from our servers.
										</AlertDialogDescription>
										<AlertDialogCancel>
											cancel
										</AlertDialogCancel>
										<AlertDialogAction
											onClick={async () => {
												if (row.original._id) {
													const result =
														await accountService.deleteAccount(
															row.original._id.toString(),
														);

													result
														? toast({
																variant: "default",
																description:
																	"account deleted",
															})
														: toast({
																variant: "destructive",
																description:
																	"failed to delete account",
														});
												}
											}}
										/>
										Delete
									</AlertDialogContent>
								</AlertDialog>
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() =>
									navigator.clipboard.writeText(
										row.original._id?.toString() ?? "",
									)
								}>
								copy ID
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];

export default columns;