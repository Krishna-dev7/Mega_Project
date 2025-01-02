"use client";

import React, { 
  useState, 
  useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  X,
  ChevronDown,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Categories, IProduct } from "@/models/product.models";
import axios from "axios";
import conf from "@/helpers/conf";
import ProductItem from "@/components/customUi/ProductItem";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch } from "@/store/store";
import { setProducts as dispatchProducts } from "@/store/productSlice";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

const ProductPage = () => {
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("newest");
  const [filteredProducts, setFilteredProducts] = useState<Array<IProduct>>([]);
  const [selectedCategories, setSelectedCategories] = useState<Array<Categories>>([]);
  const [products, setProducts] = useState<Array<IProduct>>([]);

  const categories = Object.values(Categories);
  const dispatch = useAppDispatch();

  useMemo(() => {
    axios
      .get(`${conf.url}/api/products`)
      .then(res => {
        setProducts([...res.data.data]);
        dispatch(dispatchProducts(res.data.data));
        setFilteredProducts([...res.data.data]);
      })
      .catch(err =>
        console.log("product fetch error: ", err.message)
      )
  }, []);

  useEffect(() => {
    setFilteredProducts(() => {
      let filtered = [...products];
      if (selectedCategories.length > 0) {
        filtered = filtered.filter(product => selectedCategories.includes(product.category));
      }
      filtered = filtered.filter(product => 
        product.price > priceRange[0] && product.price < priceRange[1]
      );
      if (sortBy == "price-asc") {
        filtered.sort((a, b) => a.price - b.price)
      } else if (sortBy == "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
      }
      return filtered;
    })
  }, [selectedCategories, priceRange, sortBy, products]);

  const HorizontalFilters = () => (
    <div className="relative mt-14">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-300/10 
      to-transparent blur-xl dark:from-orange-500/10"></div>
      <div className="relative flex flex-wrap items-center gap-4 p-4 bg-transparent
       dark:bg-black/40 backdrop-blur-xl rounded-xl border border-gray-300 dark:border-orange-500/20">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-orange-500/30 dark:text-orange-500 dark:hover:bg-orange-500/10 dark:hover:border-orange-500/50"
            >
              Categories
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4 dark:bg-black/90 backdrop-blur-xl border-gray-300 dark:border-orange-500/20">
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    onClick={() =>
                      setSelectedCategories(prev => {
                        return !prev.includes(category)
                          ? [...prev, category]
                          : prev.filter(item => item != category)
                      })
                    }
                    checked={selectedCategories.includes(category)}
                    className="mr-2 border-gray-300 dark:border-orange-500/50 data-[state=checked]:bg-orange-300 dark:data-[state=checked]:bg-orange-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-orange-50">{category}</span>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-orange-500/30 dark:text-orange-500 dark:hover:bg-orange-500/10 dark:hover:border-orange-500/50"
            >
              Price Range
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4 bg-yellow-400 dark:bg-black/90 backdrop-blur-xl border-gray-300 dark:border-orange-500/20">
            <Slider
              defaultValue={[0, 5000]}
              max={5000}
              step={1000}
              className="mb-6"
              onValueChange={setPriceRange}
            />
            <div className="flex items-center justify-between text-sm text-gray-700 dark:text-orange-50">
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
          </PopoverContent>
        </Popover>

        <Select
          onValueChange={(value) => setSortBy(value)}
          defaultValue={sortBy}>
          <SelectTrigger className="w-40 bg-white dark:bg-black/40 border-gray-300 text-gray-700 dark:border-orange-500/30 dark:text-orange-50 hover:border-gray-400 dark:hover:border-orange-500/50">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-black/90 backdrop-blur-xl border-gray-300 dark:border-orange-500/20">
            <SelectItem value="newest" className="text-gray-700 dark:text-orange-50">Newest</SelectItem>
            <SelectItem value="price-asc" className="text-gray-700 dark:text-orange-50">Price: Low to High</SelectItem>
            <SelectItem value="price-desc" className="text-gray-700 dark:text-orange-50">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>

        {selectedCategories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map(category => (
              <Badge
                key={category}
                className="px-2 py-1 bg-gray-200 text-gray-700 border border-gray-300 flex 
                items-center gap-1 hover:bg-gray-300 dark:bg-orange-500/10 dark:text-orange-500 
                dark:border-orange-500/30 dark:hover:bg-orange-500/20 cursor-pointer"
                onClick={() => setSelectedCategories(prev => prev.filter(c => c !== category))}
              >
                {category}
                <X className="h-3 w-3" />
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen  dark:bg-[#121212]">
      
      <div className="container mx-auto px-4 py-6 ">
        <HorizontalFilters />

        <div className="mt-6 scroll-smooth">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
              place-content-center gap-6">
            {filteredProducts.map((product) => (
              <ProductItem
                key={product._id?.toString()}
                product={product}
                className="h-full bg-transparent text-black hover:border-black
                 dark:bg-transparent backdrop-blur-xl border-transparent
               dark:hover:border-orange-500/40 transition-colors"
              />
            ))}
          </div>
        </div>
      </div>
    </main>

  );
};

export default ProductPage;
