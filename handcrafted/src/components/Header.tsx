/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import UserIcon from '@/assets/UserIcon'
// import SellerProfile from '@/pages/seller-profile';

export default function Header() {
  // const [showProfile, setShowProfile] = React.useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sellerId, setSellerId] = useState('')
  const [isClick, setIsClick] = useState(false)
  function toggleNavBar() {
    setIsClick(!isClick)
  }
  useEffect(() => {
    const sellerIdFromLocalStorage = localStorage.getItem('sellerId')
    if (sellerIdFromLocalStorage) {
      setSellerId(sellerIdFromLocalStorage)
    }
  }, [])
  return (
    <div className="header z-0 lg:z-10 lg:fixed w-full md:z-0">
      <nav className="md:flex p-5 md:justify-between w-auto">
        <div className="flex justify-between items-center cursor-pointer">
          <Link href="/" className="cursor-pointer">
            <span className="text-2xl md:text-3xl font-bold">
              <img
                width={40}
                height={40}
                className="h-12  inline"
                src="https://cdn-icons-png.flaticon.com/128/3859/3859602.png"
                alt="logo"
              />
              Handcrafted Haven
            </span>
          </Link>
          {isClick ? (
            <Image
              className="menu_class md:hidden"
              src="https://icon-library.com/images/x-mark-icon/x-mark-icon-21.jpg"
              alt="Hamburger menu"
              height={40}
              width={40}
              onClick={toggleNavBar}
            />
          ) : (
            <Image
              className="menu_class md:hidden"
              src="https://icon-library.com/images/hamburger-menu-icon-transparent/hamburger-menu-icon-transparent-23.jpg"
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
              <li className="list-none text-2xl mx-4">
                <Link href="/" className="cursor-pointer">
                  Home
                </Link>
              </li>
              {/* <li className="list-none text-2xl mx-4"><Link href="/seller-profile" className="cursor-pointer">Seller Profiles</Link></li> */}
              <li className="list-none text-2xl mx-4">
                {sellerId ? (
                  <Link href={`/seller/${sellerId}`} passHref>
                    Seller Profile
                  </Link>
                ) : (
                  <Link href="/SellerSignUpPage" passHref>
                    Sell
                  </Link>
                )}
              </li>
              <li className="list-none text-2xl mx-4">
                <Link href="/productListings" className="cursor-pointer">
                  Product Listings
                </Link>
              </li>
              <li className="list-none text-green-500 text-2xl mx-4">
                <Link href="/ReviewsAndRatings" className="cursor-pointer">
                  Reviews and Ratings
                </Link>
              </li>
              <li className="list-none text-2xl mx-4">
                <Link href="/register" passHref>
                  <UserIcon />
                </Link>
              </li>
            </div>
          </div>
        )}
        <ul
          className="hidden md:flex md:items-center md:z-auto w-full left-0 md:w-auto 
                md:py-0 py-4 md:pl-0 pl-7 md:opacity-100  top-[-400px] transition-all ease-in duration-500"
        >
          <li className="mx-4">
            <Link href="/" className="cursor-pointer">
              Home
            </Link>
          </li>
          {/* <li className="text-2xm mx-4"><Link href="/seller-profile" className="cursor-pointer">Seller Profiles</Link></li> */}
          <li className="mx-4">
            {sellerId ? (
              <Link href={`/seller/${sellerId}`} passHref>
                Seller Profile
              </Link>
            ) : (
              <Link href="/SellerSignUpPage" passHref>
                Sell
              </Link>
            )}
          </li>
          <li className="mx-4">
            <Link href="/productListings" className="cursor-pointer">
              Product Listings
            </Link>
          </li>
          <li className="text-green-500 mx-4">
            <Link href="/ReviewsAndRatings" className="cursor-pointer">
              Reviews and Ratings
            </Link>
          </li>
          <li>
            <Link href="/register" passHref>
              <UserIcon />
            </Link>
          </li>
        </ul>
      </nav>
      {/* {isLoggedIn && <SellerProfile />} */}
    </div>
  )
}
