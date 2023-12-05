import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

function TrackList(props) {
    return (
       <div className="TrackList">
        
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

export default TrackList;
