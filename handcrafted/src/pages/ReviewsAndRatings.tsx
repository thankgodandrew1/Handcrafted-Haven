import Layout from "@/components/Layout"
import Head from "next/head"
import Ratings from "@/components/Ratings"

const siteTitle = "Reviews and Ratings | Hancrafted"
export default function ReviewsAndRatings () {
    return (
    <Layout>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <Ratings />
    </Layout>
    )
}