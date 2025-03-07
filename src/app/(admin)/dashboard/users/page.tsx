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
import { useEffect, useState } from "react";
import DataTable from "@/components/customUI/checkout/DataTable";
import { IProfile } from "@/models/profile.models";
import Loading from "@/components/customUI/Loading";

type users = IProfile & {
  owner: UserSchema
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
                      if (row.original._id ) {
                        const result = await accountService.deleteAccount(
                          row.original._id.toString());

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
                .writeText(row.original._id?.toString() ?? '')}
              >copy ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    }
  }
]

const ManageUser = () => {

  const [data, setData] = useState<(IProfile & {
    owner: UserSchema
  })[] | null>(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const result = await 
          accountService.streamUsers()
  
        result.success 
          && setData(result.data)   

        console.log(result)
      }

      fetchData()
    } catch (err:any) {
      toast({
        title: "error",
        description: err.message
      })
    }
  }, [setData] )

  if(!(data && data.length)) 
    return <div 
      className="loader flex 
      justify-center items-center min-h-screen">
        <Loading />
    </div> 

  return <div 
    className="user-dashboard mx-20 w-full flex">
      <div 
        className="user-panel w-full min-h-screen">
         {data.map( user => <div>{user.owner.username}</div>)}
      </div>
  </div>
}

export default ManageUser;