import "./style/main.scss";
import Header from "./components/Header";
import Error from "./components/Error";
import Footer from "./components/Footer";

function Kasa() {
    return (
        <div className="Kasa">
            <Header />
            <Error />
            <Footer />
        </div>
    );
}

export default Kasa;