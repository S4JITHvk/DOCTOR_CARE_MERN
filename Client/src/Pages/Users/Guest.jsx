import React from "react";
import AboutUs from "../../components/Guest/About";
import Landing from "../../components/Guest/Landing/Landing";
import Footer from "../../components/Guest/Footer";
import Header from "../../components/Guest/Header";
import Features from "../../components/Home/Features"
import Faq from "../../components/Guest/Faq/Faq"
function Guest() {
  return (
    <>
      <Header />
      <Landing />
      <AboutUs />
      <Faq />
      <Features/>
      <Footer />
    </>
  );
}

export default Guest;
