// Import necessary libraries
import React from "react";
import "./Track.css";

// Define the Track component
function Track(props) {
    
    // Function to render the add or remove button
    function renderAction() {
        if (props.isRemoval){
            // If the track can be removed, render a remove button
            return <button className="Track-action" onClick={removeTrack}>-</button>
        } else {
            // If the track can be added, render an add button
            return <button className="Track-action" onClick={addTrack}>+</button>
        }
    }

    // Function to add the track
    function addTrack(){
        props.onAdd(props.track);
    }

    // Function to remove the track
    function removeTrack(){
        props.onRemove(props.track);
    }

    // Render the Track component
    return (
       <div className="Track">
        {/* Display the track information */}
        <div className="Track-information">
            <h3>{props.track.name}</h3>
            <p>{props.track.artist} | {props.track.album}</p>
        </div>
        {/* Display the add or remove button */}
        {renderAction()}
       </div>
    );
}

// Export the Track component
export default Track;
