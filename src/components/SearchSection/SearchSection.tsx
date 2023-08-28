import React, { ChangeEvent, KeyboardEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./SearchSection.css";

interface SearchSectionProps {
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmitSearch: () => void;
    searchfield: string;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onInputChange, onSubmitSearch, searchfield }) => {
    const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmitSearch();
        }
    }
    return (
        <div className='pa2'>
            <input 
                className='pa3 ba b--light-silver br2 br--left'
                type='search' 
                placeholder='Username'
                style={{borderRight: "none"}}
                onChange={onInputChange}
                value={searchfield}
                onKeyUp={handleKeyUp}
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