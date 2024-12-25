import React from "react";
import { Badge } from "../ui/badge";
import { Categories } from "@/models/product.models";
import badgeConfig from "@/helpers/badgeConfig";

type props = {
  className?: string,
  category: Categories,
  children: React.ReactNode,
  prop?: Array<any>
}


const BadgeComponent:React.FC<props> = ({
  className,
  category,
  children
}) => {

  let badgeColor = badgeConfig[category].bgColor;
  let txtColor = badgeConfig[category].textColor

  return <Badge 
    className={`hover:${badgeColor} ${badgeColor} py-1 mb-1 ${txtColor} ${className}`} >
      {children}
  </Badge>
}

export default BadgeComponent;