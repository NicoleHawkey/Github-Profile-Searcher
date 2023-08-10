import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import SearchSection from './components/SearchSection/SearchSection';
import Profile from './components/Profile/Profile';
import { Octokit } from "octokit";

const apiKey = process.env.REACT_APP_API_KEY;
const octokit = new Octokit({ auth: apiKey });

class App extends Component {
  constructor() {
    super()
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.toggleTheme = this.toggleTheme.bind(this);
    this.state = {
      searchfield: '',
      user: {},
      error: null,
      showProfile: false,
      theme: savedTheme,
    }
  }

  componentDidMount() {
    document.body.className = this.state.theme;
    this.toggleTheme();
 }

  toggleTheme = () => {
    this.setState(prevState => {
      const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
      document.body.className = newTheme;
      localStorage.setItem('theme', newTheme)
      return { theme: newTheme };
    });
  }
 
  onInputChange = (event) => {
    const inputValue = event.target.value;
    let errorMessage = null;
    if (inputValue.trim().includes(' ')) {
      errorMessage = "Invalid GitHub username. Please ensure there are no spaces.";
    }

    this.setState({ searchfield: inputValue, error: errorMessage });
  }

  onSubmitSearch = async () => {
    const name = this.state.searchfield;
    if (this.state.error) {
      return;
    }
    try {
      const userData = await octokit.request(`GET /users/${name}`, {
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });
      const reposData = await octokit.request(`GET /users/${name}/repos`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    this.setState({
      user: {
        profile: userData.data,
        repos: reposData.data
      },
      showProfile: true,
      error: null
    });
  } catch (error) {
      this.setState({
      error: "Ooops! Looks like there is no such user.",
      showProfile: false
    })
  }
}

  render() {
    const { error, showProfile, theme } = this.state;

    return (
      <div className="App">
        <Navigation theme={theme} toggleTheme={this.toggleTheme} />
        <SearchSection 
          onInputChange={this.onInputChange} 
          onSubmitSearch={this.onSubmitSearch}
          searchfield={this.state.searchfield}
        />
        {error && <div>{error}</div>}
        {showProfile && <Profile user={this.state.user}/>}
     </div>
    );
  }
}

export default App;

// Functional Components