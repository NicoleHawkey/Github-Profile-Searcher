import React from "react";
import "./Profile.css";

const Profile = ({ user }) => {
    const { profile, repos } = user;
    return (
        <div className="container">
            <img 
                alt='avatar' 
                src={profile?.avatar_url || 'https://booleanstrings.com/wp-content/uploads/2021/10/profile-picture-circle-hd.png'}
                className="avatarImage br-100"/>
            <div className="info">
                <h2>{profile?.name || profile?.login}</h2>
                <p>Username: {profile?.login}</p>
                <p>Followers: {profile?.followers}</p>
                <p>Repository Count: {profile?.public_repos}</p>
            </div>
            <div className="repo-container">
                <p>Top repositories based on forks and stars:</p>
                <ul>
                {repos?.slice(0, 4).map(repo => (
                    <li key={repo.id}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.name} - Stars: {repo.stargazers_count} Forks: {repo.forks_count}
                        </a>
                    </li> 
                ))}
                </ul>
            </div>
        </div> 
    );
};

export default Profile;