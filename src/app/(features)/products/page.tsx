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
import BadgeComponent from "@/components/customUi/Badge";
import { Badge } from "@/components/ui/badge";
import badgeConfig from "@/helpers/badgeConfig";

const ProductPage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("newest");
  const [filteredProducts, setFilteredProducts]
    = useState<Array<IProduct>>([])
  const [selectedCategories, setSelectedCategories]
    = useState<Array<Categories>>([]);
  const [products, setProducts]
    = useState<Array<IProduct>>([]);

  const categories = Object.values(Categories)

  useMemo(() => {
    axios
      .get(`${conf.url}/api/products`)
      .then(res => {
        setProducts([...res.data.data])
        setFilteredProducts([...res.data.data]);
      }
      )
      .catch(err =>
        console.log("product fetch error: ", err.message)
      )
  }, [])


  useEffect(() => {

    setFilteredProducts(() => {

      let filtered = [...products];

      // filter category wise
      if (selectedCategories.length > 0) {
        filtered = filtered.filter(product => {
          return selectedCategories.includes(product.category);
        })
      }

      // filter by price
      filtered = filtered.filter(product => {
        return (product.price > priceRange[0]
          && product.price < priceRange[1])
      })

      // sort
      if (sortBy == "price-asc") {
        filtered.sort((a, b) => a.price - b.price)
      } else if (sortBy == "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
      }

      // then return filtered products
      return filtered;
    })

  }, [selectedCategories, priceRange, sortBy, products])



  // useEffect(() => {
  //   fetchProducts();
  // }, [])



  const FilterSidebar = () => (
    <div className="space-y-6 p-4 lg:p-0">
      <div>
        <h3 className="text-lg font-medium mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer w-full">
                <Checkbox
                  onClick={() =>
                    setSelectedCategories(prev => {
                      return !prev.includes(category)
                        ? [...prev, category]
                        : prev.filter(item => item != category)
                    })
                  }
                  checked={selectedCategories.includes(category)}
                  value={category}
                  className="mr-2" />
                <span className="text-sm flex-1">{category}</span>
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
          step={1000}
          className="mb-6"
          onValueChange={setPriceRange}
        />
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">₹{priceRange[0].toLocaleString()}</span>
          <span className="font-medium">₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Sort By</h3>
        <Select
          onValueChange={(value) => setSortBy(value)}
          defaultValue={sortBy}>
          <SelectTrigger className="w-full bg-white">
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
    <main className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className=" border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-semibold">Collection</h1>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <ShoppingBag className="h-5 w-5" />
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden hover:bg-gray-100">
                    <Filter className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0">
                  <FilterSidebar />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0 rounded-lg p-6 h-fit sticky top-24">
            <FilterSidebar />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductItem
                  key={product._id?.toString()}
                  product={product}
                  className="h-full bg-neutral-50 " />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center flex-1 bg-gray-50 rounded-lg px-4 py-2">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full text-base sm:text-lg bg-transparent border-none outline-none placeholder:text-gray-400"
                  autoFocus
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2 hover:bg-gray-100"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <BadgeComponent
                    category={category}
                    key={category}
                    className={`rounded-md text-sm font-normal mx-1`}
                  >
                    {category}
                  </BadgeComponent>  
                ))}
              </div>
            </div>  
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductPage;