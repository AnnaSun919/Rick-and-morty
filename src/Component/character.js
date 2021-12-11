import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import "./chracter.css";

function Character() {
  let [page, setPage] = useState(1);
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    try {
      async function getcharacter() {
        let response = await axios.get(
          `${API_URL}/character/?page=${page}&status=alive`
        );
        // let response = await axios.get(`${API_URL}/character/?page=${page}`);
        setCharacter(response.data.results);
        console.log(response.data);
        // setPageInfo(response.data.info);
        // console.log(response.data.info);
      }
      getcharacter();
    } catch (err) {}
  }, [page]);

  function changePage() {
    setPage((page += 1));
  }

  const handleSearch = (event) => {
    console.log(event.target.value);
  };

  return (
    <>
      <h1>Character</h1>
      Species
      <input placeholder="Filter Species" onChange={handleSearch} />
      Status
      <input placeholder="Filter Status" />
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
