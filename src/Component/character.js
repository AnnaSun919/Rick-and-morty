import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";
import axios from "axios";
import Backdrop from "./Backdrop/Backdrop";
import { API_URL } from "../config";
import "bootstrap/dist/css/bootstrap.min.css";
import SingleCharater from "./singleCharater";

function Character() {
  let [totalPage, setTotalPage] = useState(null);
  let [totalCharacter, setTotalCharacter] = useState(null);
  // let [page, setPage] = useState(1);
  let [APIpage, setAPIPage] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [characterNo, setCharacterNo] = useState(null);
  const [tenItems, setTenItems] = useState(null);
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
              console.log("date searchin");
              dataArray = response.data.results.filter((elem) => {
                return (
                  serachItem["startDate"] <= elem.created &&
                  elem.created <= serachItem["endDate"]
                );
              });
              // if (dataArray.length === 0) {
              //   setAPIPage((APIpage += 1));
              // }
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
    } catch (err) {
      console.log("grap no info");
    }
  }, [serachItem, APIpage, totalPage, totalCharacter]);

  // function changePage(event, direction) {
  //   event.preventDefault();

  //   if (direction === "before" && page > 1) {
  //     setPage((page -= 1));

  //     if (page % 2 !== 0) {
  //       setAPIPage((APIpage -= 1));
  //     }
  //   } else if (direction === "after" && totalPage > page) {
  //     setPage((page += 1));

  //     if (page % 2 !== 0) {
  //       setAPIPage((APIpage += 1));
  //     }
  //   }
  //   return true;
  // }

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

    if (show === "close") {
      setShowDetail(false);
    } else {
      setCharacterNo(number);
      setShowDetail(true);
    }
  };

  const pageHandler = () => {
    //for items adjust to 10 ,, more than ten then put it to next page and dun render on the page and grap more info,,
    // for items more than 10 ,, wait till next part //
    // now no date filter will always = 20
    // with date filter will grap all info
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
        <label>Date : Created from </label>
        <input placeholder="Filter Status" name="startDate" type="date" />
        to
        <input placeholder="Filter Status" name="endDate" type="date" />
        <button type="submit">Submit</button>
      </form>
      <div className="character_container">
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
                  <br />
                  <span>{element.species}</span>
                  <br />
                  <span>{element.status}</span>
                  <br />
                  <span>{element.created.slice(0, 10)}</span>
                  <br />
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
      {/* <Button onClick={(e) => changePage(e, "before")}>-</Button>
      <span>{page}</span>
      <Button onClick={(e) => changePage(e, "after")}>+</Button> */}
    </>
  );
}
export default Character;
