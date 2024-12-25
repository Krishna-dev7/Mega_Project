"use client"

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Search,
  X,
  ShoppingBag,
  Filter,
  ChevronDown
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { Categories, IProduct } from "@/models/product.models";
import axios from "axios";
import conf from "@/helpers/conf";
import ProductItem from "@/components/customUi/ProductItem";
import { Checkbox } from "@/components/ui/checkbox";

const ProductPage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] 
    = useState<Array<Categories>>([]);
  const [products, setProducts]
    = useState<Array<IProduct>>([]);

  const fetchProducts = useMemo(() => {
    axios
    .get(`${conf.url}/api/products`)
    .then(res =>
      setProducts(prev => [...res.data.data])
    )
    .catch(err =>
      console.log("product fetch error: ", err.message)
    )
  }, [])

  // useEffect(() => {
  //   fetchProducts();
  // }, [])


  const categories = Object.values(Categories)

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                {/* <input type="checkbox" className="mr-3 h-4 w-4" /> */}
                <Checkbox 
                  onSelect={ () =>
                    setSelectedCategories( prev => { 
                      if(!prev.includes(category)) {
                        prev.push(category);
                      } else {
                        let idx = prev.indexOf(category);
                        prev.splice(idx,1);
                      }
                      return [...prev];
                    }                    )
                  }
                  checked={selectedCategories.includes(category)}
                  value={category}/>
                <span className="text-sm ml-2">{category}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        <Slider
          defaultValue={[0, 5000]}
          max={5000}
          step={100}
          className="mb-4"
          onValueChange={setPriceRange}
        />
        <div className="flex items-center justify-between text-sm">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Sort By</h3>
        <Select defaultValue="newest">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-medium">Collection</h1>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Filter className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <FilterSidebar />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (

                <ProductItem
                  className=""
                  key={product._id?.toString()}
                  product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

     
    </main>
  );
};

export default ProductPage;