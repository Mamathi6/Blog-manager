import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({ posts }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/manage?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-title">Content Creator Blog Manager</div>
      <form className="search-form" onSubmit={handleSearch}>
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
}

export default Header;