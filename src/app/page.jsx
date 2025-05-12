"use client";

import { useState } from "react";
import Header from "../components/header";
import SearchBar from "../components/search-bar";
import DictionaryResults from "../components/dictionary-results";
// import Translator from "../components/translator";
import { dictionaryData } from "../data/dictionary";
import "../styles/globals.css";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isReversed, setIsReversed] = useState(false);
  const [activeTab, setActiveTab] = useState("dictionary");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleToggleDirection = () => {
    setIsReversed(!isReversed);
  };

  const resetSearch = () => {
    setSearchTerm("");
  };

  const handleResetSearch = () => {
    setSearchTerm(""); // Ceci réinitialisera également la SearchBar grâce au useEffect
  };

  return (
    <main>
      <Header />

      <div className="tabs">
        {/* <button
          className={activeTab === "dictionary" ? "active" : ""}
          onClick={() => setActiveTab("dictionary")}
        >
          Dictionnaire
        </button> */}
        {/* <button
          className={activeTab === "translator" ? "active" : ""}
          onClick={() => setActiveTab("translator")}
        >
          Traducteur
        </button> */}
      </div>

      {activeTab === "dictionary" ? (
        <>
          <SearchBar
            onSearch={handleSearch}
            isReversed={isReversed}
            onToggleDirection={handleToggleDirection}
            searchTerm={searchTerm}
          />
          <DictionaryResults
            data={dictionaryData}
            searchTerm={searchTerm}
            isReversed={isReversed}
            onResetSearch={handleResetSearch}
          />
        </>
      ) : (
        {
          /* <Translator dictionaryData={dictionaryData} /> */
        }
      )}
    </main>
  );
}
