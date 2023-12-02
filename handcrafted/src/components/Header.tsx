import Link from "next/link";
import Image from 'next/image';
import React, { useState } from 'react';
import UserIcon from "@/assets/UserIcon";
import SellerProfile from '@/pages/seller-profile';

export default function Header() {
    const [showProfile, setShowProfile] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    return (
        <div className="header z-0 lg:z-10 lg:fixed w-full md:z-0">
            <nav className="md:flex p-5 md:justify-between w-auto">
                <div className="flex justify-between items-center cursor-pointer">
                    <a href="/" className="cursor-pointer">
                        <span className="text-3xl font-bold">
                            <img className="h-12  inline" src="https://cdn-icons-png.flaticon.com/128/3859/3859602.png" alt="logo" />
                            Handcrafted Haven
                        </span>
                    </a>

                </div>
                <ul className="md:flex md:items-center md:z-auto w-full left-0 md:w-auto 
                md:py-0 py-4 md:pl-0 pl-7 md:opacity-100  top-[-400px] transition-all ease-in duration-500">
                    <li className="text-2xm mx-4"><a href="/" className="cursor-pointer">Home</a></li>
                    <li className="text-2xm mx-4"><Link href="/seller-profile" className="cursor-pointer">Seller Profiles</Link></li>
                    <li className="text-2xm mx-4"><Link href="/productListings" className="cursor-pointer">Product Listings</Link></li>
                    <li className="text-green-500 text-2xm mx-4"><a href="/ReviewsAndRatings" className="cursor-pointer">Reviews and Ratings</a></li>
                    <li>

                        <Link href="/register" passHref>

                            <UserIcon />

                        </Link>

                    </li>
                </ul>
            </nav>
            {isLoggedIn && <SellerProfile />}
        </div>
    )
}