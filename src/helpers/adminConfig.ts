import { 
  Home, 
  BarChart, 
  Users, 
  ShoppingCart, 
  Settings } from "lucide-react";

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
    url: "/dashboard/shop",
    icon: ShoppingCart,
  },
  {
    slug: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  }
];

export default adminNavItems;
