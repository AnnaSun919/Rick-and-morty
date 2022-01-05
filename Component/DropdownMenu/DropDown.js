import React from "react";

function Dropdownmenu(props) {
  const pageNoArr = props.props;

  return (
    <>
      <div className="dropdown">
        <div className="menu">
          {pageNoArr.map((elem, index) => (
            <div
              key={index}
              onClick={(e) => {
                props.onShow(e, elem);
                props.onOpen();
              }}
            >
              {elem}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Dropdownmenu;
