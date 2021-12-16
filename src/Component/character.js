import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";
import axios from "axios";
import Backdrop from "./Backdrop/Backdrop";
import { API_URL } from "../config";
import "./chracter.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SingleCharater from "./singleCharater";

function Character() {
  let [totalPage, setTotalPage] = useState(null);
  let [totalCharacter, setTotalCharacter] = useState(null);
  let [page, setPage] = useState(1);
  let [APIpage, setAPIPage] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [characterNo, setCharacterNo] = useState(null);

  const [character, setCharacter] = useState(null);
  let [serachItem, setSeachItem] = useState(null);
  const [pageNoArr, setPageNoArr] = useState([]);

  // const checkPage = () => {};

  useEffect(() => {
    try {
      async function getcharacter() {
        let dataArray = [];
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
            if (serachItem["startDate"] && serachItem["endDate"]) {
              dataArray = response.data.results.filter((elem) => {
                return (
                  serachItem["startDate"] <= elem.created &&
                  elem.created <= serachItem["endDate"]
                );
              });
            }
          } else if (serachItem["startDate"] && serachItem["endDate"]) {
            let i = 1;

            while (totalCharacter > i) {
              let responseDate = await axios.get(`${API_URL}/character/${i}`);
              i++;
              if (
                serachItem["startDate"] <= responseDate.data.created &&
                responseDate.data.created <= serachItem["endDate"]
              ) {
                dataArray.push(responseDate.data);
              }
            }
          }
        }
        setCharacter(response.data.results);
        setTotalCharacter(response.data.info.count);
        setTotalPage(response.data.info.pages);
        if (dataArray.length !== 0) {
          setCharacter(dataArray);
        }
      }

      const pageNo = (totalPage) => {
        const pageArr = [];
        for (let i = 1; i <= totalPage; i++) {
          pageArr.push(i);
        }
        setPageNoArr(pageArr);
      };
      pageNo(totalPage);
      getcharacter();
    } catch (err) {}
  }, [page, serachItem, APIpage, totalPage, totalCharacter]);

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

  const handlePageSelertor = (e, elem) => {
    e.preventDefault();
    setAPIPage(elem);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const { species, name, status, startDate, endDate } = event.target;

    setSeachItem({
      species: species.value,
      name: name.value,
      status: status.value,
      startDate: startDate.value,
      endDate: endDate.value,
    });
  };

  const hanldDetails = (e, number, show) => {
    e.preventDefault();

    if (show == "close") {
      setShowDetail(false);
    } else {
      setCharacterNo(number);
      setShowDetail(true);
    }
  };

  const handleDateSearch = (start, end) => {
    let dataArray = [];
    // dataArray = character.filter((elem) => {
    //   return start <= elem.created && elem.created <= end;
    // });
    let i = 1;

    try {
      async function getDateCharacter() {
        while (totalCharacter > i) {
          let responseDate = await axios.get(`${API_URL}/character/${i}`);
          i++;
          if (
            start <= responseDate.data.created &&
            responseDate.data.created <= end
          ) {
            dataArray.push(responseDate.data);
          }
        }

        setCharacter(dataArray);
      }
      getDateCharacter();
    } catch (err) {
      console.log("Date Err");
    }
  };

  return (
    <>
      <h1>Rick && Morty =)</h1>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {APIpage} PAGE
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {pageNoArr.map((elem) => (
            <Dropdown.Item onClick={(e) => handlePageSelertor(e, elem)}>
              {elem} PAGE
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {/* Species
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
      /> */}
      <form onSubmit={handleSearch}>
        <label>Species</label>
        <input placeholder="Filter Species" name="species" />
        <label>Name</label>
        <input placeholder="Filter Name" name="name" />
        <label>Status</label>
        <input placeholder="Filter Status" name="status" />
        <label>Date</label>

        <input placeholder="Filter Status" name="startDate" type="date" />

        <input placeholder="Filter Status" name="endDate" type="date" />
        <button type="submit">Submit</button>
      </form>
      <div>
        {character &&
          character.slice(0, 10).map((element, index) => (
            <>
              <div
                key={index}
                className="item"
                component={Link}
                to={`/singleCharacter/${element.id}`}
              >
                <div href={`/singleCharater/${element.id}`}>
                  <img src={element.image} alt="img" />
                  <br />
                  <span>{element.name}</span>
                  <span>{element.species}</span>
                  <br />
                  <span>{element.status}</span>
                  <span>{element.created}</span>
                  <Button
                    onClick={(e) => {
                      hanldDetails(e, element.id, "open");
                    }}
                  >
                    Details
                  </Button>
                </div>
              </div>
            </>
          ))}
        {showDetail && <Backdrop />}
        {showDetail && (
          <SingleCharater
            characterNo={characterNo}
            onHandleDetails={hanldDetails}
          />
        )}
      </div>
      <Button onClick={(e) => changePage(e, "before")}>-</Button>
      <span>{page}</span>
      <Button onClick={(e) => changePage(e, "after")}>+</Button>
    </>
  );
}
export default Character;
