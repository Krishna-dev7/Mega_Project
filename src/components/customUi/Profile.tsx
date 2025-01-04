"use client"
import conf from "@/helpers/conf";
import { UserSchema } from "@/models/user.models";
import { IUserProfile } from "@/models/userProfile.models";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import React from "react"
import ShinyButton from "../ui/shiny-button";

type props = {
  account? : IUserProfile & {
    userId: UserSchema
  }
}

const Profile:React.FC<props> = ({
  account
}) => {
  return <div className="w-full my-1 sm:my-5 flex-grow" >
    <div 
      className="avatarSec flex items-center ">
      <Avatar className="flex-shrink-0 mr-4 " >
        <AvatarImage 
          className="w-14 h-14 aspect-square rounded-full"
          src={account?.userId.avatar 
            || "https://i.pinimg.com/736x/95/9f/a4/959fa411d5cd2de255dd2cf64dd92723.jpg" }  />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>

      <div>
        <h2 className="sm:text-lg mb-1 text-sm" > 
          Panda Bhai 
        </h2>
        <p className="text-ellipsis text-pretty text-yellow-200 text-xs overflow-hidden
         line-clamp-1 " >
           Panda Bhai humara Pura naam hai 
        </p>
      </div>
    </div>

    {/* link section  */}

    <div 
      className="linkSec flex capitalize dark:text-gray-200 flex-col gap-4 sm:text-sm 
      text-sm text-pretty mt-10 w-full">
      <Link  href={`${conf.url}/api/profile/profileId`} >
          Profile
      </Link>
      <Link href={`${conf.url}/api/profile/profileId`} >
        Wishlist
      </Link>
      <Link href={`${conf.url}/api/profile/profileId`} >
        Orders
      </Link>
      <Link href={`${conf.url}/api/profile/profileId`} >
        History
      </Link>
      <Link href={`${conf.url}/api/profile/profileId`} >
        signup
      </Link>
    </div>

  </div>
}


export default Profile;