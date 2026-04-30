import React from 'react'
import BannerHome from '../components/BannerHome'
import CatagoriesHome from '../components/CatagoriesHome'
import ComingSoonPage from '../components/ComingSoonPage'
import FashionPage from '../components/FashionPage'
import Tesmonial from '../components/Tesmonial'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <BannerHome />
      <CatagoriesHome />
      <ComingSoonPage />
      <FashionPage />
      <Tesmonial />
      <Footer />
    </div>
  )
}

export default Home
