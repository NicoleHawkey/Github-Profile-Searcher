import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./SearchSection.css";

const SearchSection = ({ onInputChange, onSubmitSearch, searchfield }) => {
    return (
        <div className='pa2'>
            <input 
                className='pa3 ba b--light-silver br2 br--left'
                type='search' 
                placeholder='Username'
                style={{borderRight: "none"}}
                onChange={onInputChange}
                value={searchfield}
            />
            <button 
                className='searchButton pa3 ba b--light-silver br2 br--right' 
                style={{minWidth: "50px", borderLeft: "none"}}
                onClick={onSubmitSearch}
            >
                <FontAwesomeIcon className="searchIcon" icon={faSearch} style={{color: "#000000"}}/>
            </button>
        </div>
    );
};

export default SearchSection;