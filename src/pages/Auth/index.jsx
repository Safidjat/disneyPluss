import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import LoadingVerify from "../../components/LoadingVerify"
import AuthView from "../../components/main/Auth/AuthView"


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


