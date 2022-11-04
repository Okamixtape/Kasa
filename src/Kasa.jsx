import "./style/main.scss";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Error from "./components/Error";
import Footer from "./components/Footer";

function Kasa() {
    return (
        <div className="kasa__wrapper">
            <Header />
            <Banner />
            <Error />
            <Footer />
        </div>
    );
}

export default Kasa;