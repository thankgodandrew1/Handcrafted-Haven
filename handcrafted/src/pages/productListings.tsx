import Layout from '@/components/Layout'
import ProductListings from '@/components/Listings'
import Head from 'next/head'
import { connectToDatabase } from '@/utils/db'

export const siteTitle = 'Product Listings | HandCrafted Haven'

interface ProductListing {
  id: number
  name: string
  description: string
  price: string
  imagePath: string
}

interface ProductListingPageProps {
  productlistings: ProductListing[]
}

export default function ProductListingPage({
  productlistings,
}: ProductListingPageProps) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <ProductListings productlistings={productlistings} />
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    const { COLLECTION_NAME } = process.env

    if (!COLLECTION_NAME) {
      throw new Error('COLLECTION_NAME not found in environment variables')
    }

    const db = await connectToDatabase()
    const collection = db.collection(COLLECTION_NAME)
    const productlistings = await collection.find({}).toArray()

    return {
      props: {
        productlistings: JSON.parse(JSON.stringify(productlistings)),
      },
    }
  } catch (error) {
    return {
      props: {
        productlistings: [],
      },
    }
  }
}
