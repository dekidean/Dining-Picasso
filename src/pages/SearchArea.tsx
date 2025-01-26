import React from "react";

interface SearchAreaProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

const SearchArea = ({
  placeholder,
  onChange,
  searchQuery,
}: SearchAreaProps) => (
  <div className="search-area">
    <input
      type="text"
      placeholder={placeholder}
      value={searchQuery}
      onChange={onChange}
    />
  </div>
);

export default SearchArea;
