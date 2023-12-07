import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'

interface Seller {
  profile: {
    bio: string
    location: string
    contactInfo: {
      email: string
      phone: string
      socialMedia: {
        twitter: string
        facebook: string
        instagram: string
      }
    }
    specialties: string[]
    storeName: string
    storeImage: string
  }
}
const SellerProfile = () => {
  const router = useRouter()
  const { sellerId } = router.query

  const [seller, setSeller] = useState<Seller>({} as Seller)
  const [craftedItems, setCraftedItems] = useState<any[]>([])
  const [newCraftedItem, setNewCraftedItem] = useState({
    title: '',
    description: '',
    price: 0,
    images: [],
    category: '',
  })
  const [loadingItems, setLoadingItems] = useState(true)
  const [loading, setLoading] = useState(true)
  const [stories, setStories] = useState<any[]>([])
  const [newStory, setNewStory] = useState({
    storyTitle: '',
    storyContent: '',
    images: [],
  })
  const [addingNewStory, setAddingNewStory] = useState(false)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState<number[]>([])
  const [addingCraftedItem, setAddingCraftedItem] = useState(false)
  const categories = [
    'Jewelry',
    'Home Decor',
    'Art',
    'Clothing',
    'Accessories',
    'Pottery',
    'Woodwork',
    'Toys',
    'Handbag',
    'Furniture',
  ]
  const handleNextImage = (index: number, totalImages: number) => {
    setCurrentImageIndex((prevIndexes) => {
      const newState = [...prevIndexes]
      newState[index] = (newState[index] + 1) % totalImages
      return newState
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sellerResponse = await fetch(`/api/seller?id=${sellerId}`)
        const sellerData = await sellerResponse.json()
        setSeller(sellerData)
        setLoading(false)

        const craftedItemsResponse = await fetch(`/api/products?id=${sellerId}`)
        const craftedItemsData = await craftedItemsResponse.json()
        // console.log('Crafted Items Data:', craftedItemsData)

        const storiesResponse = await fetch(`/api/stories?id=${sellerId}`)
        const storiesData = await storiesResponse.json()
        // console.log('Stories Data:', storiesData)
        setTimeout(() => {
          setCraftedItems(craftedItemsData.products || [])

          setCurrentImageIndex(
            new Array(craftedItemsData.products.length).fill(0),
          )
          setLoadingItems(false)
          setStories(storiesData.sellerStories || [])
        }, 20000)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (sellerId) {
      fetchData()
    }
  }, [sellerId])

  // const getImageAsFile = async (imageUrl: string): Promise<File | null> => {
  //     try {
  //       const response = await fetch(imageUrl);
  //       const blob = await response.blob();

  //       const fileExtensionArray = imageUrl.split('.');
  //       const fileExtension = fileExtensionArray[fileExtensionArray.length - 1];

  //       if (!fileExtension) {
  //         console.error('Invalid image URL:', imageUrl);
  //         return null;
  //       }
  //       const fileName = `imageFileName.${fileExtension}`;

  //       return new File([blob], fileName, { type: image/${fileExtension}});
  //     } catch (error) {
  //       console.error('Error converting image to File:', error);
  //       return null;
  //     }
  //   };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      //   const selectedFiles = Array.from(files);
      setSelectedImages(Array.from(files))
    }
  }
  const handleAddCraftedItem = async () => {
    try {
      setAddingCraftedItem(true)
      const formData = new FormData()
      const userProfileId = await getUserProfileId()
      if (!userProfileId) {
        console.error('User Profile Id is null or undefined')
        return
      }

      formData.append('sellerId', userProfileId)
      formData.append('title', newCraftedItem.title)
      formData.append('description', newCraftedItem.description)
      formData.append('price', String(newCraftedItem.price))
      formData.append('category', newCraftedItem.category)

      selectedImages.forEach((file) => {
        formData.append('images', file)
      })
      // console.log('FormData:', formData.getAll('images')); used for debugging

      const response = await axios.post('/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      //   console.log('Server Response:', response.data)

      if (response.status === 200 || response.status === 201) {
        const insertedCraftedItem = response.data
        setCraftedItems([...craftedItems, insertedCraftedItem])
        setNewCraftedItem({
          title: '',
          description: '',
          price: 0,
          images: [],
          category: '',
        })
        setSelectedImages([])
        setAddingCraftedItem(false)
        // console.log('Inserted crafted item:', insertedCraftedItem);
      } else {
        throw new Error(`Failed to add crafted item: ${response.statusText}`)
      }
    } catch (error: any) {
      console.error('Error adding crafted item:', error)
      //   throw new Error(Error adding crafted item: ${error.message})
    }
  }

  const getUserProfileId = (): Promise<string | null> => {
    return new Promise((resolve) => {
      const userProfileId = localStorage.getItem('sellerId')
      resolve(userProfileId)
    })
  }

  const handleStoryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // const selectedFiles = Array.from(files);
      setSelectedImages(Array.from(files))
    }
  }
  const handleAddStory = async () => {
    try {
      setAddingNewStory(true)

      const formData = new FormData()
      const userProfileId = await getUserProfileId()
      if (!userProfileId) {
        console.error('User Profile Id is null or undefined')
        return
      }

      formData.append('sellerId', userProfileId)
      formData.append('storyTitle', newStory.storyTitle)
      formData.append('storyContent', newStory.storyContent)
      selectedImages.forEach((file) => {
        formData.append('images', file)
      })

      const response = await axios.post('/api/stories', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      // console.log('Server Response:', response.data)

      if (response.status === 200 || response.status === 201) {
        const insertedStories = response.data
        setStories([...stories, insertedStories])
        setNewStory({
          storyTitle: '',
          storyContent: '',
          images: [],
        })
        setSelectedImages([])
        setAddingNewStory(false)
        // console.log('Inserted crafted item:', insertedCraftedItem);
      } else {
        throw new Error(`Failed to add crafted item: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error adding story:', error)
    }
  }

  if (loading) {
    return <div className="animate-pulse">Loading seller information...</div>
  }

  return (
    <div className="max-w-4xl mx-auto py-8 m-[128px]">
      <h1 className="text-3xl font-bold mb-4">Seller Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">Basic Information</h2>
        <Image
          width={100}
          height={100}
          src={seller?.profile?.storeImage}
          alt="Seller Profile Image"
        />
        <p>Store Name: {seller?.profile?.storeName}</p>
        <p>Bio: {seller?.profile?.bio}</p>
        <p>Location: {seller?.profile?.location}</p>
        <p>Email: {seller?.profile?.contactInfo?.email}</p>
        <p>Phone: {seller?.profile?.contactInfo?.phone}</p>
        <h3 className="text-lg font-bold mt-2">Social Media</h3>
        <p>Twitter: {seller?.profile?.contactInfo?.socialMedia?.twitter}</p>
        <p>Facebook: {seller?.profile?.contactInfo?.socialMedia?.facebook}</p>
        <p>Instagram: {seller?.profile?.contactInfo?.socialMedia?.instagram}</p>
        <h3 className="text-lg font-bold mt-2">Specialties:</h3>
        <ul className="list-disc pl-5">
          {seller?.profile?.specialties.map((specialty, index) => (
            <li key={index}>{specialty}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">Sell Crafted Items</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleAddCraftedItem()
          }}
          className="flex flex-col space-y-4"
        >
          <p className="text-2xl animate-pulse">All fields are required</p>
          <div className="flex flex-wrap items-center justify-center bg-gray-200 p-5 space-x-2">
            <label htmlFor="title" className="text-gray-700">
              Title
              <input
                required
                type="text"
                id="title"
                value={newCraftedItem.title}
                onChange={(e) =>
                  setNewCraftedItem({
                    ...newCraftedItem,
                    title: e.target.value,
                  })
                }
                className="border-2 border-gray-400 p-2"
              />
            </label>
            <label htmlFor="description" className="text-gray-700">
              Description
              <input
                type="text"
                id="description"
                required
                value={newCraftedItem.description}
                onChange={(e) =>
                  setNewCraftedItem({
                    ...newCraftedItem,
                    description: e.target.value,
                  })
                }
                name="description"
                className="border-2 border-gray-400 p-2"
              />
            </label>
            <label htmlFor="price" className="text-gray-700">
              Price in $
              <input
                type="number"
                id="price"
                required
                value={newCraftedItem.price}
                onChange={(e) =>
                  setNewCraftedItem({
                    ...newCraftedItem,
                    price: parseFloat(e.target.value),
                  })
                }
                className="border-2 border-gray-400 p-2"
              />
            </label>
            <label htmlFor="images" className="text-gray-700">
              Add Image(s)
              <input
                type="file"
                id="images"
                required
                onChange={handleImageChange}
                multiple
                className="border-2 border-gray-400 p-2"
              />
            </label>
            <label htmlFor="category" className="text-gray-700">
              Category
              <select
                id="category"
                required
                value={newCraftedItem.category || 'default'}
                onChange={(e) =>
                  setNewCraftedItem({
                    ...newCraftedItem,
                    category: e.target.value,
                  })
                }
                className="border-2 border-gray-400 p-2"
              >
                <option value="default" disabled>
                  Choose Category
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            className="bg-black text-white p-3"
            type="submit"
            disabled={addingCraftedItem}
          >
            {addingCraftedItem ? 'Adding...' : 'Add Crafted Item'}
          </button>
        </form>
        <ul className="space-y-4 grid grid-cols-3">
          {loadingItems ? (
            <li className="border-b border-gray-300 pb-4 animate-pulse">
              Loading Crafted Item if any...
            </li>
          ) : // Render crafted items or no items found based on the condition
          craftedItems && craftedItems.length > 0 ? (
            craftedItems.map((item, index) => (
              <li key={index} className="border-b border-gray-300 pb-4">
                <p>Title: {item.title}</p>
                <p>Description: {item.description}</p>
                <p>Price: ${item.price}</p>
                <p>Category: {item.category}</p>
                <div>
                  <p>Images:</p>
                  <div className="relative">
                    <div className="max-w-full overflow-hidden">
                      <Image
                        width={100}
                        height={100}
                        className="w-[700px] h-[200px]"
                        src={item.images[currentImageIndex[index] || 0]}
                        alt={`Crafted Item ${index + 1}`}
                      />
                    </div>
                    {item.images.length > 1 && (
                      <button
                        className="absolute bottom-0 right-0 bg-gray-800 bg-highlight p-3 rounded-[10px] text-black px-2 py-1"
                        onClick={() =>
                          handleNextImage(index, item.images.length)
                        }
                      >
                        Next Image
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li>No crafted items found</li>
          )}
        </ul>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleAddStory()
          }}
        >
          <h2 className="text-xl font-bold mb-2">Stories</h2>
          <div>
            <label className="block mb-2">
              Story Title:
              <input
                className="border border-gray-300 rounded-md p-2 w-full"
                type="text"
                value={newStory.storyTitle}
                required
                onChange={(e) =>
                  setNewStory({ ...newStory, storyTitle: e.target.value })
                }
                placeholder="Enter Story Title"
              />
            </label>
            <label className="block mb-2">
              Story Content:
              <input
                className="border border-gray-300 rounded-md p-2 w-full"
                type="text"
                value={newStory.storyContent}
                onChange={(e) =>
                  setNewStory({ ...newStory, storyContent: e.target.value })
                }
                placeholder="Enter Story Content"
                required
              />
            </label>
            <label htmlFor="images" className="block mb-2">
              Add Image(s):
              <input
                className="mb-2"
                id="images"
                type="file"
                onChange={handleStoryImageChange}
                multiple
                required
              />
            </label>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-black bg-success font-bold py-2 px-4 rounded"
              type="submit"
              disabled={addingNewStory}
            >
              {' '}
              {addingNewStory ? 'Adding Story...' : 'Add Story'}
            </button>
          </div>
        </form>
        {stories ? (
          <ul>
            {loadingItems ? (
              <li className="border-b border-gray-300 pb-4 animate-pulse">
                Loading Stories...
              </li>
            ) : Array.isArray(stories) && stories.length > 0 ? (
              stories.map((story, index) => (
                <li key={index} className="border-t border-gray-300 pt-4 mt-4">
                  <h3 className="text-lg font-bold mb-2">{story.storyTitle}</h3>
                  <p className="mb-2">{story.storyContent}</p>
                  <div className="flex">
                    {story.images && story.images.length > 0 ? (
                      story.images.map((image: string, imageIndex: number) => (
                        <Image
                          width={100}
                          height={100}
                          key={imageIndex}
                          className="w-12 h-12 object-cover rounded-full mr-2"
                          src={image}
                          alt={`Story Image ${imageIndex + 1}`}
                        />
                      ))
                    ) : (
                      <p>No images available</p>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li>No stories found</li>
            )}
          </ul>
        ) : (
          <p>Loading stories...</p>
        )}
      </div>
    </div>
  )
}

export default SellerProfile
