// Import necessary libraries
import React, { useState } from "react";
import "./SearchBar.css";

// Define the SearchBar component
function SearchBar(props) {
  
  // Define state variable for the search term
  const [term, setTerm] = useState("");

  // Function to handle the search
  function searchTerm() {
    props.onSearch(term);
  }

  // Function to handle changes to the search term
  function handleTermChange(event) {
    setTerm(event.target.value);
  }

  // Render the SearchBar component
  return (
    <div className="SearchBar">
      {/* Input field for the search term */}
      <input placeholder="Enter a Song, Album or Artist" onChange={handleTermChange} />
      
      {/* Button to perform the search */}
      <button className="SearchButton" onClick={searchTerm}>SEARCH</button>
    </div>
  );
}

// Export the SearchBar component
export default SearchBar;
