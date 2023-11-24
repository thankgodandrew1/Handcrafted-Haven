import '@fortawesome/fontawesome-free/css/all.min.css';
import Layout from '@/components/Layout';
import ProductListings from '@/components/Listings';
import Head from 'next/head';

export const siteTitle = 'Product Listings | HandCrafted Have';

export default function ProductListingPage() {
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <ProductListings />
        </Layout>
            
    )
}