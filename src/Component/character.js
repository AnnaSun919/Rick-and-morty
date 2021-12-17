import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import Backdrop from "./Backdrop/Backdrop";
import { API_URL } from "../config";
import "bootstrap/dist/css/bootstrap.min.css";
import SingleCharater from "./singleCharater";

function Character() {
  //what unfiinsh: 10 items a page
  //jest
  //dataArray empty does show error
  //find no itme no error
  //too many useState
  //page arr can it be easier ??
  //for the episode info loop through or not ,
  // responsive =)
  let [basic, setBasic] = useState({
    totalPage: "",
    totalCharacter: "",
    APIpage: "",
    character: "",
  });
  let [n, setn] = useState(0);
  const [showItem, setShowItem] = useState(null);
  let [totalPage, setTotalPage] = useState(null);
  let [totalCharacter, setTotalCharacter] = useState(null);
  let [APIpage, setAPIPage] = useState(1);
  let [showPage, setShowPage] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [characterNo, setCharacterNo] = useState(null);
  const [character, setCharacter] = useState(null);
  let [serachItem, setSeachItem] = useState(null);
  const [pageNoArr, setPageNoArr] = useState([]);

  const [first, setFirst] = useState(true);

  useEffect(() => {
    try {
      async function getcharacter() {
        let dataArray = [];
        console.log(APIpage);
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
        if (first) {
          setShowItem(response.data.results.slice(0, 10));
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
        for (let i = 1; i <= totalPage * 2; i++) {
          pageArr.push(i);
        }
        setPageNoArr(pageArr);
      };
      pageNo(totalPage);
      getcharacter();

      console.log();
    } catch (err) {
      console.log(err);
    }
  }, [serachItem, APIpage, totalPage, totalCharacter, first]);

  // const handlePageSelertor = (e, elem) => {
  //   e.preventDefault();
  //   setAPIPage(elem);
  // };

  const handleSearch = (event) => {
    event.preventDefault();
    const { species, name, status, startDate, endDate } = event.target;
    setAPIPage(1);
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

  const forShowItem = (e, elem) => {
    setFirst(false);
    e.preventDefault();
    setShowPage(elem);

    if (elem % 2 === 0) {
      setAPIPage(elem - 1);
    } else if (elem === 1) {
    } else {
    }

    // situation 1 = created date only
    //dataArray(slice n + n+10), total page = items /10 , move page = move n

    // situation 2 = created date plus other
    // need to loop throught API pages , and get dataArray , dataArray(slice n + n+10), total page = items /10 , move page = move n
    // situation 3 = only others
    // 20 items a page , page move page = move n when
  };

  console.log(character);

  console.log(showItem);

  return (
    <>
      <h1>Rick && Morty =)</h1>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {showPage} PAGE
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {pageNoArr.map((elem) => (
            <Dropdown.Item onClick={(e) => forShowItem(e, elem)}>
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
        <label>Created Date: From </label>
        <input placeholder="Filter Status" name="startDate" type="date" />
        to
        <input placeholder="Filter Status" name="endDate" type="date" />
        <button type="submit">Submit</button>
      </form>
      <div className="character_container">
        {showItem &&
          showItem.map((element, index) => (
            <>
              <div
                key={index}
                className="item"
                onClick={(e) => {
                  hanldDetails(e, element.id, "open");
                }}
              >
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
              </div>
            </>
          ))}
      </div>
      {showDetail && <Backdrop />}
      {showDetail && (
        <SingleCharater
          characterNo={characterNo}
          onHandleDetails={hanldDetails}
        />
      )}
      <button onClick={(e) => forShowItem(e)}>-</button>
    </>
  );
}
export default Character;
