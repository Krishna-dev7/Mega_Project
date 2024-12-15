"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const ErrorPage: React.FC = () => {

  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const errorCode = searchParams.get('errorCode');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <BackgroundBeamsWithCollision>
        <h2 className="text-xl relative z-20 md:text-2xl lg:text-3xl font-bold text-center text-black dark:text-white ">
          <p className="text-white text-7xl" >
            {errorCode || 404}
          </p>
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="">{error || "An error has been occurred"}</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span className="">{error || "An error has been occurred"}</span>
            </div>
          </div>
        </h2>

      </BackgroundBeamsWithCollision>
    </div>
  );
};

export default ErrorPage;