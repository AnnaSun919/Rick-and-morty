import React from "react";

function Search(props) {
  return (
    <div>
      <form onSubmit={props.handleSearch}>
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
        <button type="button" onClick={props.handleClear}>
          Clear
        </button>
      </form>
    </div>
  );
}
export default Search;
