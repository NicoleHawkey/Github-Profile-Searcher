import React from "react";
import Toggle from "../Toggle/Toggle";
import "./Navigation.css";

const Navigation = ({ toggleTheme, theme }) => (
    <div className="navigation">
        <nav>
            <h1>GitHub Profiles</h1>
            <Toggle toggleTheme={toggleTheme} theme={theme} />
        </nav>
    </div>
);

export default Navigation;