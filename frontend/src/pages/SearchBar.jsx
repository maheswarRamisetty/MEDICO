import React from 'react';

const SearchBar = () => {
  const handleSearch = () => {
    alert('Search functionality coming soon!');
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  };

  const inputStyle = {
    width: '50%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px 0 0 5px',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#d9534f', 
    color: '#fff',
    border: 'none',
    borderRadius: '0 5px 5px 0',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#c9302c',
  };

  return (
    <div style={containerStyle}>
      <input
        type="text"
        style={inputStyle}
        placeholder="Search for any health keyword"
      />
      <button
        style={buttonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
