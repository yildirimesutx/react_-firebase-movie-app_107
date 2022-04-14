import { createContext, useEffect, useState } from "react";
import { userObserver } from "../auth/firebase";


//  bir context oluşturuyoruz, AAuthContext İSMİNİ BİZ VERİYORUZ
// projede istenilen yerde kullanmak için oluşturduk
export const AuthContext = createContext()


// oluşturulan providar ile approuter sarmarlanıyor

const AuthContextProvider = ({children})=>{
    const [currentUser,setCurrentUser]= useState()

    useEffect(() => {
      userObserver(setCurrentUser)
    }, [])
    

    return(
   <AuthContext.Provider value={{currentUser}}>
       {children}

   </AuthContext.Provider>
    )
}

export default AuthContextProvider;