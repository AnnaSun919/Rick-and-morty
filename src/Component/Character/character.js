import React, { useState, useEffect } from "react";
import Dropdownmenu from "../DropdownMenu/DropDown";
import DropdownItem from "../DropdownMenu/DropdownItem";
import axios from "axios";
import Backdrop from "../Backdrop/Backdrop";
import { API_URL } from "../../config";
import "bootstrap/dist/css/bootstrap.min.css";
import SingleCharater from "./singleCharacter";
import logo from "../../img/Rick_and_Morty_logo.png";
import Search from "./search";

function Character() {
  //all characters render info
  let [basic, setBasic] = useState({
    totalPage: "",
    totalCharacter: "",
    character: "",
  });

  //setting page , for url
  let [APIpage, setAPIPage] = useState(1);
  const [characterNo, setCharacterNo] = useState(null);

  const [pageNoArr, setPageNoArr] = useState([]);
  const [date, setDate] = useState(false);

  let [serachItem, setSeachItem] = useState(null);
  const [searchOther, setSearchOther] = useState(false);
  const [findNothing, setfindNothing] = useState(null);

  //for showing single character info
  const [showDetail, setShowDetail] = useState(false);

  let [n, setn] = useState(0);

  const [open, setOpen] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    async function getcharacter() {
      let dataArray = [];

      let response = await axios.get(`${API_URL}/character/?page=${APIpage}`);

      if (serachItem) {
        if (searchOther) {
          let searchValue = serachItem["species"];
          let searchValue1 = serachItem["status"];
          let searchValue2 = serachItem["name"];
          try {
            response = await axios.get(
              `${API_URL}/character/?page=${APIpage}&status=${searchValue1}&species=${searchValue}&name=${searchValue2}`
            );
          } catch (err) {
            setfindNothing("No Character found");
          }

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
  }, [serachItem, APIpage, date, searchOther]);

  //function for searching
  const handleSearch = (event) => {
    event.preventDefault();
    setfindNothing(null);
    setAPIPage(1);
    setPageNo(1);
    forSetAPI(event, 1);

    const { species, name, status, startDate, endDate } = event.target;
    if ((startDate.value, endDate.value)) {
      setDate(true);
    }
    if (species.value || species.value || name.value) {
      setSearchOther(true);
    } else if ((!startDate.value, !endDate.value)) {
      setDate(false);
    }

    setSeachItem({
      species: species.value,
      name: name.value,
      status: status.value,
      startDate: startDate.value,
      endDate: endDate.value,
    });
  };

  //function for handling singlecharacter info
  const hanldDetails = (e, number, show) => {
    e.preventDefault();

    if (show === "close") {
      setShowDetail(false);
    } else {
      setCharacterNo(number);
      setShowDetail(true);
    }
  };

  //function for page drop down menu to set APIpage
  const forSetAPI = (e, elem) => {
    e.preventDefault();
    if (!date) {
      elem % 2 === 0 ? setAPIPage(elem / 2) : setAPIPage(Math.ceil(elem / 2));
    }
    pageHelper(elem);
  };
  //function handling page selector
  const pageHelper = (elem) => {
    setPageNo(elem);
    if (date) {
      setn(elem * 10 - 10, elem * 10);
    } else {
      if (elem % 2 === 0) {
        setn(10);
      } else {
        setn(0);
      }
    }
  };
  //clear for info
  const handleClear = (event) => {
    event.preventDefault();
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setDate(false);
  };

  //handle page selector opening
  const forOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="box" data-testid="box">
      <img src={logo} alt="rick and morty" />
      <DropdownItem onOpen={forOpen} open={open} pageNo={pageNo}>
        <Dropdownmenu props={pageNoArr} onShow={forSetAPI} onOpen={forOpen} />
      </DropdownItem>
      <Search onSearch={handleSearch} onClear={handleClear} />
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
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>
      <span>{findNothing && <span>{findNothing}</span>}</span>
      {!findNothing && (
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
      )}
      {showDetail && <Backdrop />}
      {showDetail && (
        <SingleCharater
          characterNo={characterNo}
          onHandleDetails={hanldDetails}
        />
      )}{" "}
    </div>
  );
}
export default Character;
