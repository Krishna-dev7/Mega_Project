"use client"
import Header from "@/components/customUi/headersUi/Header";
import Footer from "@/components/customUi/layouts/Footer";
import Loading from "@/components/customUi/misc/Loading";
import { useEffect, useState } from "react";

const ClientLayout = ({children}: {children: React.ReactNode}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!children) return setLoading(true)
    setLoading(false);
  }, [children])


  if(loading) {
    return <div className="loader-div min-h-screen w-full flex
     justify-center items-center">
      <Loading />
    </div>
  }

  return <>
  <Header />
    <div className="children-div min-h-screen h-fit">
      {children}
    </div>  
  <Footer />
</>
}

export default ClientLayout;