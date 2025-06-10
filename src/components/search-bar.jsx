"use client";

import { useState, useEffect } from "react";
import "../styles/search-bar.css";

export default function SearchBar({
  onSearch,
  isReversed,
  onToggleDirection,
  searchTerm,
  onResetSearch,
}) {
  const [inputValue, setInputValue] = useState(searchTerm || "");

  // Réinitialiser l'input quand searchTerm est vide (après un reset)
  useEffect(() => {
    setInputValue(searchTerm || "");
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleReset = () => {
    setInputValue("");
    onResetSearch();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Si l'utilisateur vide le champ manuellement, réinitialiser aussi la recherche
    if (value === "") {
      onResetSearch();
    }
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
            onChange={handleInputChange}
            placeholder={
              isReversed
                ? "Rechercher en français..."
                : "Rechercher en kaamelott..."
            }
            className="search-input"
          />
          {inputValue && (
            <button
              type="button"
              className="reset-button"
              onClick={handleReset}
              aria-label="Réinitialiser la recherche"
            >
              ✕
            </button>
          )}
          <button type="submit" className="search-button">
            Rechercher
          </button>
        </div>
      </form>
    </div>
  );
}
