import React from 'react';
import './_equipment-list.scss';

const EquipmentList = ({ equipments }) => {
    if (!equipments || equipments.length === 0) {
        return <p>Aucun équipement listé.</p>;
    }

    return (
        <ul className="equipment-list">
            {equipments.map((equipment, index) => (
                <li key={index} className="equipment-list__item">
                    {equipment}
                </li>
            ))}
        </ul>
    );
};

export default EquipmentList;
