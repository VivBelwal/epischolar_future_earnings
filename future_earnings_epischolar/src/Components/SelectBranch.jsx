import React, { useContext, useState } from 'react';
import './SelectComponent.css';
import { SelectContext } from '../Context/SelectContext';

const SelectBranch = () => {
    const {selectData, changeSelectData} = useContext(SelectContext); 

    const [selectedOption, setSelectedOption] = useState('Electrical & Electronics Engineering');
    const [showOptions, setShowOptions] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [borderColor, setBorderColor] = useState('initial');
    const [error, setError] = useState('');

    const options = [
        'Aerospace Engineering',
        'Biotechnology',
        'Chemical Engineering',
        'Civil Engineering',
        'Computer Science Engineering',
        'Electrical & Electronics Engineering',
       
        
    ];

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option) => {
        changeSelectData({
            ...selectData,
            Branch: option
        });
        setShowOptions(false);
        setBorderColor('pink');
        setError('');
    };

    const handleInputClick = () => {
        setShowOptions(!showOptions);
        setBorderColor('green');
    };

    const handleDeselect = () => {
        changeSelectData({
            ...selectData,
            Branch: ""
        });
        setBorderColor('red');
        setError('Please fill out this field');
    };

    return (
        <div className="select-container relative text-[16px] mb-[24px]">
            <label className="absolute bg-[#fff] z-[10] p-2 top-[-15px] left-[10px] text-[10px]">Target Branch</label>
            <div className="select-box" style={{ borderColor }} onClick={handleInputClick}>
                {selectData.Branch ? (
                    <div className="selected-option">
                        <p className='truncate'>

                        {selectData.Branch}
                        </p>
                        <button className="deselect-button" onClick={handleDeselect}>×</button>
                    </div>
                ) : (
                    <div className="placeholder">Select an option...</div>
                )}
                {showOptions && (
                    <div className="options-container">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                        {filteredOptions.map(option => (
                            <div
                                key={option}
                                className="option"
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default SelectBranch;
