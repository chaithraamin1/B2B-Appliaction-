import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import AppDownload from '../../components/AppDownload/AppDownload'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay'

const Home = () => {
const [category,setCategory] = useState("All")
  
  
  return (
    <>
      <Header/>
      {/* <ExploreMenu setCategory={setCategory} category={category}/> */}
      <ProductDisplay category={category}/>
      <AppDownload/>
    </>
  )
}

export default Home
