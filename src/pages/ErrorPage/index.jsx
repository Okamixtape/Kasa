import React, { Component } from "react";
import Header from "../../components/Header";
import Error from "../../components/Error";

export class ErrorPage extends Component {
    render() {
        return (
            <div className="kasa__wrapper">
                <Header />
                <Error />
            </div>
        );
    }
}

export default ErrorPage;