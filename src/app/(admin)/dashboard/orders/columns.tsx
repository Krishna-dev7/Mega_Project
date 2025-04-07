import { IOrder } from "@/models/order.models";
import { UserSchema } from "@/models/user.models";
import accountService from "@/services/AccountService";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/store";
import orderService from "@/services/OrderService";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


const ActionCellComponent:React.FC<{row:any}> = ({row}) => {
	
	const [trigger, setTrigger] = useState(false);
	const [deleteTrigger, setDeleteTrigger] 
		= useState(false);

	const role = useAppSelector(
		(store) => store.auth.data?.role,
	);


	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="cursor-pointer"
				suppressHydrationWarning
				asChild>
				<MoreHorizontal size={15} />
			</DropdownMenuTrigger>

			<DropdownMenuContent className=" bg-black ">
				<DropdownMenuLabel className="w-36 mb-1">
					Actions
				</DropdownMenuLabel>

				<DropdownMenuSeparator className="font-bold bg-neutral-600" />

				<DropdownMenuItem
					className="cursor-pointer mb-1"
					onClick={() => setTrigger(true)}>
					Refund amount
				</DropdownMenuItem>

				<DropdownMenuItem className="cursor-pointer mb-1">
					<span onClick={() => setTrigger(true)}>
						view shipping detail
					</span>
				</DropdownMenuItem>

				<DropdownMenuItem
					className="cursor-pointer mb-1 capitalize"
					onClick={() =>
						navigator.clipboard.writeText(
							row.getValue("id"),
						)
					}>
					copy paymentID
				</DropdownMenuItem>

				{role == "admin" && (
					<DropdownMenuItem
						className="cursor-pointer mb-1 capitalize"
						onClick={() => setDeleteTrigger(true)}>
						Delete record
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>

			{/*  dialog box */}
			<Dialog
				open={trigger}
				onOpenChange={setTrigger}>
				<DialogContent>
					<DialogTitle className="text-orange-500 ">
						Shipping detail 🚚
					</DialogTitle>

					<Card className="border-none mt-5">
						<CardContent className="px-0 border-none text-neutral-300 space-y-4">
							<div className="grid border-none  grid-cols-2 gap-4">
								<div className="space-y-2 ">
									<Label htmlFor="firstName">
										Username 
									</Label>
									<Input
										value={row.original.userId.username}
										readOnly
										id="firstName"
										placeholder="John"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="lastName">
										Full name
									</Label>
									<Input
										value={row.original.userId.fullname}
										readOnly
										id="lastName"
										placeholder="Doe"
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="address">
									Address
								</Label>
								<Input
									value={(row.original as IOrder)?.shipping_details?.line1 }
									readOnly
									id="address"
									placeholder="123 Main St"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="city">City</Label>
									<Input
										value={(row.original as IOrder)?.shipping_details?.city}
										readOnly
										id="city"
										placeholder="San Francisco"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="state">State</Label>
									<Input
										value={(row.original as IOrder)?.shipping_details?.state}
										readOnly
										id="city"
										placeholder="San Francisco"
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="zip">
										Zip code
									</Label>
									<Input
										value={(row.original as IOrder)?.shipping_details?.postal_code}	
										id="zip"
										placeholder="94103"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="country">
										Country
									</Label>
									<Input
										value={(row.original as IOrder)?.shipping_details?.country}
										id="zip"
										placeholder="94103"
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
									<Label htmlFor="country">
										Shipping Cost
									</Label>
									<Input
										value={(row.original as IOrder)?.shipping_details?.shipping_cost || 40}
										id="cost"
										placeholder="40"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="country">
										Estimated date
									</Label>
									<Input
										value={new Date(row.original.estimatedDate).toDateString()}
										id="date"
										placeholder="date"
									/>
								</div>
							</div>
							
						</CardContent>
					</Card>

					<DialogDescription className="text-xs">
						Shipping details
					</DialogDescription>
					<DialogFooter></DialogFooter>
				</DialogContent>
			</Dialog>

			{/* super admin alert */}

			<Dialog
				open={deleteTrigger}
				onOpenChange={setDeleteTrigger}>
				<DialogContent>
					<DialogTitle className="text-orange-500 ">
						Warning 🤚
					</DialogTitle>
					<DialogDescription>
						Sensitive information once removed cannot
						be revert
					</DialogDescription>
					<DialogFooter>
						<Button
							size={"sm"}
							className="text-xs"
							onClick={() => {
								console.log(row);
								orderService.deleteOrder(
									row.getValue("id"),
								);
							}}>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</DropdownMenu>
	);
}

const getColumns = () : ColumnDef<IOrder & {
  userId: UserSchema
}>[] => {


  const columns: ColumnDef<IOrder & {
    userId: UserSchema
  }>[] = [
    {
      id: 'id',
      header: 'Order ID',
      accessorKey: '_id',
      cell: ({row}) => {
        const id:string = row.getValue('id')
        return <span className="text-ellipsis line-clamp-1">
          Order-#{id.substring(id.length-1, id.length-8)}
        </span>
      }
    },

    {
      id: 'username',
      header: 'Username',
      accessorKey: 'userId.username',
      cell: ({row}) => {

        // const [user, setUser] = useState<UserSchema>()

        // useEffect(() => {
        //   (async () => (
        //     await accountService
        //       .getUser(row.original.userId._id.toString())
        //   ))
        // }, [setUser])

        return <span>
          {row.original.userId?.username}
        </span>

      }
    },

    {
      id: 'status',
      accessorKey: 'status',
      header: 'Order status',
      filterFn: (row, columnId, value) => {
        if(value == "all") return true

        const cellValue = row.original.status;
        return cellValue.includes(value)
      },
      cell: ({row}) => (
        <span className="capitalize">
          {row.getValue('status')}
        </span>
      )
    },

    {
      id: 'Payment Id',
      accessorKey: 'paymentId',
      header: 'Payment Id',
      cell: ({row}) => {
        const id:string = row.getValue('Payment Id')
        return <span>
          PayId-#{id.substring(15, id.length-1)}
        </span>
      }
    },

    {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => <ActionCellComponent row={row} />,
    }
  ]

  return columns;

}


export default getColumns;