import Image from "next/image";
import star from "../../../public/star.svg"

function Home() {

  return <div className="min-w-screen min-h-screen " >
    <div 
      className="w-screen h-screen mt-32 flex items-center justify-center " >
      <div className="left text-center flex items-center "> 
        <h1>
          <Image 
            className="w-16 inline-block"
            src={star} 
            alt="star" /> 
            <span className="uppercase text-7xl" >Winter</span>
        </h1>
      </div>
      <div 
        className="right w-1/2 h-screen ">

      </div>
    </div>
  </div>
}


export default Home;