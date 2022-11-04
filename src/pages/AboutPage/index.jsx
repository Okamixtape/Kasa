import React, { Component } from "react";
import Header from "../../components/Header";
import About from "../../components/About";

export class AboutPage extends Component {
    render() {
        return (
            <div className="kasa__wrapper">
                <Header />
                <About />
            </div>
        );
    }
}

export default AboutPage;