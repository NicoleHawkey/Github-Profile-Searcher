import React, { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import SearchSection from './components/SearchSection/SearchSection';
import Profile from './components/Profile/Profile';
import { Octokit } from "octokit";

const apiKey = process.env.REACT_APP_API_KEY;
const octokit = new Octokit({ auth: apiKey });

function App() {
  const [searchfield, setSearchfield] = useState('');
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const savedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      document.body.className = newTheme;
      localStorage.setItem('theme', newTheme)
      setTheme(newTheme);
    }
  
  const onInputChange = (event) => {
      const inputValue = event.target.value;
      let errorMessage = null;
      if (inputValue.trim().includes(' ')) {
        errorMessage = "Invalid GitHub username. Please ensure there are no spaces.";
      }
      setSearchfield(inputValue);
      setError(errorMessage);
    }

  const onSubmitSearch = async () => {
      const name = searchfield;
      if (error) {
        return;
      }
      try {
        const userPromise = octokit.request(`GET /users/${name}`, {
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        const reposPromise = octokit.request(`GET /users/${name}/repos`, {
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
      });

      const [userData, reposData] = await Promise.all([userPromise, reposPromise]);

      setUser({
        profile: userData.data,
        repos: reposData.data
      });
      setShowProfile(true);
      setError(null);

    } catch (error) {
        setError("Ooops! Looks like there is no such user.");
        setShowProfile(false);
    }
}

    return (
      <div className="App">
        <Navigation theme={theme} toggleTheme={toggleTheme} />
        <SearchSection 
          onInputChange={onInputChange} 
          onSubmitSearch={onSubmitSearch}
          searchfield={searchfield}
        />
        {error && <div>{error}</div>}
        {showProfile && <Profile user={user}/>}
     </div>
    );
  }

export default App;
