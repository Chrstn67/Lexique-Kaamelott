"use client";

import { useState, useEffect } from "react";
import "../styles/search-bar.css";

export default function SearchBar({
  onSearch,
  isReversed,
  onToggleDirection,
  searchTerm,
}) {
  const [inputValue, setInputValue] = useState(searchTerm || "");

  // Réinitialiser l'input quand searchTerm est vide (après un reset)
  useEffect(() => {
    setInputValue(searchTerm || "");
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <div className="search-direction">
          <span className={isReversed ? "dimmed" : "highlighted"}>
            Kaamelott
          </span>
          <button
            type="button"
            className="direction-toggle"
            onClick={onToggleDirection}
            aria-label="Inverser la direction de traduction"
          >
            ⇄
          </button>
          <span className={isReversed ? "highlighted" : "dimmed"}>
            Français
          </span>
        </div>

        <div className="search-input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              isReversed
                ? "Rechercher en français..."
                : "Rechercher en kaamelott..."
            }
            className="search-input"
          />
          <button type="submit" className="search-button">
            Rechercher
          </button>
        </div>
      </form>
    </div>
  );
}
