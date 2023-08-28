import React from "react";
import "./Toggle.css";

interface ToggleProps {
    toggleTheme: () => void;
    theme: string;
    className?: string;
}

const Toggle: React.FC<ToggleProps> = ({ toggleTheme, theme, className }) => {
        return (
            <div className={`${theme} theme-switch-wrapper ${className}`}>
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