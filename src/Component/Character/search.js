import React from "react";

function Search(props) {
  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   setAPIPage(1);
  //   setPageNo(1);
  //   forShowItem(event, 1);

  //   const { species, name, status, startDate, endDate } = event.target;
  //   if ((startDate.value, endDate.value)) {
  //     setDate(true);
  //   }
  //   if (species.value || species.value || name.value) {
  //     setSearchOther(true);
  //   } else if ((!startDate.value, !endDate.value)) {
  //     setDate(false);
  //   }

  //   setSeachItem({
  //     species: species.value,
  //     name: name.value,
  //     status: status.value,
  //     startDate: startDate.value,
  //     endDate: endDate.value,
  //   });
  // };

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
