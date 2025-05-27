import React from 'react'
import Hero from '../Component/Hero'
import Shipping from '../Component/Shipping';

function Home() {
    console.log("Home component loaded");
  return (
    <>
    <Hero slug={"home"} />
    <Shipping />
    </>
  )
}

export default Home
