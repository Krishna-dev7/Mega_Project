"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from "@/components/ui/dialog";
import cartService from "@/services/CartService";
import {
  cartType,
  decQuantity,
  delCart,
  incQuantity,
  setCarts
} from "@/store/cartSlice";
import {
  useAppDispatch,
  useAppSelector
} from "@/store/store";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { ShoppingCart } from "lucide-react";
import { useEffect, useId, useState } from "react";
import DataTable from "../checkout/DataTable";
import Loading from "../Loading";
import Image from "next/image";


const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const key = useId();
  const carts 
    = useAppSelector(store => store.cart.carts);
  const [trigger, setTrigger] = useState(false)
  const [cartId, setCartId] = useState("");

  useEffect(() => {
    cartService.listCarts()
      .then(res => {
        // console.log("carts: ⚡",res.data.data);
        dispatch(setCarts(res.data.data))
      })
      .catch(err => {
        console.log("carts fetch error: ",
          err.message);
      })
  }, [dispatch])

  const incItem = async (cartId:string, 
    quantity:number) => {
    try {
      const res = await cartService.updateCart({
        cartId, quantity
      });
      // console.log("CartItem:incItem ⚡", res);
      (res && res.success) 
        && dispatch(incQuantity(res.data._id));
    } catch (err:any) {
      console.log("CartItem:incItem 🔥", err.message)
    }
  }


  const decItem = async (
    cartId: string, 
    quantity: number
  ) => {
    try {
      if(quantity <= 0) {
        setTrigger(true)
        setCartId(cartId)
        return;
      }
      const result = await cartService.updateCart({
        cartId, quantity
      })
      console.log("CartItem:decItem ⚡", result);
      dispatch(decQuantity({id: cartId}));
    } catch (err:any) {
      console.log("CartItem:decItem 🔥", err.message)
    }
  }


  const columns:ColumnDef<cartType>[] = [
    {
      id: 'select',
      header: ({table}) => {
        return <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) =>
             table.toggleAllPageRowsSelected(!!value)}
          aria-label="Sellect all"
        />
      },
      cell: ({row}) => {
        return <Checkbox 
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value) }
          aria-label="Select row"
        />
      }
    }, 

    {
      id: 'products',
      header: 'Products',
      cell: ({row}) => {
        return <div className="flex items-center">
          <Image 
            className="w-16 h-16 aspect-square rounded-sm mr-4"
            src={row.original.product?.images[0]} 
            alt="image"/>

          <div className="w-full">
            <h3 className="text-sm font-normal text-pretty text-ellipsis">
              {row.original.product?.slug}</h3>
            <p className="text-sm">
              <span className="text-gray-400">size: </span> 
              {row.original.productSize[0]}</p>
          </div>
        </div>
      }
    }, 

    {
      id: 'quantity',
      header: 'Quantity',
      accessorKey: 'quantity',
      cell: ({row}) => {
        return <div 
          className=" py-1 w-full
          flex items-center rounded-md ">
            <button 
              onClick={() => {
                row.original?._id   
                && decItem(row.original._id.toString(), 
                    row.original.quantity-1)
              }
              }
              className="btn btn-sm bg-gray-dark border
             border-gray-600 px-2 rounded-sm btn-sm ">-</button>

            <span className="mx-2 text-white">
              {row.original.quantity}</span>

            <button 
              onClick={() => row.original?._id 
                && incItem(row.original._id.toString(), 
                    row.original.quantity+1) 
              }
              className="btn btn-sm border 
            border-gray-600 px-2 rounded-sm">+</button>
        </div>
      }
    }

    
  ]

  return !carts ? <div className="loading w-full 
    min-h-screen flex bg-[#121212] items-center">
      <Loading />
    </div> 
    : <div 
    className="cart-page min-h-screen w-full h-fit flex
    justify-center items-center">

      <Card 
        className="streaming-cart-card sm:w-3xl my-32 text-sm md:w-3/4 
        lg:w-2/3 xl:w-1/2 w-[100%] text-violet-100">
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex 
            items-center text-pretty text-violet-300">
              Your Cart 
              <ShoppingCart 
                className="inline ml-2 font-bold"
                size={15}/> 
          </CardTitle>
        </CardHeader>

        <CardContent >
          <DataTable<cartType, any> 
            key={key}
            columns={columns}
            message="Your cart is empty"
            data={carts} 
          />

          <Dialog 
            open={trigger} 
            onOpenChange={setTrigger}>
            <DialogContent>
              <DialogHeader>  
                <DialogTitle 
                  className="text-orange-500 text-sm">
                  Are you sure?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. 
                  This will permanently delete your cart.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter >
                <Button
                  size={"sm"}
                  className="text-sm text-pretty text-violet-900"
                  onClick={async() => {
                    const res = await cartService
                      .deleteCart(cartId)

                    res && dispatch(delCart({id:cartId}))
                    setCartId('')
                    setTrigger(false)
                  }}>
                  Sure 
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

  </div>
}


export default Cart;