import React from "react";
import Toggle from "../Toggle/Toggle";
import "./Navigation.css";

const Navigation = ({ toggleTheme, theme }) => (
    <div className="navigation">
        <nav>
            <h1>GitHub Profile Searcher</h1>
            <Toggle toggleTheme={toggleTheme} theme={theme} className={"toggle"}/>
        </nav>
    </div>
);

export default Navigation;