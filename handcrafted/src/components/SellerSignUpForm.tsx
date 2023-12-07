import { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

interface FormValues {
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

export default function SellerSignUpForm() {
  const router = useRouter()
  const { sellerId } = router.query
  const [formData, setFormData] = useState<FormValues>({
    profile: {
      bio: '',
      location: '',
      contactInfo: {
        email: '',
        phone: '',
        socialMedia: {
          twitter: '',
          facebook: '',
          instagram: '',
        },
      },
      specialties: [],
      storeName: '',
      storeImage: '',
    },
  })

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      profile: {
        ...prevFormData.profile,
        [name]: value,
      },
    }))
  }

  const handleChangeContactInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      profile: {
        ...prevFormData.profile,
        contactInfo: {
          ...prevFormData.profile.contactInfo,
          [name]: value,
        },
      },
    }))
  }

  const handleChangeSocialMedia = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      profile: {
        ...prevFormData.profile,
        contactInfo: {
          ...prevFormData.profile.contactInfo,
          socialMedia: {
            ...prevFormData.profile.contactInfo.socialMedia,
            [name]: value,
          },
        },
      },
    }))
  }

  const handleChangeSpecialties = (e: ChangeEvent<HTMLInputElement>) => {
    const specialtiesArray = e.target.value
      .split(',')
      .map((specialty: string) => specialty.trim())
    setFormData((prevFormData) => ({
      ...prevFormData,
      profile: {
        ...prevFormData.profile,
        specialties: specialtiesArray,
      },
    }))
  }
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          profile: {
            ...prevFormData.profile,
            storeImage: reader.result as string,
          },
        }))
      }
      reader.readAsDataURL(file)
    }
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // console.log('Data being sent to backend:', formData)
      const response = await axios.post('/api/seller', formData)
      // console.log('Seller created:', response.data)
      setSuccessMessage('Seller sign-up successful!')
      setErrorMessage('')

      if (response.status === 201 && response.data?.sellerId) {
        setSuccessMessage('Seller sign-up successful!')
        setErrorMessage('')
        const { sellerId } = response.data

        localStorage.setItem('sellerId', sellerId)

        // Redirect to the user's profile page upon successful signup
        router.push(`/seller/${sellerId}`)
      } else {
        throw new Error('Failed to create seller')
      }
    } catch (error: any) {
      console.error('Error creating seller:', error)
      console.log('Server response:', error.response) // Log the server response
      setSuccessMessage('') // Clear success message on error

      if (error.response?.data?.error) {
        setErrorMessage('Error creating seller: ' + error.response.data.error)
      } else {
        setErrorMessage(
          'Error creating seller. Please try again: ' +
            (error.message || 'Unknown error'),
        )
      }
    }
  }

  return (
    <section className="m-[125px]">
      <h1 className="text-2xl font-bold ">Seller Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-4 bg-gray-100 shadow-md rounded-lg"
      >
        <input
          type="text"
          name="storeName"
          value={formData.profile.storeName}
          onChange={handleChange}
          placeholder="Store Name"
          className="appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 
      leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="text"
          name="bio"
          value={formData.profile.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700
         leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="text"
          name="location"
          value={formData.profile.location}
          onChange={handleChange}
          placeholder="Location"
          className="appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 
        leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="email"
          name="email"
          value={formData.profile.contactInfo.email}
          onChange={handleChangeContactInfo}
          placeholder="Email"
          className="appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700
         leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="tel"
          name="phone"
          value={formData.profile.contactInfo.phone}
          onChange={handleChangeContactInfo}
          placeholder="Phone"
          className="appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 
        leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="text"
          name="twitter"
          value={formData.profile.contactInfo.socialMedia.twitter}
          onChange={handleChangeSocialMedia}
          placeholder="https://twitter.com/uncleTee_1"
          className="appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 
        leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="text"
          name="facebook"
          value={formData.profile.contactInfo.socialMedia.facebook}
          onChange={handleChangeSocialMedia}
          placeholder="https://www.facebook.com/thankgod.andrew663?mibextid=ZbWKwL"
          className="appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 
        leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="text"
          name="instagram"
          value={formData.profile.contactInfo.socialMedia.instagram}
          onChange={handleChangeSocialMedia}
          placeholder="Instagram URL"
          className="appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 
        leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="text"
          name="specialties"
          value={formData.profile.specialties.join(',')}
          onChange={handleChangeSpecialties}
          placeholder="Specialties (Separate by comma)"
          className="appearance-none border rounded w-full py-2 px-3 mb-3 
          text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 
            leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-primary font-bold py-2 px-4 rounded 
          focus:outline-none focus:shadow-outline"
        >
          Sign Up
        </button>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </section>
  )
}
