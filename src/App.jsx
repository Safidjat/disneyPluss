import { Outlet,ScrollRestoration } from "react-router-dom"
import { useState } from "react"
import Intro from "./components/Intro"
import AuthContext from "./context/AuthContext"
import ScrollRestoreContext from "./context/ScrollRestoreContext";
import WishlistContext from "./context/WishlistContext";
import SearchRestoreContext from "./context/SearchRestoreContext";

function App() {
    const [showMain,setShowMain]=useState(false);

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
