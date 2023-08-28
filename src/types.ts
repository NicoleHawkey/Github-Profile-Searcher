export interface Repo {
    id: number;
    html_url: string;
    name: string;
    stargazers_count: number;
    forks_count: number;
  }
  
  export interface UserProfile {
    avatar_url: string;
    name?: string;
    login: string;
    followers: number;
    public_repos: number;
  }
  
  export interface User {
    profile?: UserProfile;
    repos?: Repo[];
  }