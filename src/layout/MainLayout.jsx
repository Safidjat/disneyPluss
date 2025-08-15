import { Outlet } from "react-router-dom"
import Footer from "../components/footer"
import Notification from "../components/Notification"
import Header from "../components/header"

function MainLayout() {

    return (
        <>
            <Header />
            <main>
              <Outlet />
            </main>
            <Notification />
            <Footer />
        </>
    )
}

export default MainLayout
