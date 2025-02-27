import React from "react";
import { IProduct } from "@/models/product.models";
import { useRouter } from "next/navigation";
import { useAppDispatch} from "@/store/store";
import { selectProduct } from "@/store/productSlice";
import cartService from "@/services/CartService";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { setCart } from "@/store/cartSlice";

type Props = {
  product: IProduct;
  className?: string;
};

const ProductItem: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const placeholderImage = "https://via.placeholder.com/300x200";
  const dispatch = useAppDispatch();
  const session = useSession()
  const createCart = async (e:React.MouseEvent) => {
    e.stopPropagation()
    if (session && session.status == "unauthenticated") {
      return toast({
        title: "Unauthenticated 😔",
        description: "Signin before adding Cart"
      });
    }
  
    if (session.data?.user._id && product?._id) {
      const cart = await cartService.createCart({
        userId: session.data?.user._id,
        productId: product?._id.toString()
      });

      console.log("Cart 😄", cart);
      if (cart) {
        dispatch(setCart(cart));
        toast({
          title: "Cart 😄",
          description: "Cart added successfully"
        })
      }
    }
  };
  
  return (
    <div 
      onClick={() =>{
        router.push(`/products/${product._id?.toString()}`)
        dispatch(selectProduct(product._id))
      }}
      className="group cursor-pointer mb-7">
      <div className="relative overflow-hidden">
        <img
          src={
            product.images[0].url
              || placeholderImage
          }
          alt={product.slug}
          className="w-full h-[400px] object-cover transform 
            group-hover:scale-105 transition duration-700"
        />
        <div
          className="absolute inset-0 bg-black/40 
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-300">
          <div 
            className="absolute bottom-0 left-0 right-0 p-6
              transform translate-y-full group-hover:translate-y-0 
              transition-transform duration-300">
            <button 
              onClick={createCart}
              className="w-full bg-luxury-gold text-black 
                py-3 font-semibold tracking-wider hover:bg-white 
                transition-colors z-100">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <div 
        className="mt-4 text-center flex items-center
          justify-center gap-5">
        <h3 
          className="font-display text-ellipsis 
            line-clamp-1 text-white mt-1 text-sm">
          {product.slug}
        </h3>
        <p className="text-sm mt-1">
          {new Intl.NumberFormat('en-IN', {
            currency: 'INR',
            style: 'currency',
          }).format(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
