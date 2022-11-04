import React, { Component } from "react";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import Gallery from "../../components/Gallery";
import Footer from "../../components/Footer";

export class HomePage extends Component {
  render() {
    return (
      <div className="kasa__wrapper">
        <Header />
        <Banner />
        <Gallery />
        <Footer />
      </div>
    );
  }
}

export default HomePage;