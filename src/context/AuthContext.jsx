import { createContext, useContext, useEffect, useState } from "react"
import { useVerify } from "../services";
import { matchPath, useLocation } from "react-router-dom";

const Auth=createContext(null)

function AuthContext({children}) {
    const [isLoggedIn,setLoggedIn]=useState(false);
    const [userName,setUsername]=useState(null);
    const [isLoading,setIsLoading]=useState(true)
    const [notification,setNotification] = useState({
        open:false,
        message:'',
        severity:'info', 
    });
    const location = useLocation();
    const isErrorPage =!matchPath({ path: '/', end: true }, location.pathname) 
    && !matchPath('/auth', location.pathname) 
    && !matchPath('/category/:id', location.pathname)
    && !matchPath('/detail/:id', location.pathname)
    && !matchPath('/wishes', location.pathname);

    const showNotification =(message, severity='info')=>{
        setNotification({
            open: true,
            message,
            severity
        });
    };
    const handleCloseNotification =(event,reason)=>{
        if (reason==='clickaway') {
            return;
        }
        setNotification({ ...notification, open: false });
    };

    useEffect(()=>{
        useVerify()
        .then(res=>{
            if(res?.status){
                setLoggedIn(true)
                setUsername(res.user_login)
            }
            else if(res===401){
                showNotification('Session expired or invalid. Please log in.','warning');
                setLoggedIn(false)
            }
            else{
                setLoggedIn(false)
                showNotification('Connection with the server failed','error');
            }
            setIsLoading(false)
        }) 
    },[])
    
    useEffect(() => {
        if (isLoading || isErrorPage) {
            document.body.classList.remove('content-loaded');
        } else {
            document.body.classList.add('content-loaded');
        }
        return () => document.body.classList.remove('content-loaded')
    }, [isLoading,isErrorPage]); 
    

    return (
        <Auth.Provider 
        value={{
            isLoggedIn,setLoggedIn,
            userName,setUsername,
            isLoading,notification,
            showNotification,handleCloseNotification
        }}>
            {children}
        </Auth.Provider>
    )
}

export default AuthContext
export const useAuth=()=>useContext(Auth)


