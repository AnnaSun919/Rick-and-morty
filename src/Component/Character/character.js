import React, { useState } from "react";
import Dropdownmenu from "../DropdownMenu/DropDown";
import DropdownItem from "../DropdownMenu/DropdownItem";
import Backdrop from "../Backdrop/Backdrop";
import Search from "./search";
import SingleCharater from "./singleCharater";
import logo from "../../img/Rick_and_Morty_logo.png";
import useFetch from "./useFetch";

function Character() {
  //setting page , for url
  let [APIpage, setAPIPage] = useState(1);
  const [characterNo, setCharacterNo] = useState(null);

  const [date, setDate] = useState(false);
  let [serachItem, setSeachItem] = useState(null);
  const [searchOther, setSearchOther] = useState(false);

  //for showing single character info
  const [showDetail, setShowDetail] = useState(false);
  let [n, setn] = useState(0);
  const [open, setOpen] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  const { basic, pageNoArr, findNothing } = useFetch(
    serachItem,
    searchOther,
    date,
    APIpage
  );

  const handleSearch = (event) => {
    event.preventDefault();
    setAPIPage(1);
    setPageNo(1);
    forShowItem(event, 1);

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

  const forShowItem = (e, elem) => {
    e.preventDefault();
    if (!date) {
      elem % 2 === 0 ? setAPIPage(elem / 2) : setAPIPage(Math.ceil(elem / 2));
    }
    pageHelper(elem);
  };

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

  console.log(pageNoArr);

  return (
    <div className="box">
      <img src={logo} alt="rick and morty" />
      {!findNothing && (
        <DropdownItem onOpen={forOpen} open={open} pageNo={pageNo}>
          <Dropdownmenu
            props={pageNoArr}
            onShow={forShowItem}
            onOpen={forOpen}
          />
        </DropdownItem>
      )}
      <Search handleSearch={handleSearch} handleClear={handleClear} />
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
      )}
    </div>
  );
}
export default Character;
