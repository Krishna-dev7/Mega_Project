"use client"
import conf from "@/helpers/conf";
import { UserSchema } from "@/models/user.models";
import { IUserProfile } from "@/models/userProfile.models";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import React from "react"
import { useAppSelector } from "@/store/store";
import { LogOut } from "lucide-react";
import accountService from "@/services/AccountService";

type props = {
  account? : IUserProfile & {
    userId: UserSchema
  }
}

const Profile:React.FC<props> = ({
  account
}) => {

  const auth = useAppSelector(store => {
    console.log("store: ",store);
    return store.auth
  })

  return <div className="w-full my-1 sm:my-5 flex-grow" >
    <div 
      className="avatarSec flex text-pretty  items-center ">
      <Avatar className="flex-shrink-0 mr-4 " >
        <AvatarImage 
          className="w-14 h-14 aspect-square rounded-full"
          src={account?.userId.avatar 
            || "https://i.pinimg.com/736x/95/9f/a4/959fa411d5cd2de255dd2cf64dd92723.jpg" }  />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>

      <div>
        <h2 className="sm:text-lg mb-1 text-sm" > 
          {auth.authStatus ? auth.username : "Panda bhai"}
        </h2>

        <p className="text-ellipsis text-pretty text-yellow-200 text-xs overflow-hidden
         line-clamp-1 " >
           { auth.data.account
              ? auth.data.account.email
              : "panda@gmail.com" }
        </p>
      </div>
    </div>

    {/* link section  */}

    <div 
      className="linkSec flex capitalize border-b pb-10
       dark:text-gray-200 flex-col gap-4 sm:text-sm 
        text-sm text-pretty mt-10 w-full">

      {auth.authStatus ? <>
        <Link href={`${conf.url}/api/profile/profileId`} >
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
        <button className="text-start capitalize" onClick={accountService.logout} >
          logout
        </button>
      </> : <Link href={`${conf.url}/signup`} >
        signup
      </Link> }
    </div>


    <div className="profileSec flex flex-col gap-4 text-sm text-gray-200 mt-5 text-pretty">
      <Link href={`${conf.url}/api/profile/profileId`} >
        Payment
      </Link>
      <Link href={`${conf.url}/api/profile/profileId`} >
        issue
      </Link>
    </div>

  </div>
}


export default Profile;