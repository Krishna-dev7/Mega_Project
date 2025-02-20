"use client"
import { Card, 
  CardContent,
  CardHeader, 
  CardTitle } from "@/components/ui/card";
import DataTable from "../checkout/DataTable";
import { useId } from "react";
import { 
  useAppSelector,
  useAppDispatch } from "@/store/store";
import { ColumnDef } from "@tanstack/react-table";
import { cartType, 
  decQuantity,
  delCart, 
  incQuantity } from "@/store/cartSlice";
import { Checkbox } from "@/components/ui/checkbox";
import cartService from "@/services/CartService";


const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const key = useId();
  const carts = useAppSelector(store => store.cart.carts);

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


  const decItem = async (cartId:string, 
    quantity: number) => {
    try {
      if(quantity <= 0) {
        const res = await cartService.deleteCart(cartId)
        res && dispatch(delCart({id:cartId}))
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
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
          <img 
            className="w-16 h-16 aspect-square rounded-sm mr-4"
            src={row.original.product.images[0].url} 
            alt="image"/>

          <div className="w-full">
            <h3 className="text-sm font-normal text-pretty text-ellipsis">
              {row.original.product.slug}</h3>
            <p className="text-sm">
              <span className="text-gray-400">qty: </span> 
              {row.original.quantity}</p>
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
              onClick={() => row.original?._id   
                && decItem(row.original._id.toString(), row.original.quantity-1)
              }
              className="btn btn-sm bg-gray-dark border
             border-gray-600 px-2 rounded-sm btn-sm ">-</button>

            <span className="mx-2 text-white">
              {row.original.quantity}</span>

            <button 
              onClick={() => row.original?._id 
                && incItem(row.original._id.toString(), row.original.quantity+1) 
              }
              className="btn btn-sm border 
            border-gray-600 px-2 rounded-sm">+</button>
        </div>
      }
    }

    
  ]

  return !carts ? <div className="loading w-full 
    min-h-screen flex bg-[#121212] items-center">
      <img 
        className="w-20 h-20 mx-auto"
        src="https://i.pinimg.com/originals/27/f7/f5/27f7f575bd5a02e3a1558deb59538a4c.gif" alt="loader" />
    </div> 
    : <div 
    className="cart-page min-h-screen w-full h-fit flex
    justify-center items-center">

      <Card 
        className="streaming-cart-card sm:w-3xl my-32 text-sm md:w-3/4 
        lg:w-2/3 xl:w-1/2 w-[100%] ">
        <CardHeader>
          <CardTitle className="text-lg font-normal text-pretty">
            Your Cart👋</CardTitle>
        </CardHeader>

        <CardContent >
          <DataTable 
            key={key}
            columns={columns}
            data={carts} 
          />
        </CardContent>
      </Card>

  </div>
}


export default Cart;