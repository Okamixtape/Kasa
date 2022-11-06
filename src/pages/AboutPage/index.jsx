import React, { Component } from "react";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import Collapse from "../../components/Collapse";
import Footer from "../../components/Footer";
import aboutData from "../../data/aboutItemsData.json";

export class AboutPage extends Component {
    render() {
        return (
            <div className="kasa__wrapper">
                <Header />
                <Banner banner="aboutBanner"/>
                <div className="collapse__wrapper">
                    {aboutData.map((aboutItem) => (
                        <Collapse key={aboutItem.title} title={aboutItem.title} text={aboutItem.text} />
                    ))}
                </div>
                <Footer />
            </div>
        );
    }
}

export default AboutPage;