import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import "./chracter.css";

function Character() {
  let [totalPage, setTotalPage] = useState(null);
  let [page, setPage] = useState(1);
  const [character, setCharacter] = useState(null);
  let [serachItem, setSeachItem] = useState({
    species: "",
    status: "",
    name: "",
  });

  // const checkPage = () => {};

  useEffect(() => {
    try {
      async function getcharacter() {
        let response = await axios.get(`${API_URL}/character/?page=${page}`);
        if (serachItem) {
          if (
            serachItem["status"] ||
            serachItem["species"] ||
            serachItem["name"]
          ) {
            let searchValue = serachItem["species"];
            let searchValue1 = serachItem["status"];
            let searchValue2 = serachItem["name"];
            response = await axios.get(
              `${API_URL}/character/?page=${page}&status=${searchValue1}&species=${searchValue}&name=${searchValue2}`
            );
          }
          // else if (serachItem["species"]) {
          //   searchValue = serachItem["species"];
          //   response = await axios.get(
          //     `${API_URL}/character/?page=${page}&species=${searchValue}`
          //   );
          // } else if (serachItem["status"]) {
          //   searchValue = serachItem["status"];
          //   response = await axios.get(
          //     `${API_URL}/character/?page=${page}&status=${searchValue}`
          //   );
          // } else if (serachItem["name"]) {
          //   searchValue = serachItem["name"];
          //   response = await axios.get(
          //     `${API_URL}/character/?page=${page}&name=${searchValue}`
          //   );
          // }
        }
        console.log(response.data.info.pages);
        setTotalPage(response.data.info.pages);
        setCharacter(response.data.results.slice(0, 10));
      }
      getcharacter();
    } catch (err) {}
  }, [page, serachItem]);

  function changePage(event, direction) {
    event.preventDefault();

    direction === "before" ? setPage((page -= 1)) : setPage((page += 1));
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
      Name
      <input
        placeholder="Filter Name"
        name="name"
        onChange={(e) => handleSearch(e, "name")}
      />
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
      <button onClick={(e) => changePage(e, "before")}>-</button>
      <span>{page}</span>
      <button onClick={(e) => changePage(e, "after")}>+</button>
    </>
  );
}

export default Character;
