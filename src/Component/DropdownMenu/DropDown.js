import React from "react";

function Dropdownmenu(props) {
  const pageNoArr = props.props;

  return (
    <>
      <div className="dropdown">
        <div className="menu">
          {pageNoArr.map((elem) => (
            <div
              onClick={(e) => {
                props.onShow(e, elem);
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
