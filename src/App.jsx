import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Intro from "./components/Intro"
import AuthContext from "./context/AuthContext"
import ScrollRestoreContext from "./context/ScrollRestoreContext";
import WishlistContext from "./context/WishlistContext";
import SearchRestoreContext from "./context/SearchRestoreContext";
import { scrollTo } from "./utilities/scroll";

function App() {
    const [showMain,setShowMain]=useState(false);
    const { pathname } = useLocation()

    useEffect(() => {  
      const htmlElement = document.documentElement;   
      if(pathname.includes('auth')) {
        htmlElement.classList.remove('smooth-scroll')
        scrollTo(0, false);
      }else {
        htmlElement.classList.add('smooth-scroll');
        if (pathname.includes('wishes')) {
            scrollTo(0); 
        }
      }
    }, [pathname]);

    return (
      <>
        {!showMain && <Intro showMain={showMain} setShowMain={setShowMain} />}
        
        {
          showMain && 
          <AuthContext>
            <ScrollRestoreContext>
              <WishlistContext>
                <SearchRestoreContext>
                  {/* <Routes>
                    <Route element={<MainLayout />}>
                      <Route path='/' element={<Landing />} />
                      <Route path='/auth' element={<Auth />} />
                      <Route path='/category/:id' element={<Categories />} />
                      <Route path='/detail/:id' element={<Detail />} />
                    </Route>

                    <Route path='*' element={<PageNotFoundError />} />
                  </Routes> */}
                  <Outlet />
                </SearchRestoreContext>
              </WishlistContext>
            </ScrollRestoreContext>
          </AuthContext>
        }
      </>
    )
}

export default App
