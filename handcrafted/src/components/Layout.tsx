import { ReactNode } from 'react';
import Footer from "./Footer";
import Header from "./Header";
import Head from 'next/head';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="main-layout">
            <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Handcrafted Haven, a robust community of handcrafted artisans"
        />
        <title>Home | Handcrafted Haven</title>
      </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}