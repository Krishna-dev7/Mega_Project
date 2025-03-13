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

const getColumns = () : ColumnDef<IOrder>[] => {

  const columns: ColumnDef<IOrder>[] = [
    {
      id: 'id',
      header: 'Order ID',
      accessorKey: '_id',
      cell: ({row}) => {
        return <span>
          {row.getValue('id')}
        </span>
      }
    },

    {
      id: 'username',
      header: 'Username',
      accessorKey: 'userId',
      cell: ({row}) => {

        const [user, setUser] = useState<UserSchema>()

        useEffect(() => {
          (async () => (
            await accountService
              .getUser(row.original.userId.toString())
          ))
        }, [setUser])

        return <span>
          {user?.username}
        </span>

      }
    },

    {
      id: 'status',
      accessorKey: 'status',
      header: 'Order status'
    },

    {
      id: 'Payment Id',
      accessorKey: 'paymentId',
      header: 'Payment Id'
    },

    {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => {
        const [trigger, setTrigger] = useState(false);
        const [deleteTrigger, setDeleteTrigger] =
          useState(false);

        const role = useAppSelector(store => 
          store.auth.data?.role)
  
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
  
              {/* <DropdownMenuItem className="cursor-pointer mb-1">
                <a
                  className="flex items-center gap-2 text-orange-400 "
                  href={row.original.invoice_url}
                  download={true}>
                  invoice <Download size={14} />
                </a>
              </DropdownMenuItem> */}
  
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
            {/* <Dialog
              open={trigger}
              onOpenChange={setTrigger}>
              <DialogContent>
                <DialogTitle className="text-orange-500 ">
                  Warning 🤚
                </DialogTitle>
                <DialogDescription>
                  Make sure because this step cannot be revert
                </DialogDescription>
                <DialogFooter>
                  <Button
                    size={"sm"}
                    className="text-xs"
                    onClick={async () => {
                      try {
                        await paymentService.createRefund(
                          row.original.paymentIntentId,
                        );
  
                        toast({
                          title: "success",
                          description: "amount refunded",
                        });
                      } catch (err: any) {
                        console.log(
                          "Columns error payment refund",
                          err.message,
                        );
                      }
                    }}>
                    Refund
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog> */}
  
            {/* super admin alert */}
  
            <Dialog
              open={deleteTrigger}
              onOpenChange={setDeleteTrigger}>
              <DialogContent>
                <DialogTitle className="text-orange-500 ">
                  Warning 🤚
                </DialogTitle>
                <DialogDescription>
                  Sensitive information once removed cannot be
                  revert
                </DialogDescription>
                <DialogFooter>
                  <Button
                    size={"sm"}
                    className="text-xs"
                    onClick={() =>{
                      console.log(row);
                      orderService.deleteOrder(row.getValue('id'))
                    }
                    }>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenu>
        );
      },
    }
  ]

  return columns;

}


export default getColumns;