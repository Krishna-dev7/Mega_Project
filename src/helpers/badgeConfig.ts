import { Categories } from "@/models/product.models";

const badgeConfig= {
  [Categories.BAGS]: {
    bgColor: "bg-orange-300",
    textColor: "text-orange-800",
  },
  [Categories.DRINKWARE]: {
    bgColor: "bg-blue-300",
    textColor: "text-blue-800",
  },
  [Categories.ELECTRONICS]: {
    bgColor: "bg-purple-300",
    textColor: "text-purple-800",
  },
  [Categories.FOOTWEAR]: {
    bgColor: "bg-green-300",
    textColor: "text-green-800",
  },
  [Categories.HEADWEAR]: {
    bgColor: "bg-yellow-300",
    textColor: "text-yellow-800",
  },
  [Categories.HOODIES]: {
    bgColor: "bg-red-300",
    textColor: "text-red-800",
  },
  [Categories.JACKETS]: {
    bgColor: "bg-indigo-300",
    textColor: "text-indigo-800",
  },
  [Categories.KIDS]: {
    bgColor: "bg-pink-300",
    textColor: "text-pink-800",
  },
  [Categories.PETS]: {
    bgColor: "bg-teal-300",
    textColor: "text-teal-800",
  },
  [Categories.SHIRTS]: {
    bgColor: "bg-cyan-300",
    textColor: "text-cyan-800",
  },
  [Categories.STICKERS]: {
    bgColor: "bg-lime-300",
    textColor: "text-lime-800",
  },
  [Categories.FASHION]: {
    bgColor: "bg-rose-300",
    textColor: "text-rose-800",
  }
}

export default badgeConfig;
