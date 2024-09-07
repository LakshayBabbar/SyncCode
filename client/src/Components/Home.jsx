import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";

const Home = () => {
  return (
    <> 
     <div className="w-full min-h-screen">

      <div className="px-16 py-2 ">
      <Navbar/>
      </div>
      <div className="py-16 px-12">
      <Hero/>
      </div>
   
     </div>
    </>
  );
};

export default Home;