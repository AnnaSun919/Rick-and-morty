import React from "react";

function Search(props) {
  return (
    <div>
      <form onSubmit={props.handleSearch}>
        <div className="form_control">
          <label>Species</label>
          <input placeholder="Filter Species" name="species" />
        </div>
        <div className="form_control">
          <label>Name</label>
          <input placeholder="Filter Name" name="name" />
        </div>
        <div className="form_control">
          <label>Status</label>
          <input placeholder="Filter Status" name="status" />
        </div>
        <br></br>
        <br />
        <div className="form_control">
          <label>Created Date: From </label>
          <input placeholder="Filter Status" name="startDate" type="date" />
        </div>
        <div className="form_control">
          to
          <input placeholder="Filter Status" name="endDate" type="date" />
        </div>
        <div className="form_control">
          <button type="submit">Submit</button>
          <button type="button" onClick={props.handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
export default Search;
