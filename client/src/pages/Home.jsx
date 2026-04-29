import React from 'react'
import BannerHome from '../components/BannerHome'
import CatagoriesHome from '../components/CatagoriesHome'
import ComingSoonPage from '../components/ComingSoonPage'
import FashionPage from '../components/FashionPage'

const Home = () => {
  return (
    <div>
      <BannerHome />
      <CatagoriesHome />
      <ComingSoonPage />
      <FashionPage />
    </div>
  )
}

export default Home
