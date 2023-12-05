// Import necessary libraries and components
import React from "react";
import "./PlayList.css";
import TrackList from "../TrackList/TrackList";

// Define the PlayList component
function PlayList(props) {

    // Function to handle changes to the playlist name
    function handleNameChange(event) {
        props.onNameChange(event.target.value);
    }

    // Render the PlayList component
    return (
        <div className="PlayList">

            {/* Input field for the playlist name */}
            <input
                defaultValue={"New Playlist"}
                onChange={handleNameChange}
            />

            {/* TrackList component for the playlist tracks */}
            <TrackList
                tracks={props.playListTracks}
                onRemove={props.onRemove}
                isRemoval={true} />

            {/* Button to save the playlist */}
            <button className="PlayList-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>

        </div>
    );
}

// Export the PlayList component
export default PlayList;
