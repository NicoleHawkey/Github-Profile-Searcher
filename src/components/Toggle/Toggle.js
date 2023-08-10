import React from "react";
import "./Toggle.css";

const Toggle = ({ toggleTheme, theme }) => {
        return (
            <div className={`${theme} theme-switch-wrapper`}>
                <label className="theme-switch">
                    <input 
                        type="checkbox" 
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        />
                    <div className="slider round"></div>
                </label>
            </div>
        )
}

export default Toggle;