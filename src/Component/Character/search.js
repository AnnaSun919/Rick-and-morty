import React from "react";

function Search(props) {
  const { onSearch, onClear } = props;

  return (
    <>
      <form onSubmit={onSearch}>
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
        <button type="button" onClick={onClear}>
          Clear
        </button>
      </form>
    </>
  );
}

export default Search();
