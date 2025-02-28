'use client'
import SideBar from "@/components/admin/SideBar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserSchema } from "@/models/user.models";
import { IUserProfile } from "@/models/userProfile.models";
import { ColumnDef } from "@tanstack/react-table";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogTitle, 
  AlertDialogTrigger } from "@/components/ui/alert-dialog";
import accountService from "@/services/AccountService";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

type users = {
  account: UserSchema,
  profile: IUserProfile
}

export const columns: ColumnDef<users>[] = [
  {
    id: "select",
    accessorKey: "account._id",
    header: ({table}) => {
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
         (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => 
          table.toggleAllPageRowsSelected(!!value)}

        aria-label="Select all"
      />
    },
    cell:({row}) => {
      <Checkbox 
        checked={row.getIsSelected()}
        onCheckedChange={ (value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    }
  },
  {
    id: "Name",
    accessorKey: "account.username",
    header: "Name",
    cell: ({row}) => {
      return <p className="username capitalize">
          {row.getValue('account.username')}
      </p>
    }
  },
  {
    id: "Status",
    accessorKey: "account.isVerified",
    header: "Status",
    cell: ({row}) => {
      return <div>
        { row.getValue("account.isVerified")
          ? "Verified"
          : "Not verified" }
      </div>
    }
  },
  {
    id: "Email",
    header: "Email",
    accessorKey: "account.email",
    cell:({row}) => {
      return <div className="email text-ellipsis">
        {row.getValue("account.email")}
      </div>
    }
  },
  { 
    id: "Actions",
    header: "Actions",
    cell: ({row}) => {
      return <div className="actions">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger>delete</AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogTitle 
                    className="text-orange-400">
                      warning
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    This action cannot be undone. 
                    This will permanently delete your account 
                    and remove your data from our servers.
                  </AlertDialogDescription>
                  <AlertDialogCancel>cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={ async () => {
                      if (row.original.account._id ) {
                        const result = await accountService.deleteAccount(
                          row.original.account._id.toString());

                        result 
                          ? toast({
                            variant: "default",
                            description: "account deleted"
                          })

                          : toast({
                            variant: "destructive",
                            description: "failed to delete account"
                          })
                      }   
                    }} />
                    Delete
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator
                .clipboard
                .writeText(row.original.account._id?.toString() ?? '')}
              >copy ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    }
  }
]

const ManageUser = () => {

  // useEffect(() => {
  //   const users = 
  // }, [])

  return <div 
    className="user-dashboard flex">
      <div className="sidebar">
        <SideBar />
      </div>

      <div 
        className="user-panel w-full min-h-screen
      bg-blue-400">
          
      </div>
  </div>
}



export default ManageUser;