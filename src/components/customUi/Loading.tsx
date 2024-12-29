import star from "@/../public/star.svg"
import Image from "next/image";

function Loading() {
  return <div className=" rotate-100 " >
    <Image src={star} alt="start" />
  </div>
}


export default Loading;
