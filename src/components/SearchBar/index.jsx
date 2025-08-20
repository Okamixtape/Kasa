import React, { useState } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import './style.scss';

const SearchBar = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchValue(value);
        onSearch(value);
    };

    const handleClear = () => {
        setSearchValue('');
        onSearch('');
    };

    return (
        <div className="search-bar">
            <SearchIcon className="search-bar__icon" />
            <input
                type="text"
                className="search-bar__input"
                placeholder="Rechercher une location..."
                value={searchValue}
                onChange={handleChange}
            />
            {searchValue && (
                <button type="button" className="search-bar__clear-button" onClick={handleClear}>
                    &times;
                </button>
            )}
        </div>
    );
};

export default SearchBar;