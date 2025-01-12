import { IProduct } from "@/models/product.models"
import { UserSchema } from "@/models/user.models"
import ShineBorder from "@/components/ui/shine-border"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import { Star } from "lucide-react";

function Description({
  product
}: {product: IProduct & {owner: UserSchema}}) {
  return <ShineBorder
  color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
    className="max-w-7xl py-10 w-full mt-10 sm:border dark:border-gray-400 border-black rounded-lg
      shadow-md mx-auto px-4 sm:px-6 lg:px-8 " >
    <div className="description w-full h-full ">
      <div className="profile w-fit px-4 py-2 dark:text-black bg-green-300 flex
       text-sm sm:text-md border border-black rounded-sm
     text-pretty border-separate items-center gap-1" >
        <Avatar>
          <AvatarImage
            className="w-6 h-6 rounded-full"
            src={product?.owner?.avatar
              || "https://i.pinimg.com/736x/7d/9f/7b/7d9f7b3a201aa53213edad9e56b7fb1e.jpg"} />
          <AvatarFallback about="av" />
        </Avatar>

        <span>
          {product?.owner?.username || "Random"}
        </span>

        <p className="flex items-center px-2 border-l border-black" >
          {(new Array(5)).fill(0).map((item, idx) => (
            <Star
              key={idx}
              color="black"
              fill={idx < (product?.rating ?? 0) ? "black" : "transparent"}
              size={15} />
          ))}
        </p>
      </div>

      <div className="mt-5" >
        {product?.description}
      </div>
    </div>
  </ShineBorder>

}

export default Description