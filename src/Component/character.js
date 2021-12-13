import React, { useState, useEffect } from "react";
import { Dropdown, Button } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../config";
import "./chracter.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Character() {
  let [totalPage, setTotalPage] = useState(null);
  let [page, setPage] = useState(1);
  let [APIpage, setAPIPage] = useState(1);
  let [n, setn] = useState(0);
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
        let response = await axios.get(`${API_URL}/character/?page=${APIpage}`);
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
              `${API_URL}/character/?page=${APIpage}&status=${searchValue1}&species=${searchValue}&name=${searchValue2}`
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
        console.log(response.data);
        setTotalPage(response.data.info.pages * 2);
        setCharacter(response.data.results);
      }

      getcharacter();
    } catch (err) {}
  }, [page, serachItem, APIpage]);

  console.log(character);

  function changePage(event, direction) {
    event.preventDefault();

    if (direction === "before" && page > 1) {
      setPage((page -= 1));

      if (page % 2 !== 0) {
        setAPIPage((APIpage -= 1));
      }
    } else if (direction === "after" && totalPage > page) {
      setPage((page += 1));

      if (page % 2 !== 0) {
        setAPIPage((APIpage += 1));
      }
    }
    return true;
  }

  const handleSearch = (event) => {
    const { value, name } = event.target;
    setSeachItem((state) => ({ ...state, [name]: value }));
  };

  const pageNo = (totalPage) => {
    const pageArr = [];
    for (let i = 0; i <= totalPage; i++) {
      pageArr.push(i);
    }
  };

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
          character.slice(n, n + 10).map((element, index) => (
            <>
              <div key={index} className="item">
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
      <Button onClick={(e) => changePage(e, "before")}>-</Button>
      <span>{page}</span>
      <Button onClick={(e) => changePage(e, "after")}>+</Button>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {APIpage}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">{APIpage}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default Character;
