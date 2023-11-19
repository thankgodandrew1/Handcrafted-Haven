import { ReactNode } from 'react';
import Footer from "./Footer";
import Header from "./Header";
import Head from 'next/head';

interface LayoutProps {
    children: ReactNode;
}

export const siteTitle = 'Home | HandCrafted Have';

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="main-layout">
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}