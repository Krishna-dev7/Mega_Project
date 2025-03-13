import { 
  Home, 
  BarChart, 
  Users, 
  ShoppingCart, 
  Settings,
  CreditCard, 
  ShoppingBagIcon} from "lucide-react";

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
    slug: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
  {
    
    slug: "Payments",
    url: "/dashboard/payments",
    icon: CreditCard
  },
  {
    slug: "Shop",
    url: "/dashboard/shop/products",
    icon: ShoppingCart,
  },
  
  {
    slug: 'Orders',
    url: '/dashboard/orders',
    icon: ShoppingBagIcon
  },
  {
    slug: "Manage Users",
    url: "/dashboard/users",
    icon: Users,
  },
];

export default adminNavItems;
