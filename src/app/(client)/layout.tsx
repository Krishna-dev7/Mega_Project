"use client"
import Header from "@/components/customUI/headersUi/Header";
import Footer from "@/components/customUI/layouts/Footer";
import Loading from "@/components/customUI/misc/Loading";
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