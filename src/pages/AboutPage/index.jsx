import React, { Component } from "react";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import About from "../../components/About";
import Footer from "../../components/Footer";

export class AboutPage extends Component {
    render() {
        return (
            <div className="kasa__wrapper">
                <Header />
                <Banner banner="aboutBanner"/>
                <About />
                <Footer />
            </div>
        );
    }
}

export default AboutPage;