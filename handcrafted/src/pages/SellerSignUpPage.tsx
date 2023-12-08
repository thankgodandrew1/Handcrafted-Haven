import SellerSignUpForm from '@/components/SellerSignUpForm'
import Layout from '@/components/Layout'
import Head from 'next/head'

export const siteTitle = 'Seller Registration | HandCrafted Haven'

const SellerSignUpPage = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="flex items-center justify-center ">
        <SellerSignUpForm />
      </div>
    </Layout>
  )
}

export default SellerSignUpPage
