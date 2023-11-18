import Footer from "./Footer";
import Header from "./Header";

export default function Layout({children}) {
    return (
        <div className="main-layout">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}