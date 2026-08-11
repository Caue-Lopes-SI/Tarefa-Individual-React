import { Outlet } from "react-router-dom";
import Footer from "./Components/footer";
import Header from "./Components/header";

export default function RootLayout(){
    return(
        <>
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <Header/>
                <main style={{ flex: 1 }}>
                    <Outlet/> 
                </main>
                <Footer/>
            </div>
        </>
    )
}