"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

function ThemeProvider({ children, ...props }: any) {
  const [mounted, setMounted] = useState(false);

  // Run this effect only on the client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render the ThemeProvider until after the first client render
  if (!mounted) {
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>
    {children}</NextThemesProvider>;
}

export default ThemeProvider;
