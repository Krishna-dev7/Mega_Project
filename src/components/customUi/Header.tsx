"use client"
import React, { useState } from "react";
import { User, ShoppingCart, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import navItems from "@/helpers/navConfig";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import InteractiveHoverButton from "../ui/interactive-hover-button";
import ShinyButton from "../ui/shiny-button";
import CartItem from "./CartItem";
// import { useAppSelector, useAppDispatch } from "@/store/store";

const Header = () => {

  const currentTab = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(currentTab);
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center">
      {/* Announcement Bar */}
      {/* <div className="w-full bg-black text-white text-center py-1.5 text-xs font-light">
        Free Shipping on Orders Above ₹5000
      </div> */}

      <div className="w-full flex justify-center p-4">
        <header className="relative w-full max-w-2xl">
          {/* Main Floating Navbar */}
          <div className="relative sm:top-1 lg:top-1">
            {/* Background Blur Effect */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-lg rounded-full" />

            {/* Glass Morphism Effect */}
            <nav className="relative flex items-center bg-white/50 shadow-lg rounded-full border border-white/20 p-2">
              {/* Logo */}
              <div className="px-6 text-lg font-semibold text-gray-900">
                NOVA.
              </div>	

              {/* Center Navigation */}
              <div className="hidden md:flex flex-1 justify-center">
                <div className="bg-gray-100/70 rounded-full p-1">
                  {navItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
												setActiveTab(item.href)
												router.push(item.href);
											}}
                      className={`relative px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                        activeTab === item.href ? "text-white" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {activeTab === item.href && (
                        <span className="absolute inset-0 bg-black rounded-full" />
                      )}
                      <span className="relative">{item.slug}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Icons */}
              <div className="flex  items-center justify-end flex-1 sm:flex-grow-0 gap-4 px-6">
                <button className="hidden md:flex text-gray-700 hover:text-gray-900 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
                
                {/* user icon  */}

                <Sheet>
                  <SheetTrigger>
                    <button className="text-gray-700 hover:text-gray-900 transition-colors">
                      <User className="w-4 h-4" />
                    </button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetTitle> Hello 🖖 </SheetTitle>
                    <SheetHeader></SheetHeader>
                    <SheetFooter></SheetFooter>
                  </SheetContent>
                </Sheet>
                
                <div className="relative flex items-center text-gray-700 hover:text-gray-900 transition-colors">
                 <Sheet >
                  <SheetTrigger>
                    <ShoppingCart className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-3.5 h-3.5 flex items-center justify-center">
                      0
                    </span>
                  </SheetTrigger>
                  {/* <SheetContent className="text-sm " >
                    <SheetTitle  >Your Cart 👋</SheetTitle>
                    <SheetHeader 
                      className="text-sm text-start mt-1 mb-4 text-gray-400" >
                      Cart details
                    </SheetHeader>

                   <div>
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                   </div>

                    <SheetFooter className="border-t w-full sm:flex flex-col-reverse items-center gap-2
                     text-pretty justify-evenly  flex-nowrap text-sm border-gray-500 py-5 mt-5" >
                      <p>Total Cost : <span className="text-yellow-300 " >$450</span> </p>
                      <ShinyButton className=" " > 
                        <span className="text-sm text-[.6rem] text-fuchsia-400" >Checkout</span> 
                      </ShinyButton> 
                    </SheetFooter>
                  </SheetContent> */}

                  <SheetContent className="text-sm">
                    <SheetTitle>Your Cart 👋</SheetTitle>
                    <SheetHeader className="text-sm text-start mt-1 mb-4 text-gray-400">
                      Cart details
                    </SheetHeader>

                    {/* Scrollable Cart Item Container */}
                    <div
                      className="max-h-96 overflow-y-auto space-y-4 px-2"
                      style={{
                        scrollbarWidth: "none", // For Firefox
                        msOverflowStyle: "none", // For IE and Edge
                      }}
                    >
                      <style jsx>{`
                        /* For Webkit Browsers (Chrome, Safari, etc.) */
                        div::-webkit-scrollbar {
                          display: none;
                        }
                      `}</style>
                      {Array.from({ length: 10 }).map((_, index) => (
                        <CartItem key={index} />
                      ))}
                    </div>

                    {/* Footer */}
                    <SheetFooter
                      className="border-t w-full sm:flex flex-col-reverse items-center gap-2
                        text-pretty justify-evenly flex-nowrap text-sm border-gray-500 py-5 mt-5"
                    >
                      <p>
                        Total Cost: <span className="text-yellow-300">$450</span>
                      </p>
                      <ShinyButton>
                        <span className="text-xs text-fuchsia-400">Checkout</span>
                      </ShinyButton>
                    </SheetFooter>
                  </SheetContent>

                 </Sheet>
                </div>

                {/* Mobile Menu Button */}
                <button 
                  className="md:hidden relative z-50 text-gray-700"
                  onClick={() => setIsNavOpen(!isNavOpen)}
                >
                  <div className="space-y-1">
                    <span className={`block w-4 h-0.5 bg-current transition-all duration-300 ${
                      isNavOpen ? 'rotate-45 translate-y-1.5' : ''
                    }`} />
                    <span className={`block w-4 h-0.5 bg-current transition-all duration-300 ${
                      isNavOpen ? 'opacity-0' : ''
                    }`} />
                    <span className={`block w-4 h-0.5 bg-current transition-all duration-300 ${
                      isNavOpen ? '-rotate-45 -translate-y-1.5' : ''
                    }`} />
                  </div>
                </button>
              </div>
            </nav>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden absolute top-full left-0 right-0 mt-2 overflow-hidden transition-all duration-300 ${
            isNavOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg borde border-white/20 p-4">
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={item.href}
                      className={`block py-2 px-4 text-sm rounded-lg transition-colors ${
                        activeTab === item.slug 
                          ? 'bg-black text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        setActiveTab(item.slug);
                        setIsNavOpen(false);
                      }}
                    >
                      {item.slug}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;