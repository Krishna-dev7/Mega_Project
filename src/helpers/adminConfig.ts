import { 
  Home, 
  BarChart, 
  Users, 
  ShoppingCart, 
  Settings,DiamondPlus,Pencil } from "lucide-react";

const adminNavItems = [
  {
    slug: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    slug: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart,
  },
  {
    slug: "Manage Users",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    slug: "Shop",
    subNameItems:[{
      slug: "add",
      url: "/dashboard/shop/products/add",
      icon:DiamondPlus,
    },
    {
      slug: "edit",
      url: "/dashboard/shop/products/edit",
      icon: Pencil,
    }],
    url: "/dashboard/shop/products",
    icon: ShoppingCart,
  },
  

  {
    slug: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  }
];

export default adminNavItems;
