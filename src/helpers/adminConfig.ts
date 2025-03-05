import { 
  Home, 
  BarChart, 
  Users, 
  ShoppingCart, 
  Edit,
  PlusSquare,
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
    slug: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
  {
    slug: "Shop",
    url: "/dashboard/shop/products",
    icon: ShoppingCart,
    subNavItems: [
      {
        slug: 'Edit Product',
        url: '/dashboard/shop/products/edit',
        icon: Edit
      },

      {
        slug: 'Add Product',
        url: '/dashboard/shop/products/add',
        icon: PlusSquare
      }
    ]
  },
];

export default adminNavItems;
