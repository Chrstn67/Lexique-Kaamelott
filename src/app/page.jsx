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

  const handleResetSearch = () => {
    setSearchTerm(""); // Réinitialise le terme de recherche pour afficher tous les mots
  };

  return (
    <main>
      <Header />

      {activeTab === "dictionary" ? (
        <>
          <SearchBar
            onSearch={handleSearch}
            isReversed={isReversed}
            onToggleDirection={handleToggleDirection}
            searchTerm={searchTerm}
            onResetSearch={handleResetSearch}
          />
          <DictionaryResults
            data={dictionaryData}
            searchTerm={searchTerm}
            isReversed={isReversed}
            onResetSearch={handleResetSearch}
          />
        </>
      ) : (
        <>{/* <Translator dictionaryData={dictionaryData} /> */}</>
      )}
    </main>
  );
}
