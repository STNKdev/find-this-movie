import React, { useState } from 'react';


export const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (event) => {
    setSearchValue(event.target.value);
  };

  const resetInputField = () => {
    setSearchValue("")
  };

  const callSearchFunction = (event) => {
    event.preventDefault();
    props.search(searchValue);
    resetInputField();
  };

  return (
      <form className="search">
        <input
            value={searchValue}
            onChange={handleSearchInputChanges}
            type="text"
            placeholder="Введите название фильма на английском"
        />
        <input onClick={callSearchFunction} type="submit" value="НАЙТИ" />
      </form>
  );
};
