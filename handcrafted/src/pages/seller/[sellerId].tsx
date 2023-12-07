import SellerProfile from '@/components/SellerProfile'
import Layout from '@/components/Layout'
import Head from 'next/head'

export const siteTitle = 'Seller Profile | HandCrafted Haven'

export default function SellerSignUpPage() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="flex items-center justify-center ">
        <SellerProfile />
      </div>
    </Layout>
  )
}
