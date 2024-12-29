"use client"
import React from "react";
import { Badge } from "../ui/badge";
import { Categories } from "@/models/product.models";
import badgeConfig from "@/helpers/badgeConfig";
import { cn } from "@/lib/utils";

type props = {
  className?: string,
  category: Categories,
  children: React.ReactNode,
  prop?: Array<any>
}

const BadgeComponent: React.FC<props> = ({
  className,
  category,
  children
}) => {
  // Get the base colors from config
  const baseColors = badgeConfig[category];

  // Create the complete class string including hover and dark mode variants
  const badgeClasses = cn(
    "py-1 mb-1 transition-colors dark:border-orange-600",
    baseColors.bgColor,
    baseColors.textColor,
    // Add dark mode variants
    baseColors.darkBgColor,
    baseColors.darkTextColor,
    // Add hover states
    `hover:${baseColors.hoverBgColor}`,
    `dark:hover:${baseColors.darkHoverBgColor}`,
    className
  );

  return (
    <Badge className={badgeClasses}>
      {children}
    </Badge>
  );
}

export default BadgeComponent;