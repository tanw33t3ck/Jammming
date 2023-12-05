// Import necessary libraries and components
import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

// Define the TrackList component
function TrackList(props) {
    
   // Render the TrackList component
    return (
       <div className="TrackList">
        
        {/* Map each track in the tracks prop to a Track component */}
        {props.tracks.map(song => {
           return <Track 
           key={song.id} 
           track={song} 
           onAdd={props.onAdd} 
           onRemove={props.onRemove} 
           isRemoval={props.isRemoval} 
           />;
           
        })}
       
       </div>
    );
}

// Export the TrackList component
export default TrackList;
