import React from 'react'
import MyNavbar from './Navbar'; // Assuming you have a Navbar component
import Footer from './Footer'; // Assuming you have a Navbar component
import Carousel from './Carousel';
import ChoseUs from './ChoseUs';
import Pricing from './Pricing';
import Team from './Team'
const Home = () => {
  return (
    <div>
      <MyNavbar />
      <Carousel/>
      <ChoseUs/>
      <Pricing/>
      <Team/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Footer/>
    </div>

  )
}

export default Home