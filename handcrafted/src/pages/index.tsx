import '@fortawesome/fontawesome-free/css/all.min.css'
import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import FeaturedArtisans from '@/components/FeaturedArtisans'
import Testimonials from '@/components/Testimonials'
import React from 'react'

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <FeaturedArtisans />
      <Testimonials />
    </Layout>
  )
}
