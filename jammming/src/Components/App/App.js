import React, { useState } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from '../SearchResults/SearchResults';
import './App.css';
import PlayList from '../PlayList/PlayList';
import { Spotify } from '../../util/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playListName, setPlayListName] = useState("New Playlist");
  const [playListTracks, setPlayListTracks] = useState([]);

  function addTrack(track){
    if (playListTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    setPlayListTracks(prevTracks => [...prevTracks, track]);
  }

  function removeTrack(track) {
    setPlayListTracks(prevTracks => prevTracks.filter(currentTrack => currentTrack.id !== track.id));
  }

  function updatePlayListName(name) {
    setPlayListName(name);
  }

  function savePlayList() {
    const trackUris = playListTracks.map(track => track.uri);
    Spotify.savePlayListName(playListName, trackUris).then(() => {
      setPlayListName("New Playlist");
      setPlayListTracks([]);
    });
  }

  function search(term) {
    Spotify.search(term).then(searchResults => {
      setSearchResults(searchResults);
    });
  }

  return (
    <div>
      <h1>
        Welcome to Ja<span className='highlight'>mmm</span>ing
      </h1>
      <div className='App'>
        {/* Add a Search Bar */}
        <SearchBar onSearch={search}/>

        <div className='App-playlist'>
          {/* Add Search Results  */}
          <SearchResults 
          searchResults={searchResults} 
          onAdd={addTrack} 
          />

          {/* Add a Playlist component */}
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

export default App;
