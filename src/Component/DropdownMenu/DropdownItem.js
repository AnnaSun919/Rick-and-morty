import React, { useState } from "react";

function DropdownItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="nav-item">
      <button type="button" onClick={() => setOpen(!open)}>
        Page
      </button>

      {open && props.children}
    </div>
  );
}

export default DropdownItem;
