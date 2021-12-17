import React, { useState } from "react";
import { Button } from "react-bootstrap";

function DropdownItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="nav-item">
      <Button
        class="btn btn-success dropdown-toggle"
        type="button"
        onClick={() => setOpen(!open)}
      >
        Page
      </Button>
      {/* <span>{props.name}</span> */}
      {open && props.children}
    </div>
  );
}

export default DropdownItem;
