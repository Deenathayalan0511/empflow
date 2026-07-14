import { useState } from "react";

function SearchEmployee({ onSearch }) {
  const [search, setSearch] = useState("");
  const [column, setColumn] = useState("name");

  const handleSearch = () => {
    onSearch(column, search);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={column}
        onChange={(e) => setColumn(e.target.value)}
      >
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="department">Department</option>
        <option value="gender">Gender</option>
      </select>

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchEmployee;