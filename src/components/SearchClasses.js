"use client";

import { useState } from "react";

const SearchClasses = ({element}) => {
  const [searchIndex, setSearchIndex] = useState(-1);
  const handleChange = (value) => {
    const searchText = value.toLowerCase();
    const elements = document.querySelectorAll(element);
    let found = false;
    elements.forEach((element, index) => {
      if (
        searchText !== "" &&
        element.textContent.toLowerCase().includes(searchText)
      ) {
        if (!found) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          setSearchIndex(index);
          found = true;
        }
        element.style.backgroundColor = "rgb(0, 255, 162)";
        element.style.color = "black";
      } else {
        element.style.color = "";
        element.style.backgroundColor = "";
      }
    });
    // setInstitutes(allInstitutes.filter(inst => inst.name.toLowerCase().includes(value.toLowerCase())));
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        margin: "10px 0",
        justifyContent: "center",
      }}
    >
      <input
        style={{
          padding: "5px 10px",
          borderRadius: "5px",
          border: "none",
          boxShadow: "0 0 5px white",
        }}
        type="text"
        placeholder="Search for anything"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchClasses;
