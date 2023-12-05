import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar(props) {
  const [term, setTerm] = useState("");

  function searchTerm() {
    props.onSearch(term);
  }

  function handleTermChange(event) {
    setTerm(event.target.value);
  }

  return (
    <div className="SearchBar">
      <input placeholder="Enter a Song, Album or Artist" onChange={handleTermChange} />
      <button className="SearchButton" onClick={searchTerm}>SEARCH</button>
    </div>
  );
}

export default SearchBar;