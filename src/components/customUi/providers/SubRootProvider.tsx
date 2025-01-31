"use client"
import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import accountService from "@/services/AccountService";
import { setAuth } from "@/store/authSlice";

function SubRootProvider({children}: {children:React.ReactNode}) {

  const dispatch = useAppDispatch();
    const session = useSession();
    
    useEffect( () => {
      if(session.status == "authenticated") {
        accountService
          .getCurrentAccount(session.data)
          .then( res => {
            // console.log("AuthData Response: ", res);
            if(res.account) {
              // console.log("dispatch: ", res.account);
              dispatch(setAuth({ 
                authStatus: true,
                email: res.account.email,
                username: res.account.username,
                data: res
              }))
            }
          })
          .catch( err => {
            console.log("Auth error at RootProvider: ", 
                err.message)
          })
        
        return;
      } 

      dispatch(setAuth({ 
        authStatus: false,
        email: "",
        username: "",
        data: {account: null}
      }))

    }, [session.status, dispatch] )
  

  return <>
    {children}
  </>
}

export default SubRootProvider;