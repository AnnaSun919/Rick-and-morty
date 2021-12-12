import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import "./chracter.css";

function Character() {
  let [page, setPage] = useState(1);
  const [character, setCharacter] = useState(null);
  let [serachItem, setSeachItem] = useState({
    species: "",
    status: "",
    name: "",
  });

  useEffect(() => {
    try {
      async function getcharacter() {
        let response = await axios.get(`${API_URL}/character/?page=${page}`);
        if (serachItem) {
          let searchValue = Object.values(serachItem);

          if (serachItem["status"] && serachItem["species"]) {
            searchValue = serachItem["name"];
            console.log(serachItem["status"]);
            let searchValue1 = serachItem["status"];
            response = await axios.get(
              `${API_URL}/character/?page=${page}&status=${searchValue1}&species=${searchValue}`
            );
          } else if (serachItem["species"]) {
            searchValue = serachItem["species"];
            response = await axios.get(
              `${API_URL}/character/?page=${page}&species=${searchValue}`
            );
          } else if (serachItem["status"]) {
            searchValue = serachItem["status"];
            response = await axios.get(
              `${API_URL}/character/?page=${page}&status=${searchValue}`
            );
          }
        }

        setCharacter(response.data.results);
      }
      getcharacter();
    } catch (err) {}
  }, [page, serachItem]);

  function changePage() {
    setPage((page += 1));
  }

  const handleSearch = (event) => {
    const { value, name } = event.target;
    setSeachItem((state) => ({ ...state, [name]: value }));
  };

  console.log(serachItem);

  return (
    <>
      <h1>Character</h1>
      Species
      <input
        placeholder="Filter Species"
        name="species"
        onChange={(e) => handleSearch(e, "species")}
      />
      {/* Name
      <input
        placeholder="Filter Name"
        name="name"
        onChange={(e) => handleSearch(e, "name")}
      /> */}
      Status
      <input
        placeholder="Filter Status"
        name="status"
        onChange={(e) => handleSearch(e, "status")}
      />
      <grid>
        {character &&
          character.map((element) => (
            <>
              <div className="item">
                <a href={element.url}>
                  <img src={element.image} alt="img" />
                  <br />
                  <span>{element.name}</span>
                  <span>{element.species}</span>
                  <br />
                  <span>{element.status}</span>
                  <span>{element.created}</span>
                </a>
              </div>
            </>
          ))}
        {/* {pageInfo && (
          <>
            <span>{pageInfo.count}</span>
            <span>{pageInfo}</span>
          </>
        )} */}
      </grid>
      <button onClick={changePage}>{page}</button>
    </>
  );
}

export default Character;
