import React from "react";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="main-layout">
            <main>{children}</main>
            <Footer />
        </div>
    )
}