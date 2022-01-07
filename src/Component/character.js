import React, { useState, useEffect } from "react";

import Dropdownmenu from "./DropdownMenu/DropDown";
import DropdownItem from "./DropdownMenu/DropdownItem";
import axios from "axios";
import Backdrop from "./Backdrop/Backdrop";
import { API_URL } from "../config";
import "bootstrap/dist/css/bootstrap.min.css";
import SingleCharater from "./singleCharater";

function Character() {
<<<<<<< HEAD
=======
  //jest
  //find no itme no error
  //too many useState
  //page arr can it be easier ??
  //for the episode info loop through or not ,
  // responsive =)
>>>>>>> parent of 68a145f7 (finish basic features)
  let [basic, setBasic] = useState({
    totalPage: "",
    totalCharacter: "",
    character: "",
  });

  let [APIpage, setAPIPage] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [characterNo, setCharacterNo] = useState(null);
  let [serachItem, setSeachItem] = useState(null);
  const [pageNoArr, setPageNoArr] = useState([]);
  const [date, setDate] = useState(false);
  const [searchOther, setSearchOther] = useState(false);
  const [findNothing, setfindNothing] = useState(null);
  let [n, setn] = useState(0);

  useEffect(() => {
    try {
      async function getcharacter() {
        let dataArray = [];

        let response = await axios.get(`${API_URL}/character/?page=${APIpage}`);

        if (serachItem) {
          if (searchOther) {
            let searchValue = serachItem["species"];
            let searchValue1 = serachItem["status"];
            let searchValue2 = serachItem["name"];
            response = await axios.get(
              `${API_URL}/character/?page=${APIpage}&status=${searchValue1}&species=${searchValue}&name=${searchValue2}`
            );
            if (date) {
              let test = [];
              let page = 1;
              let totalPage = response.data.info.pages;
              while (page <= totalPage) {
                response = await axios.get(
                  `${API_URL}/character/?page=${page}&status=${searchValue1}&species=${searchValue}&name=${searchValue2}`
                );
                page++;

                test.push(
                  response.data.results.filter((elem) => {
                    return (
                      serachItem["startDate"] <= elem.created &&
                      elem.created <= serachItem["endDate"]
                    );
                  })
                );
              }

              dataArray = test.flat();
            }
          } else if (date) {
            let response = await axios.get(
              `${API_URL}/character/?page=${APIpage}`
            );
            let totalPage = response.data.info.pages;
            let i = 1;
            let test = [];
            console.log(totalPage);
            while (totalPage >= i) {
              let responseData = await axios.get(
                `${API_URL}/character/?page=${i}`
              );
              i++;

              test.push(
                responseData.data.results.filter((elem) => {
                  return (
                    serachItem["startDate"] <= elem.created &&
                    elem.created <= serachItem["endDate"]
                  );
                })
              );
            }
            dataArray = test.flat();
          }
        }

        pageNo(response.data.info.count);
        setBasic({
          totalCharacter: response.data.info.count,
          character: response.data.results,
          totalPage: response.data.info.pages,
        });

        if (date) {
          if (dataArray.length === 0) {
            setfindNothing("Find no informaion");
          }

          setBasic({
            totalCharacter: dataArray.length,
            character: dataArray,
          });

          pageNo(dataArray.length);
        }
      }

      const pageNo = (totalCharacter) => {
        let totalPage = 0;
        totalCharacter % 10 === 0
          ? (totalPage = totalCharacter / 10)
          : (totalPage = totalCharacter / 10 + 1);

        const pageArr = [];
        for (let i = 1; i <= totalPage; i++) {
          pageArr.push(i);
        }
        setPageNoArr(pageArr);
      };

      getcharacter();
    } catch (err) {
      console.log(err);
    }
  }, [serachItem, APIpage, date, searchOther]);

  const handleSearch = (event) => {
    event.preventDefault();

    const { species, name, status, startDate, endDate } = event.target;
    if ((startDate.value, endDate.value)) {
      setDate(true);
    }
    if (species.value || species.value || name.value) {
      setSearchOther(true);
    } else if ((!startDate.value, !endDate.value)) {
      setDate(false);
    }

    setfindNothing("");
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

  const pageHelper = (elem) => {
    if (date) {
      // setShowItem(basic.character.slice(elem * 10 - 10, elem * 10));
      setn(elem * 10 - 10, elem * 10);
    } else {
      if (elem % 2 === 0) {
        setn(10);

        // setTimeout(() => {
        //   setBasic((currentState) => {
        //     setShowItem(currentState.character.slice(10, 20));
        //     return currentState;
        //   });
        // }, 1000);
      } else {
        setn(0);
      }
    }
  };

  const forShowItem = (e, elem) => {
    e.preventDefault();
    if (!date) {
      elem % 2 === 0 ? setAPIPage(elem / 2) : setAPIPage(Math.ceil(elem / 2));
    }
    pageHelper(elem);

<<<<<<< HEAD
    const handleClear = (event) => {
      event.preventDefault();
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
      setDate(false);
    };

    const forOpen = () => {
      setOpen(!open);
    };

    console.log(n);

    return (
      <>
        <h1>Rick && Morty =)</h1>
        <DropdownItem>
          <Dropdownmenu props={pageNoArr} onShow={forShowItem} />
        </DropdownItem>

        <form onSubmit={handleSearch}>
          <label>Species</label>
          <input placeholder="Filter Species" name="species" />
          <label>Name</label>
          <input placeholder="Filter Name" name="name" />
          <label>Status</label>
          <input placeholder="Filter Status" name="status" />
          <br />
          <label>Created Date: From </label>
          <input placeholder="Filter Status" name="startDate" type="date" />
          to
          <input placeholder="Filter Status" name="endDate" type="date" />
          <button type="submit">Submit</button>
          <button type="reset">Clear</button>
        </form>

        <span>{findNothing && <span>{findNothing}</span>}</span>
        <div className="character_container">
          {basic.character &&
            basic.character.slice(n, n + 10).map((element, index) => (
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
      </>
    );
  };
=======
  console.log(n);

  return (
    <>
      <h1>Rick && Morty =)</h1>
      <DropdownItem>
        <Dropdownmenu props={pageNoArr} onShow={forShowItem} />
      </DropdownItem>

      <form onSubmit={handleSearch}>
        <label>Species</label>
        <input placeholder="Filter Species" name="species" />
        <label>Name</label>
        <input placeholder="Filter Name" name="name" />
        <label>Status</label>
        <input placeholder="Filter Status" name="status" />
        <br />
        <label>Created Date: From </label>
        <input placeholder="Filter Status" name="startDate" type="date" />
        to
        <input placeholder="Filter Status" name="endDate" type="date" />
        <button type="submit">Submit</button>
        <button type="reset">Clear</button>
      </form>

      <span>{findNothing && <span>{findNothing}</span>}</span>
      <div className="character_container">
        {basic.character &&
          basic.character.slice(n, n + 10).map((element, index) => (
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
    </>
  );
>>>>>>> parent of 68a145f7 (finish basic features)
}

export default Character;
