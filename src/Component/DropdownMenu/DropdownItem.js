import React from "react";

function DropdownItem(props) {
  return (
    <div className="nav-item">
      <button type="button" onClick={() => props.onOpen()}>
        Page {props.pageNo} ▾
      </button>

      {props.open && props.children}
    </div>
  );
}

export default DropdownItem;
