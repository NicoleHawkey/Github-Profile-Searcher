import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import SearchSection from './components/SearchSection/SearchSection';
import Profile from './components/Profile/Profile';
import { Octokit } from "octokit";

const apiKey = process.env.REACT_APP_API_KEY;

const octokit = new Octokit({ auth: apiKey });

class App extends Component {
  constructor() {
    super()
    this.state = {
      searchfield: '',
      user: {},
      error: null,
      showProfile: false,
    }
  }

  onInputChange = (event) => {
    this.setState({ searchfield: event.target.value });
  }

  onSubmitSearch = async () => {
    const name = this.state.searchfield;
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
    const { error, showProfile } = this.state;
    
    return (
      <div className="App">
        <Navigation />
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
// onChange = debounce instead of onClick