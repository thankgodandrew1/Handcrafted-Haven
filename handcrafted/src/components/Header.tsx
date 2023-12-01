import Link from "next/link";
import { useState } from "react";

export default function Header() {

    const [isClick, setIsClick] = useState(false)
    function toggleNavBar () {
        setIsClick(!isClick)
    }

    return (
        <>
        <div className="header z-0 lg:z-10 lg:fixed w-full md:z-0">
            <nav className="md:flex p-5 md:justify-between w-auto">
                <div className="flex justify-between items-center cursor-pointer">
                <a href="/" className="cursor-pointer">
                <span className="text-3xl font-bold">
                    <img className="h-12  inline" src="https://cdn-icons-png.flaticon.com/128/3859/3859602.png" alt="logo" />
                    Handcrafted Haven 
                </span>
                </a>
                {isClick ? (
                    <img className="menu_class md:hidden" src="https://icon-library.com/images/x-mark-icon/x-mark-icon-21.jpg" 
                    alt="Hamburger menu" 
                    height={40}
                    width={40}
                    onClick={toggleNavBar}
                    />
                ) : (
                    <img className="menu_class md:hidden" src="https://icon-library.com/images/hamburger-menu-icon-transparent/hamburger-menu-icon-transparent-23.jpg" 
                    alt="Hamburger menu" 
                    height={40}
                    width={40}
                    onClick={toggleNavBar}
                    />

                )}
                </div>
                {isClick && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <li className="list-none text-2xl mx-4"><a href="/" className="cursor-pointer">Home</a></li>
                            <li className="list-none text-2xl mx-4"><Link href="" className="cursor-pointer">Seller Profiles</Link></li>
                            <li className="list-none text-2xl mx-4"><Link href="/productListings" className="cursor-pointer">Product Listings</Link></li>
                            <li className="list-none text-green-500 text-2xl mx-4"><a href="#" className="cursor-pointer">Reviews and Ratings</a></li>
                        </div>
                    </div>
                )}
                <ul className="hidden md:flex md:items-center md:z-auto w-full left-0 md:w-auto 
                md:py-0 py-4 md:pl-0 pl-7 md:opacity-100  top-[-400px] transition-all ease-in duration-500">
                    <li className="text-2xl mx-4"><a href="/" className="cursor-pointer">Home</a></li>
                    <li className="text-2xl mx-4"><Link href="" className="cursor-pointer">Seller Profiles</Link></li>
                    <li className="text-2xl mx-4"><Link href="/productListings" className="cursor-pointer">Product Listings</Link></li>
                    <li className="text-green-500 text-2xl mx-4"><a href="#" className="cursor-pointer">Reviews and Ratings</a></li>
                </ul>
            </nav>
        </div>
        </>
    )
}