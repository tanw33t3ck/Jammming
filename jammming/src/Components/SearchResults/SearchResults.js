// Import necessary libraries and components
import React from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList"

// Define the SearchResults component
function SearchResults(props) {
    
    // Render the SearchResults component
    return (
        <div className="SearchResults">
            {/* Heading for the search results */}
            <h2>Results</h2>
            
            {/* TrackList component for the search results */}
            <TrackList tracks={props.searchResults} onAdd={props.onAdd} isRemoval={false} />

        </div>
    );
}

// Export the SearchResults component
export default SearchResults;
