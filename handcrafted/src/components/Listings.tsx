//Listings.tsx is pure, no typescript error flag. This will grant us ease in deployment.
// Bad at documentation, I hope you understand the code

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { StarRating } from './Star-rating';

// Created an interface for products to kill Typescript errors
interface Product {
  id: number
  name: string
  description: string
  price: string
  imagePath: string
}

interface ProductListingsProps {
  productlistings: Product[]
}

const ProductListings: React.FC<ProductListingsProps> = ({
  productlistings,
}) => {
  const [listings, setListings] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortType, setSortType] = useState<string | null>(null)
  const productsPerPage: number = 12
  const [showSortOptions, setShowSortOptions] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    setListings(productlistings)
  }, [productlistings])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page on new search
  }

  // Filtered products based on the search query, the search targets the name in the database and returns result
  const displayedProducts = listings.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Apply sorting based on sortType: either by name or by price
  let sortedProducts = [...displayedProducts]
  if (sortType === 'name') {
    sortedProducts = sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortType === 'price') {
    sortedProducts = sortedProducts.sort((a, b) => {
      const priceA = parseFloat(a.price.replace('$', ''))
      const priceB = parseFloat(b.price.replace('$', ''))
      return priceA - priceB
    })
  }

  // Pagination based on sorted and filtered products
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  )

  const shouldDisplayPagination = displayedProducts.length > productsPerPage //Gets rid of pagination if search result is less than 13

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    // JSX for the UI
    <section className="py-12 px-6 bg-gradient-to-r from-muted to-background m-4 rounded-lg mt-12 md:mt-0">
      <h2 className="text-3xl font-semibold mb-4 font-heading md:mt-12 mt-2">
        Product Listings
      </h2>
      <div className="md:grid md:grid-cols-5 md:gap-6 mt-4">
        <div className="row-start-1 row-end-7">
          <input
            className="p-2 rounded-xl text-left float-left -ml-2"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          /><br />
          <button type="submit">
          </button>
          <h1 className="md:-mt-6 mt-2">Categories</h1>
          <div className="p-3 m-2 relative">
            <button
              className="p-3 px-5 bg-black  hover:bg-text  transition duration-300 text-white font-bold rounded-lg"
              onClick={() => setShowSortOptions(!showSortOptions)}
            >
              Sort &#x25BC;
            </button>
            {showSortOptions && (
              <div className="absolute bg-white border rounded-lg shadow-md py-2 mt-2">
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setSortType('name')}
                >
                  Sort by Name
                </button>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setSortType('price')}
                >
                  Sort by Price
                </button>
              </div>
            )}
          </div>
        </div>
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="transition-transform duration-300
            transform-gpu hover:scale-105 bg-background rounded-lg shadow-lg p-4 mt-4"
          >
            <Image
              width={200}
              height={200}
              src={product.imagePath}
              alt={product.name}
              className="mb-4 items-center w-80 h-60 rounded-lg shadow-inner"
            />
            <h3 className="text-lg font-semibold font-heading mb-2">
              {product.name}
            </h3>
            <p className="text-text font-body">{product.description}</p>
            <p className="text-text text-lg font-bold font-body mt-5">
              Price: {product.price}
            </p>
            <button
              className="bg-muted hover:bg-link transition duration-30 text-white 
            font-bold py-2 px-4 rounded mt-2 font-heading"
            >
              Add to Cart
            </button>
            <StarRating/>
          </div>
        ))}
        {shouldDisplayPagination && (
          <div className="flex items-center justify-center p-3">
            {[
              ...Array(Math.ceil(displayedProducts.length / productsPerPage)),
            ].map((_, index) => (
              <button
                className={`p-2 bg-muted hover:bg-link transition duration-30
              text-white font-bold m-2 rounded-lg ${
                currentPage === index + 1 ? 'bg-link' : ''
              }`}
                key={index}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductListings
