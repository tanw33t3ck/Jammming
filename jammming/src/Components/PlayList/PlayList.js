import React from "react";
import "./PlayList.css";
import TrackList from "../TrackList/TrackList";

function PlayList(props) {

    function handleNameChange(event) {
        props.onNameChange(event.target.value);
    }

    return (
        <div className="PlayList">

            <input
                defaultValue={"New Playlist"}
                onChange={handleNameChange}
            />

            <TrackList
                tracks={props.playListTracks}
                onRemove={props.onRemove}
                isRemoval={true} />

            <button className="PlayList-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>

        </div>
    );
}

export default PlayList;
