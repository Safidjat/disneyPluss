import { Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import { useState } from "react"
import Intro from "./components/Intro"
import Auth from "./pages/Auth"
import AuthContext from "./context/AuthContext"
import Categories from "./pages/Categories"
import MainLayout from "./layout/MainLayout"
import PageNotFoundError from "./pages/PageNotFoundError"
import Detail from "./pages/Detail"

function App() {
    const [showMain,setShowMain]=useState(false);

    return (
      <>
        {!showMain && <Intro showMain={showMain} setShowMain={setShowMain} />}
        
        {
          showMain && 
          <AuthContext>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path='/' element={<Landing />} />
                  <Route path='/auth' element={<Auth />} />
                  <Route path='/category/:id' element={<Categories />} />
                  <Route path='/detail/:id' element={<Detail />} />
                </Route>

                <Route path='*' element={<PageNotFoundError />} />
              </Routes>
          </AuthContext>
        }
      </>
    )
}

export default App
