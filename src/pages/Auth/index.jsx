import { useLayoutEffect, useState } from "react"
import AuthView from "../../components/main/AuthView"
import { useAuth } from "../../context/AuthContext"
import LoadingVerify from "../../components/LoadingVerify"


function Auth() {
    const [signInFirst,setView]=useState(true)
    const {isLoading}=useAuth()

    return (
        isLoading?<LoadingVerify />:
        <AuthView 
        key={signInFirst ? 'signIn' : 'register'} 
        signInFirst={signInFirst}
        setView={setView}
        />
    )
}
export default Auth


