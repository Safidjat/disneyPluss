import { useAuth } from "../../context/AuthContext"

function Footer() {
  const{isLoading}=useAuth() 

  return (
    !isLoading&&
    <footer className="p-[10px] bg-bgDark flex flex-col items-center">
        <img src="/assets/img/disney-logo.svg" className="h-[50px]" alt="disney" />
        <h3 className="my-[5px] text-[12px] font-400 text-white">&copy; {new Date().getFullYear()}, coded by Małgorzata Kwiecień</h3>
    </footer>
  )
}

export default Footer
