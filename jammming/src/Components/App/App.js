// Import necessary libraries and components
import React, { useState } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from '../SearchResults/SearchResults';
import './App.css';
import PlayList from '../PlayList/PlayList';
import { Spotify } from '../../util/Spotify';

// Define the main App component
function App() {
  // Define state variables
  const [searchResults, setSearchResults] = useState([]);
  const [playListName, setPlayListName] = useState("New Playlist");
  const [playListTracks, setPlayListTracks] = useState([]);

  // Function to add a track to the playlist
  function addTrack(track){
    if (playListTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    setPlayListTracks(prevTracks => [...prevTracks, track]);
  }

  // Function to remove a track from the playlist
  function removeTrack(track) {
    setPlayListTracks(prevTracks => prevTracks.filter(currentTrack => currentTrack.id !== track.id));
  }

  // Function to update the name of the playlist
  function updatePlayListName(name) {
    setPlayListName(name);
  }

  // Function to save the playlist
  function savePlayList() {
    const trackUris = playListTracks.map(track => track.uri);
    Spotify.savePlayListName(playListName, trackUris).then(() => {
      setPlayListName("New Playlist");
      setPlayListTracks([]);
    });
  }

  // Function to search for tracks
  function search(term) {
    Spotify.search(term).then(searchResults => {
      setSearchResults(searchResults);
    });
  }

  // Render the App component
  return (
    <div>
      <h1>
        Welcome to Ja<span className='highlight'>mmm</span>ing
      </h1>
      <div className='App'>
        
        {/* Add a Search Bar */}
        <SearchBar onSearch={search}/>

        <div className='App-playlist'>

          {/* Add Search Results List  */}
          <SearchResults 
          searchResults={searchResults} 
          onAdd={addTrack} 
          />

          {/* Add/ Remove Songs to a Playlist */}
          <PlayList 
          playListName={playListName} 
          playListTracks={playListTracks} 
          onRemove={removeTrack} 
          onNameChange={updatePlayListName}
          onSave={savePlayList} 
          />

        </div>
      </div>
    </div>
  );
}

// Export the App component
export default App;
