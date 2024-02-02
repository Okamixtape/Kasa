import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Carousel from '../../components/Carousel';
import HouseCard from '../../components/HouseCard';
import Collapse from '../../components/Collapse';
import Footer from '../../components/Footer';

import data from '../../data/logements.json';
import ErrorPage from '../ErrorPage';

const HousePage = () => {
    const { id } = useParams();
    const houseData = data;
    const house = houseData.find((elt) => elt.id === id);

    if (!house) {
        return <ErrorPage />;
    }

    return (
        <div className="kasa__wrapper">
            <Header />
            <Carousel pictures={house.pictures} />
            <HouseCard
                key={house.id}
                title={house.title}
                location={house.location}
                tags={house.tags}
                rating={house.rating}
                host={house.host}
            />
            <div className="collapse__wrapper -housePage">
                <Collapse
                    key="Description"
                    title="Description"
                    text={house.description}
                />
                <Collapse
                    key="Équipements"
                    title="Équipements"
                    text={house.equipments.map((element) => (
                        <li className="collapse__list" key={element}>
                        {element}
                        </li>
                    ))}
                />
            </div>
            <Footer />
        </div>
    );
};

export default HousePage;
